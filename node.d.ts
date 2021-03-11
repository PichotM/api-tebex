import { AxiosInstance } from 'axios';

declare module 'api-tebex' {
    class ApiEndpoint {
        constructor(axiosInstance: AxiosInstance);
    }

    export interface SimplePackage {
        id: number;
        name: string;
    }

    export interface Package {
        id: number;
        name: string;
        image: string;
        price: number;
        expiryLength: number;
        expiryPeriod: string;
        type: string;
        category: { id: number, name: string };
        globalLimit: number;
        globalLimitPeriod: string;
        userLimit: number;
        useLimitPeriod: string;
        servers: SimplePackage[];
        requiredPackages: number[];
        requireAny: boolean;
        createGiftcard: boolean;
        showUntil: number;
        guiItem: string;
        disabled: boolean;
        disableQuantity: boolean;
        customPrice: number;
        chooseServer: boolean;
        limitExpires: number;
        inheritCommands: number;
        variableGiftcard: number;
    }

    class Packages extends ApiEndpoint {
        all(): Promise<Package[]>;
        retrieve(id: string): Promise<Package>;
    }

    export interface Currency {
        iso4217: string;
        symbol: string;
    }

    export interface TebexPlayer {
        id: number;
        name: string;
        uuid: number;
    }

    export interface Payment {
        id: number;
        amount: number;
        date: Date;
        currency: Currency;
        player: TebexPlayer;
    }

    export interface Transaction {
        id: number;
        amount: number;
        status: string;
        date: Date;
        currency: Currency;
        player: TebexPlayer;
        packages: SimplePackage[];
    }

    class Payments extends ApiEndpoint {
        all(limit?: number): Promise<Payment[]>;
        retrieve(transactionId: string): Promise<Transaction>;
    }

    export interface PlayerPayment {
        transactionId: string;
        time: Date;
        price: number;
        currency: string;
        status: number;
    }

    export interface PlayerInfo {
        player: { id: string, createdAt: Date, updatedAt: Date, cacheExpire: Date, username: string, meta: any, pluginUsernameId: string };
        banCount: number;
        payments: PlayerPayment[];
        purchaseTotals: { [currency: string]: number };
    }

    class Players extends ApiEndpoint {
        retrieve(user: string): Promise<PlayerInfo>;
    }

    export interface WebstoreInformation {
        account: { id: number, domain: string, name: string };
        currency: Currency;
        onlineMode: boolean;
        gameType: string;
        logEvents: boolean;
        server: { id: number, name: string };
    }

    export interface WebstoreCommunityGoal {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        account: number;
        name: string;
        description: string;
        image: string;
        target: string;
        current: string;
        repeatable: number;
        lastAchieved: Date;
        timesAchieved: number;
        status: string;
        sale: number;
    }

    export interface Sales {
        id: number;
        effective: { type: string, packages: number[], categories: number[] };
        discount: { type: string, percentage: number, value: number };
        start: Date;
        expire: Date;
        order: number;
    }

    class Server extends ApiEndpoint {
        information(): Promise<WebstoreInformation>;
        communityGoals(): Promise<WebstoreCommunityGoal[]>;
        communityGoal(id: number): Promise<WebstoreCommunityGoal>;
        sales(): Promise<Sales[]>;
    }

    interface TebexInstanceOptions {
        timeout?: number;
        pluginUrl?: string;
    }

    export class TebexInstance {
        constructor(apiKey: string, options?: TebexInstanceOptions);
        private axiosInstance: AxiosInstance;

        public server: Server;
        public payments: Payments;
        public players: Players;
        public packages: Packages;
    }
}
