/* tslint:disable */
/* eslint-disable */
/**
 * Karrio API
 *  ## API Reference  Karrio is an open source multi-carrier shipping API that simplifies the integration of logistic carrier services.  The Karrio API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  The Karrio API differs for every account as we release new versions. These docs are customized to your version of the API.   ## Versioning  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is `2022.6`.  Read our API changelog and to learn more about backwards compatibility.  As a precaution, use API versioning to check a new API version before committing to an upgrade.   ## Environments  The Karrio API offer the possibility to create and retrieve certain objects in `test_mode`. In development, it is therefore possible to add carrier connections, get live rates, buy labels, create trackers and schedule pickups in `test_mode`.   ## Pagination  All top-level API resources have support for bulk fetches via \"list\" API methods. For instance, you can list addresses, list shipments, and list trackers. These list API methods share a common structure, taking at least these two parameters: limit, and offset.  Karrio utilizes offset-based pagination via the offset and limit parameters. Both parameters take a number as value (see below) and return objects in reverse chronological order. The offset parameter returns objects listed after an index. The limit parameter take a limit on the number of objects to be returned from 1 to 100.   ```json {     \"count\": 100,     \"next\": \"/v1/shipments?limit=25&offset=50\",     \"previous\": \"/v1/shipments?limit=25&offset=25\",     \"results\": [         { ... },     ] } ```  ## Metadata  Updateable Karrio objects—including Shipment and Order—have a metadata parameter. You can use this parameter to attach key-value data to these Karrio objects.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Karrio Order object.  Do not store any sensitive information as metadata.  
 *
 * The version of the OpenAPI document: 2022.6
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface WebhookData
 */
export interface WebhookData {
    /**
     * The URL of the webhook endpoint.
     * @type {string}
     * @memberof WebhookData
     */
    url: string;
    /**
     * An optional description of what the webhook is used for.
     * @type {string}
     * @memberof WebhookData
     */
    description?: string | null;
    /**
     * The list of events to enable for this endpoint.
     * @type {Array<string>}
     * @memberof WebhookData
     */
    enabled_events: Array<WebhookDataEnabledEventsEnum>;
    /**
     * Indicates that the webhook is disabled
     * @type {boolean}
     * @memberof WebhookData
     */
    disabled?: boolean | null;
}

/**
* @export
* @enum {string}
*/
export enum WebhookDataEnabledEventsEnum {
    All = 'all',
    ShipmentPurchased = 'shipment_purchased',
    ShipmentCancelled = 'shipment_cancelled',
    ShipmentFulfilled = 'shipment_fulfilled',
    TrackerCreated = 'tracker_created',
    TrackerUpdated = 'tracker_updated',
    OrderCreated = 'order_created',
    OrderUpdated = 'order_updated',
    OrderFulfilled = 'order_fulfilled',
    OrderCancelled = 'order_cancelled',
    OrderDelivered = 'order_delivered',
    BatchQueued = 'batch_queued',
    BatchFailed = 'batch_failed',
    BatchRunning = 'batch_running',
    BatchCompleted = 'batch_completed'
}

export function WebhookDataFromJSON(json: any): WebhookData {
    return WebhookDataFromJSONTyped(json, false);
}

export function WebhookDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebhookData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'enabled_events': json['enabled_events'],
        'disabled': !exists(json, 'disabled') ? undefined : json['disabled'],
    };
}

export function WebhookDataToJSON(value?: WebhookData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'url': value.url,
        'description': value.description,
        'enabled_events': value.enabled_events,
        'disabled': value.disabled,
    };
}

