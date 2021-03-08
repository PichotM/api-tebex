import { Endpoints, Currency } from '../const';
import { makeApiPromise, formatEndpoint } from '../utils';
import { Error } from '../errors/handler';
import { ApiEndpoint } from './model';

/**
 * @classdesc Server data API.
 * @name Server
 * @class
 */
export class Server extends ApiEndpoint {
    /**
     * Information about a webstore/server
     *
     * @typedef {object} WebstoreInformation
     * @property {object} account
     * @property {number} account.id
     * @property {string} account.domain
     * @property {string} account.name
     * @property {Currency} account.currency
     * @property {boolean} account.onlineMode
     * @property {string} account.gameType
     * @property {boolean} account.logEvents
     * @property {object} server
     * @property {number} server.id
     * @property {string} server.name
     */

    /**
     *
     * @typedef {object} WebstoreCommunityGoal
     * @property {number} id
     * @property {Date} createdAt
     * @property {Date} updatedAt
     * @property {number} account
     * @property {string} name
     * @property {string} description
     * @property {string} image
     * @property {string} target
     * @property {string} current
     * @property {number} repeatable
     * @property {Date} lastAchieved
     * @property {number} timesAchieved
     * @property {string} status
     * @property {number} sale
     */

    /**
     *
     * @typedef {object} Sales
     * @property {number} id
     * @property {object} effective
     * @property {string} effective.type
     * @property {number[]} effective.packages
     * @property {number[]} effective.categories
     * @property {object} discount
     * @property {string} discount.type
     * @property {number} discount.percentage
     * @property {number} discount.value
     * @property {Date} start
     * @property {Date} expire
     * @property {number} order
     */

    /**
     * This endpoint returns general information about the authenticated account and server.
     *
     * @returns {WebstoreInformation} Information about the webstore and the owner
     * @throws {Error}
     * @example
     * tebexInstance.server.information()
     */
    information() {
        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.INFORMATION) }, (data) => ({
            account: {
                id: data.account.id,
                domain: data.account.domain,
                name: data.account.name,
                currency: { iso4217: data.account.currency.iso_4217, symbol: data.account.currency.symbol },
                onlineMode: data.account.online_mode,
                gameType: data.account.game_type,
                logEvents: data.account.log_events
            },
            server: data.server
        }));
    }

    /**
     * Retrieve all community goals created on your account.
     *
     * @returns {WebstoreCommunityGoal[]} Community goals
     * @throws {Error}
     * @example
     * tebexInstance.server.communityGoals()
     */
    communityGoals() {
        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.COMMUNITY_GOALS) }, (data) => (data.map((a) => ({
            id: a.id,
            createdAt: new Date(a.created_at),
            updatedAt: new Date(a.updated_at),
            account: a.account,
            name: a.name,
            description: a.description,
            image: a.image,
            target: a.target,
            current: a.current,
            repeatable: a.repeatable,
            lastAchieves: a.last_achieved,
            timesAchieves: a.time_achieved,
            status: a.status,
            sale: a.sale
        }))));
    }

    /**
     * Retrieve an individual community goal on your account.
     *
     * @param {number} id - Id of the community goal
     * @returns {WebstoreCommunityGoal} Community goal
     * @throws {Error}
     * @example
     * // Returns the first community goal
     * tebexInstance.server.communityGoal(0)
     */
    communityGoal(id) {
        if (!id) throw new Error('INVALID_REQUEST', 'The community goal id is missing');

        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.COMMUNITY_GOALS, id) }, (data) => ({
            id: data.id,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            account: data.account,
            name: data.name,
            description: data.description,
            image: data.image,
            target: data.target,
            current: data.current,
            repeatable: data.repeatable,
            lastAchieves: data.last_achieved,
            timesAchieves: data.time_achieved,
            status: data.status,
            sale: data.sale
        }));
    }

    /**
     * Return an array of all active sales on your account.
     *
     * @returns {Sales[]} Array of all sales
     * @throws {Error}
     * @example
     * tebexInstance.server.sales()
     */
    sales() {
        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.SALES) }, (data) => (data.data.map((a) => ({
            id: a.id,
            effective: a.effective,
            discount: a.discount,
            start: new Date(a.start * 1000),
            expire: new Date(a.expire * 1000),
            order: a.order
        }))));
    }
}
