import { AxiosInstance } from 'axios';

export class ApiEndpoint {
    constructor(axiosInstance) {
    /**
     * Axios instance for the specific Tebex server/webstore.
     *
     * @private
     * @type {AxiosInstance}
     */
        this.axiosInstance = axiosInstance;
    }
}
