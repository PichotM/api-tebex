/**
 * @typedef {object} Currency
 * @property {string} iso4217
 * @property {string} symbol
 */

/**
 * @typedef {object} TebexPlayer
 * @property {number} id
 * @property {string} name
 * @property {number} uuid
 */

/**
 * SimplePackage object
 *
 * @typedef {object} SimplePackage
 * @property {number} id
 * @property {string} name
 */

export const Endpoints = {
    INFORMATION: '/information',
    QUEUE: '/queue',
    OFFLINE_COMMANDS: '/queue/offline-commands',
    OFFLINE_COMMAND: (id) => `/queue/online-commands/${id}`,
    DELETE_QUEUE: '/queue',
    LISTING: '/listing',
    PACKAGES: '/packages',
    PACKAGE: (pkg) => `/package/${pkg}`,
    UPDATE_PACKAGE: (pkg) => `/package/${pkg}`,
    COMMUNITY_GOALS: '/community_goals',
    COMMUNITY_GOAL: (id) => `/community_goal/${id}`,
    PAYMENTS: '/payments',
    PAYMENTS_PAGED: (id) => `/payments?paged=${id}`,
    PAYMENTS_TRANSACTION: (transaction) => `/payments/${transaction}`,
    PAYMENTS_FIELDS: (pkg) => `/payments/fields/${pkg}`,
    CREATE_PAYMENT: '/payments',
    UPDATE_PAYMENT: (transaction) => `/payments/${transaction}`,
    CREATE_PAYMENT_NOTE: (transaction) => `/payments/${transaction}/note`,
    CHECKOUT: '/checkout',
    GIFT_CARDS: '/gift-cards',
    GIFT_CARD: (id) => `/gift-cards/${id}`,
    CREATE_GIFT_CARD: '/gift-cards',
    DELETE_GIFT_CARD: (id) => `/gift-cards/${id}`,
    TOP_UP_GIFT_CARD: (id) => `/gift-cards/${id}`,
    COUPONS: '/coupons',
    COUPON: (id) => `/coupons/${id}`,
    CREATE_COUPON: '/coupons',
    DELETE_COUPON: (id) => `/coupons/${id}`,
    BANS: '/bans',
    CREATE_BAN: '/bans',
    SALES: '/sales',
    PLAYER: (id) => `/user/${id}`,
    PLAYER_PACKAGES: (id) => `/user/${id}/packages`
};
