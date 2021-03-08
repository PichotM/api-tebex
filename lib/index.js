import axios, { AxiosInstance } from 'axios';
import { Error } from './errors';
import {
    Server, Payments, Players, Packages
} from './endpoints';

/**
 * TebexInstanceOptions object.
 *
 * @typedef {object} TebexInstanceOptions
 * @property {number} [timeout] - Default timeout for requests
 * @property {string} [pluginUrl] - Override default plugin url
 */

/**
 * @class Tebex plugin instance.
 * @classdesc Interact with your webstore API.
 * @param {string} apiKey - You secret API key.
 * @param {TebexInstanceOptions} [options] - Options.
 * @property {Server} server - Server data API.
 * @property {Payments} payments - Payments data API.
 * @property {Players} players - Players data API.
 * @property {Packages} packages - Packages data API.
 */
export class TebexInstance {
    constructor(apiKey, { timeout, pluginUrl } = {}) {
        if (!apiKey) throw new Error('SECRET_KEY_INVALID');

        /**
         * Axios instance for the specific Tebex server/webstore.
         *
         * @private
         * @type {AxiosInstance}
         */
        this.axiosInstance = axios.create({
            baseURL: pluginUrl || 'https://plugin.tebex.io/',
            timeout: timeout || 8000,
            headers: { 'X-Tebex-Secret': apiKey }
        });

        /**
         * @public
         * @type {Server}
         */
        this.server = new Server(this.axiosInstance);

        /**
         * @public
         * @type {Payments}
         */
        this.payments = new Payments(this.axiosInstance);

        /**
         * @public
         * @type {Players}
         */
        this.players = new Players(this.axiosInstance);

        /**
         * @public
         * @type {Packages}
         */
        this.packages = new Packages(this.axiosInstance);
    }
}
