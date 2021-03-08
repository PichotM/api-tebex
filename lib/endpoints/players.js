import { Endpoints } from '../const';
import { makeApiPromise, formatEndpoint } from '../utils';
import { Error } from '../errors/handler';
import { ApiEndpoint } from './model';

/**
 * @classdesc Players data API.
 * @name Players
 * @class
 */
export class Players extends ApiEndpoint {
    /**
     * @typedef {object} PlayerPayment
     * @property {string} transactionId
     * @property {Date} time
     * @property {number} price
     * @property {string} currency
     * @property {number} status
     */

    /**
     * Advanced Player object
     *
     * @typedef {object} PlayerInfo
     * @property {object} player
     * @property {string} player.id
     * @property {Date} player.createdAt
     * @property {Date} player.updatedAt
     * @property {Date} player.cacheExpire
     * @property {string} player.username
     * @property {any} player.meta
     * @property {number} player.pluginUsernameId
     * @property {number} banCount
     * @property {PlayerPayment[]} payments
     * @property {object.<string, number>} purchaseTotals
     */

    /**
     * Returns player lookup information (similar to player lookup in control panel).
     * Available on Ultimate and above plans
     *
     * @param {number} user - The UUID or username of a player.
     * @returns {Promise<PlayerInfo>} Advanced information about a player.
     * @throws {Error}
     * @example
     * // Retrieve advanced data about a player
     * tebexInstance.players.retrieve(5252)
     */
    retrieve(user) {
        if (!user) throw new Error('INVALID_REQUEST', 'The user id is missing');

        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.PLAYER, user) }, (data) => ({
            player: {
                id: data.player.id,
                createdAt: new Date(data.player.created_at),
                updatedAt: new Date(data.player.updated_at),
                cacheExpire: new Date(data.player.cache_expire),
                username: data.player.username,
                meta: data.player.meta ? JSON.parse(data.player.meta) : data.player.meta,
                pluginUsernameId: data.player.plugin_username_id
            },
            banCount: data.banCount,
            chargebackRate: data.chargebackRate,
            payments: data.payments.map((payment) => ({
                transactionId: payment.txn_id, time: new Date(payment.time * 1000), price: payment.price, currency: payment.currency, status: payment.status
            })),
            purchaseTotals: data.purchaseTotals
        }));
    }
}
