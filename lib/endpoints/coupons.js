import { formatEndpoint, makeApiPromise } from '../utils';

import { ApiEndpoint } from './model';
import { Endpoints } from '../const';

export class Coupons extends ApiEndpoint {
    /**
     * Coupon object
     *
     * @typedef {object} Coupon
     * @property {number} id
     * @property {string} code
     * @property {object} effective
     * @property {string} effective.type
     * @property {number[]} effective.packages
     * @property {number[]} effective.categories
     * @property {object} discount
     * @property {string} discount.type
     * @property {number} discount.percentage
     * @property {number} discount.value
     * @property {object} expire
     * @property {boolean} expire.redeemUnlimited
     * @property {boolean} expire.expireNever
     * @property {number} expire.limit
     * @property {Date} expire.date
     * @property {string} basketType
     * @property {Date} startDate
     * @property {number} userLimit
     * @property {number} minimum
     * @property {string} username
     * @property {string} note
     */

    /**
     * Return a paginated list of coupons on your account.
     *
     * @returns {Promise<Coupon[]>}
     * @throws {Error}
     * @example
     * tebexInstance.coupons.all()
     */
    all() {
        return makeApiPromise(this.axiosInstance, {
            url: formatEndpoint(Endpoints.COUPONS),
            data: {}
        }, (data) => data.map(({ data: a }) => ({
            id: a.id,
            code: a.code,
            effective: a.effective,
            discount: a.discount,
            expire: {
                redeemUnlimited: a.expire.redeem_unlimited,
                expireNever: a.expire.expire_never,
                limit: a.expire.limit,
                date: new Date(a.expire.date)
            },
            basketType: a.basket_type,
            startDate: new Date(a.start_date),
            userLimit: new Date(a.user_limit),
            minimum: a.minimum,
            username: a.username,
            note: a.note
        })));
    }

    /**
     * Get a coupon by ID.
     *
     * @param {string} couponID
     * @returns {Promise<Coupon>}
     * @throws {Error}
     * @example
     * tebexInstance.coupons.retrieve("123")
     */
    retrieve(couponID) {
        return makeApiPromise(this.axiosInstance, {
            url: formatEndpoint(Endpoints.COUPON, couponID),
            data: {}
        }, ({ data }) => ({
            id: data.id,
            code: data.code,
            effective: data.effective,
            discount: data.discount,
            expire: {
                redeemUnlimited: data.expire.redeem_unlimited,
                expireNever: data.expire.expire_never,
                limit: data.expire.limit,
                date: new Date(data.expire.date)
            },
            basketType: data.basket_type,
            startDate: new Date(data.start_date),
            userLimit: new Date(data.user_limit),
            minimum: data.minimum,
            username: data.username,
            note: data.note
        }));
    }

    /**
     * Create a Tebex coupon code
     *
     * @param {string} code The code of the coupon.
     * @param {string} effectiveOn What this coupon should be effective on, either "package", "category" or "cart"
     * @param {number[]} packages An array of package IDs this coupon should apply to. Only used if effective_on is "package".
     * @param {number[]} categories An array of category IDs this coupon should apply to. Only used if effective_on is "category".
     * @param {string} discountType "percentage" or "value".
     * @param {number} discountAmount The currency amount to discount.
     * @param {number} discountPercentage The percentage amount to be discounted.
     * @param {number} discountApplicationMethod 0 = Apply to each package (default), 1 = Apply to basket (before sales), 2 = Apply to basket (after sales)
     * @param {boolean} redeemUnlimited Can the coupon be redeemed an unlimited amount of times.
     * @param {boolean} expireNever Should the coupon ignore the expire_date.
     * @param {number} expireLimit Only used if redeem_unlimited is false.
     * @param {string} expireDate Only used if expire_never is true - formatted in yyyy-mm-dd.
     * @param {string} startDate The start date of the coupon in the format of yyyy-mm-dd.
     * @param {string} basketType "single", "subscription", or "both".
     * @param {number} minimum Minimum value of basket before the coupon can be redeemed.
     * @param {string} username The username to restrict the coupon to.
     * @param {string} note The note to store against the coupon.
     * @returns {Promise<Coupon>}
     * @throws {Error}
     * @example
     * tebexInstance.coupons.create(...)
     */
    create(
        code,
        effectiveOn,
        packages,
        categories,
        discountType,
        discountAmount,
        discountPercentage,
        discountApplicationMethod,
        redeemUnlimited,
        expireNever,
        expireLimit,
        expireDate,
        startDate,
        basketType,
        minimum,
        username,
        note
    ) {
        return makeApiPromise(this.axiosInstance, {
            method: 'POST',
            url: formatEndpoint(Endpoints.CREATE_COUPON),
            data: {
                code,
                effective_on: effectiveOn,
                packages,
                categories,
                discount_type: discountType,
                discount_amount: discountAmount,
                discount_percentage: discountPercentage,
                discount_application_method: discountApplicationMethod,
                redeem_unlimited: redeemUnlimited,
                expire_never: expireNever,
                expire_limit: expireLimit,
                expire_date: expireDate,
                start_date: startDate,
                basket_type: basketType,
                minimum,
                username,
                note
            }
        }, ({ data }) => ({
            id: data.id,
            code: data.code,
            effective: data.effective,
            discount: data.discount,
            expire: {
                redeemUnlimited: data.expire.redeem_unlimited,
                expireNever: data.expire.expire_never,
                limit: data.expire.limit,
                date: new Date(data.expire.date)
            },
            basketType: data.basket_type,
            startDate: new Date(data.start_date),
            userLimit: new Date(data.user_limit),
            minimum: data.minimum,
            username: data.username,
            note: data.note
        }));
    }
}
