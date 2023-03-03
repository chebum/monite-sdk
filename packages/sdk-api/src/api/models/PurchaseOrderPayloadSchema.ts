/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyEnum } from './CurrencyEnum';
import type { PurchaseOrderItem } from './PurchaseOrderItem';

/**
 * Represents an Accounts Purchase Order document created by entity.
 */
export type PurchaseOrderPayloadSchema = {
    /**
     * Counterpart unique ID.
     */
    counterpart_id: string;
    /**
     * Number of days for which purchase order is valid
     */
    valid_for_days: number;
    /**
     * List of item to purchase
     */
    items: Array<PurchaseOrderItem>;
    /**
     * Msg which will be send to counterpart for who the purchase order is issued.
     */
    message: string;
    /**
     * The currency in which the price of the product is set. (all items need to have the same currency)
     */
    currency: CurrencyEnum;
};

