import { Endpoints, SimplePackage } from '../const';
import { formatEndpoint, makeApiPromise } from '../utils';

import { ApiEndpoint } from './model';
import { Error } from '../errors/handler';

/**
 * @classdesc Packages data API.
 * @name Packages
 * @class
 */
export class Packages extends ApiEndpoint {
    /**
     * Package object
     *
     * @typedef {object} Package
     * @property {number} id
     * @property {string} name
     * @property {string} image
     * @property {number} price
     * @property {number} expiryLength
     * @property {string} expiryPeriod
     * @property {string} type
     * @property {object} category
     * @property {number} category.id
     * @property {string} category.name
     * @property {number} globalLimit
     * @property {string} globalLimitPeriod
     * @property {number} userLimit
     * @property {string} useLimitPeriod
     * @property {SimplePackage[]} servers
     * @property {number[]} requiredPackages
     * @property {boolean} requireAny
     * @property {boolean} createGiftcard
     * @property {number} showUntil
     * @property {string} guiItem
     * @property {boolean} disabled
     * @property {boolean} disableQuantity
     * @property {number} customPrice
     * @property {boolean} chooseServer
     * @property {number} limitExpires
     * @property {number} inheritCommands
     * @property {number} variableGiftcard
     */

    /**
     * Listing package object
     *
     * @typedef {object} ListingPackage
     * @property {number} id The package ID.
     * @property {number} order The order in which the package should be displayed.
     * @property {string} name The package name.
     * @property {string} price The price of the package (in the default webstore currency).
     * @property {string} discounted_price The price of the package reduced by the discount value of its active sale.
     * @property {string | false} image The package image URL.
     * @property {object} sale
     * @property {boolean} sale.active Whether the package is on sale.
     * @property {string} sale.discount The discount to apply to the price of the package.
     */

    /**
     * Listing category object
     *
     * @typedef {object} ListingCategory
     * @property {number} id The category ID.
     * @property {number} order The order in which the category should be displayed.
     * @property {string} name The category name.
     * @property {boolean} only_subcategories Whether the category should only display subcategories.
     * @property {ListingPackage[]} packages The packages in the category.
     */

    /**
     * Listing object
     *
     * @typedef {object} Listing
     * @property {ListingCategory[]} categories
     */

    /**
     * Get a list of all packages on your webstore.
     *
     * @returns {Promise<Package[]>} Package information.
     * @throws {Error}
     * @example
     * tebexInstance.packages.all()
     */
    all() {
        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.PACKAGES) }, (data) => data.map((a) => ({
            id: a.id,
            name: a.name,
            image: a.image,
            price: a.price,
            expiryLength: a.expiry_length,
            expiryPeriod: a.expiry_period,
            type: a.type,
            category: a.category,
            globalLimit: a.global_limit,
            globalLimitPeriod: a.global_limit_period,
            userLimit: a.user_limit,
            userLimitPeriod: a.user_limit_period,
            servers: a.servers,
            requiredPackages: a.required_packages,
            requireAny: a.require_any,
            createGiftcard: a.create_giftcard,
            showUntil: a.show_until,
            guiItem: a.gui_item,
            disabled: a.disabled,
            disableQuantity: a.disable_quantity,
            customPrice: a.custom_price,
            chooseServer: a.choose_server,
            limitExpires: a.limit_expires,
            inheritCommands: a.inherit_commands,
            variableGiftcard: a.variable_giftcard
        })));
    }

    /**
     * Retrieve a package from the webstore.
     *
     * @param {string} id - The package ID .
     * @returns {Promise<Package>} Package information.
     * @throws {Error}
     * @example
     * // Returns the package with a specific id
     * tebexInstance.packages.retrieve(10000)
     */
    retrieve(id) {
        if (!id) throw new Error('INVALID_REQUEST', 'The package id is missing');

        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.PACKAGE, id) }, (data) => ({
            id: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            expiryLength: data.expiry_length,
            expiryPeriod: data.expiry_period,
            type: data.single,
            category: data.category,
            globalLimit: data.global_limit,
            globalLimitPeriod: data.global_limit_period,
            userLimit: data.user_limit,
            userLimitPeriod: data.user_limit_period,
            servers: data.servers,
            requiredPackages: data.required_packages,
            requireAny: data.require_any,
            createGiftcard: data.create_giftcard,
            showUntil: data.show_until,
            guiItem: data.gui_item,
            disabled: data.disabled,
            disabledQuantity: data.disable_quantity,
            customPrice: data.custom_price,
            chooseServer: data.choose_server,
            limitExpires: data.limit_expires,
            inheritCommands: data.inherit_commands,
            variableGiftcard: data.variable_giftcard
        }));
    }

    /**
     * Get the categories and packages which should be displayed to players in game.
     *
     * @returns {Promise<Listing>}
     * @throws {Error}
     * @example
     * tebexInstance.packages.listing()
     */
    listing() {
        return makeApiPromise(this.axiosInstance, { url: formatEndpoint(Endpoints.LISTING) }, (data) => ({
            categories: data.categories.sort((a, b) => a.order - b.order).map((c) => ({
                ...c,
                packages: c.packages.sort((a, b) => a.order - b.order).map((p) => {
                    const discountedPrice = p.sale.active ? Number(p.price) - Number(p.sale.discount) : Number(p.price);

                    return {
                        ...p,
                        discounted_price: String(discountedPrice)
                    };
                })
            }))
        }));
    }
}
