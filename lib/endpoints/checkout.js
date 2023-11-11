import { formatEndpoint, makeApiPromise } from '../utils';

import { ApiEndpoint } from './model';
import { Endpoints } from '../const';

export class Checkout extends ApiEndpoint {
    /**
     * Checkout object
     *
     * @typedef {object} CheckoutCart
     * @property {string} url
     * @property {Date} expires
     */

    /**
     * Create a Tebex checkout URL
     *
     * @param {string} packageID
     * @param {string} username
     * @returns {Promise<CheckoutCart>} The created checkout
     * @throws {Error}
     * @example
     * tebexInstance.checkout.create(123, "SomeUser")
     */
    create(packageID, username) {
        return makeApiPromise(this.axiosInstance, {
            url: formatEndpoint(Endpoints.CHECKOUT),
            data: { package_id: packageID, username }
        }, (data) => ({
            url: data.url,
            expires: new Date(data.expires)
        }));
    }
}
