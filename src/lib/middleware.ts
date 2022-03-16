import { KARRIO_API } from "@/client/context";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { createServerError, isNone, ServerErrorCode } from "@/lib/helper";
import logger from "@/lib/logger";
import { Response } from "node-fetch";
import { ContextDataType, Metadata, References, SessionType } from "@/lib/types";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  await setOrgHeader(ctx, session);

  const pathname = ctx.resolvedUrl;
  const org_id = session?.org_id || "";
  const data = session ? await loadContextData(session as SessionType) : {};

  ctx.res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59');

  return {
    props: { pathname, org_id, ...data }
  };
};

export async function checkAPI(): Promise<{ metadata?: Metadata }> {
  // Attempt connection to the karrio API to retrieve the API metadata
  return new Promise(async (resolve, reject) => {
    try {
      const { data: metadata } = await axios.get<Metadata>(KARRIO_API);

      // TODO:: implement version compatibility check here.
      resolve({ metadata });
    } catch (e: any | Response) {
      logger.error(`Failed to fetch API metadata from (${KARRIO_API})`);
      logger.error(e);

      const error = createServerError({
        code: ServerErrorCode.API_CONNECTION_ERROR,
        message: `
          Server (${KARRIO_API}) unreachable.
          Please make sure taht the API is running and reachable.
        `
      })
      reject({ error });
    }
  });
}

export async function loadContextData({ accessToken, org_id }: SessionType): Promise<any> {
  const { metadata } = await checkAPI();
  const headers = { Authorization: `Bearer ${accessToken}` };
  const getReferences = () => axios
    .get<References>(
      publicRuntimeConfig.KARRIO_API_URL + '/v1/references', { headers }
    )
    .then(({ data }) => data);
  const getUserData = () => axios
    .get<ContextDataType>(KARRIO_API + '/graphql', {
      headers,
      data: { query: dataQuery(org_id), variables: { org_id } }
    })
    .then(({ data }) => data);

  try {
    const [references, { data }] = await Promise.all([getReferences(), getUserData()]);

    return { metadata, references, ...data };
  } catch (e) {
    logger.error(e);
    const error = createServerError({ message: 'Failed to load intial data...' });

    return { ...metadata, error };
  }
}

async function setOrgHeader(ctx: GetServerSidePropsContext, session: Session | null) {
  // Sets the authentication org_id cookie if the session has one
  if (ctx.res && session?.org_id) {
    ctx.res.setHeader('Set-Cookie', `org_id=${session.org_id}`);
  }
}

function dataQuery(org_id?: string) {
  const organizationQueries = isNone(org_id) ? '' : `
  organizations {
    id
    name
    slug
    token
    current_user {
      email
      full_name
      is_admin
      is_staff
      is_owner
      last_login
    }
    members {
      email
      full_name
      is_admin
      is_owner
      invitation {
        id
        guid
        invitee_identifier
        created
        modified
      }
      last_login
    }
  }
  `;

  return `
    {
      user {
        email
        full_name
        is_staff
        last_login
        date_joined
      }
      ${organizationQueries}
    }
  `;
}
