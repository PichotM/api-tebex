import {
    Endpoints, Currency, TebexPlayer, SimplePackage
} from '../const';
import { makeApiPromise, formatEndpoint } from '../utils';
import { Error } from '../errors/handler';
import { ApiEndpoint } from './model';

/**
 * @classdesc Payments data API.
 * @name Payments
 * @class
 */
export class Payments extends ApiEndpoint {
    /**
     * Payment object
     *
     * @typedef {object} Payment
     * @property {number} id
     * @property {number} amount
     * @property {Date} date
     * @property {Currency} currency
     * @property {TebexPlayer} player
     */

    /**
     * Transaction object
     *
     * @typedef {object} Transaction
     * @property {number} id
     * @property {number} amount
     * @property {string} status
     * @property {Date} date
     * @property {Currency} currency
     * @property {TebexPlayer} player
     * @property {SimplePackage} packages
     */

    /**
     * Retrieve the latest payments (up to a maximum of 100) made on your webstore.
     *
     * @param {number} [limit] - Limit the amount of payments returned.
     * @returns {Payment[]} Payment information.
     * @throws {Error}
     * @example
     * // Retrieve all payments
     * tebexInstance.payments.all()
     */
    all(limit) {
        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.PAYMENTS), params: { limit } }, (data) => data.map((a) => ({
            id: a.id,
            amount: Number(a.amount),
            date: new Date(a.date),
            currency: { iso4217: a.currency.iso_4217, symbol: a.currency.symbol },
            player: { id: a.player.id, uuid: Number(a.player.uuid), name: a.player.name }
        })));
    }

    /**
     * Retrieve a payment made on your webstore by transaction ID.
     *
     * @param {string} transactionId - The transaction ID of a payment.
     * @returns {Transaction} Transaction information.
     * @throws {Error}
     * @example
     * // Retrieve a payment by id
     * tebexInstance.payments.retrieve('tbx-12345678')
     */
    retrieve(transactionId) {
        if (!transactionId) throw new Error('INVALID_REQUEST', 'The transaction id is missing');

        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.PAYMENTS_TRANSACTION, transactionId) }, (data) => ({
            id: data.id,
            amount: Number(data.amount),
            status: data.status,
            date: new Date(data.date),
            currency: { iso4217: data.currency.iso_4217, symbol: data.currency.symbol },
            player: { id: data.player.id, uuid: Number(data.player.uuid), name: data.player.name },
            packages: data.packages
        }));
    }
}
