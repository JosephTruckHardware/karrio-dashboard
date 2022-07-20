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
import {
    Address,
    AddressFromJSON,
    AddressFromJSONTyped,
    AddressToJSON,
} from './Address';
import {
    AddressData,
    AddressDataFromJSON,
    AddressDataFromJSONTyped,
    AddressDataToJSON,
} from './AddressData';
import {
    LineItem,
    LineItemFromJSON,
    LineItemFromJSONTyped,
    LineItemToJSON,
} from './LineItem';
import {
    Shipment,
    ShipmentFromJSON,
    ShipmentFromJSONTyped,
    ShipmentToJSON,
} from './Shipment';

/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * A unique identifier
     * @type {string}
     * @memberof Order
     */
    id?: string;
    /**
     * Specifies the object type
     * @type {string}
     * @memberof Order
     */
    object_type?: string;
    /**
     * The source' order id.
     * @type {string}
     * @memberof Order
     */
    order_id: string;
    /**
     * The order date. format: `YYYY-MM-DD`
     * @type {string}
     * @memberof Order
     */
    order_date?: string | null;
    /**
     * The order's source.
     * @type {string}
     * @memberof Order
     */
    source?: string;
    /**
     * The order status.
     * @type {string}
     * @memberof Order
     */
    status?: OrderStatusEnum;
    /**
     * 
     * @type {Address}
     * @memberof Order
     */
    shipping_to: Address;
    /**
     * 
     * @type {Address}
     * @memberof Order
     */
    shipping_from?: Address;
    /**
     * 
     * @type {AddressData}
     * @memberof Order
     */
    billing_address?: AddressData;
    /**
     * The order line items.
     * @type {Array<LineItem>}
     * @memberof Order
     */
    line_items: Array<LineItem>;
    /**
     * 
     * <details>
     * <summary>The options available for the order shipments.</summary>
     * 
     * ```
     * {
     *     "currency": "USD",
     *     "paid_by": "third_party",
     *     "payment_account_number": "123456789",
     *     "duty_paid_by": "third_party",
     *     "duty_account_number": "123456789",
     *     "invoice_number": "123456789",
     *     "invoice_date": "2020-01-01",
     *     "single_item_per_parcel": true,
     *     "carrier_ids": ["canadapost-test"],
     * }
     * ```
     * 
     * Please check the docs for shipment specific options.
     * </details>
     * @type {object}
     * @memberof Order
     */
    options?: object | null;
    /**
     * User metadata for the order.
     * @type {object}
     * @memberof Order
     */
    metadata?: object;
    /**
     * The shipments associated with the order.
     * @type {Array<Shipment>}
     * @memberof Order
     */
    shipments?: Array<Shipment>;
    /**
     * Specify whether the order is in test mode or not.
     * @type {boolean}
     * @memberof Order
     */
    test_mode: boolean;
    /**
     * 
     * The shipment creation datetime
     * 
     * Date Format: `YYYY-MM-DD HH:MM:SS.mmmmmmz`
     * @type {string}
     * @memberof Order
     */
    created_at: string;
}

/**
* @export
* @enum {string}
*/
export enum OrderStatusEnum {
    Unfulfilled = 'unfulfilled',
    Cancelled = 'cancelled',
    Fulfilled = 'fulfilled',
    Delivered = 'delivered',
    Partial = 'partial'
}

export function OrderFromJSON(json: any): Order {
    return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'object_type': !exists(json, 'object_type') ? undefined : json['object_type'],
        'order_id': json['order_id'],
        'order_date': !exists(json, 'order_date') ? undefined : json['order_date'],
        'source': !exists(json, 'source') ? undefined : json['source'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'shipping_to': AddressFromJSON(json['shipping_to']),
        'shipping_from': !exists(json, 'shipping_from') ? undefined : AddressFromJSON(json['shipping_from']),
        'billing_address': !exists(json, 'billing_address') ? undefined : AddressDataFromJSON(json['billing_address']),
        'line_items': ((json['line_items'] as Array<any>).map(LineItemFromJSON)),
        'options': !exists(json, 'options') ? undefined : json['options'],
        'metadata': !exists(json, 'metadata') ? undefined : json['metadata'],
        'shipments': !exists(json, 'shipments') ? undefined : ((json['shipments'] as Array<any>).map(ShipmentFromJSON)),
        'test_mode': json['test_mode'],
        'created_at': json['created_at'],
    };
}

export function OrderToJSON(value?: Order | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'object_type': value.object_type,
        'order_id': value.order_id,
        'order_date': value.order_date,
        'source': value.source,
        'status': value.status,
        'shipping_to': AddressToJSON(value.shipping_to),
        'shipping_from': AddressToJSON(value.shipping_from),
        'billing_address': AddressDataToJSON(value.billing_address),
        'line_items': ((value.line_items as Array<any>).map(LineItemToJSON)),
        'options': value.options,
        'metadata': value.metadata,
        'shipments': value.shipments === undefined ? undefined : ((value.shipments as Array<any>).map(ShipmentToJSON)),
        'test_mode': value.test_mode,
        'created_at': value.created_at,
    };
}

