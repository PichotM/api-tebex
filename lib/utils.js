import { Error } from './errors/handler';

export const makeApiPromise = (instance, {
    method = 'GET', url, data, params
}, cb) => new Promise((resolve, reject) => {
    instance({
        method, url, data, params
    })
        .then((res) => resolve(cb(res.data)))
        .catch((err) => reject(new Error('INVALID_REQUEST', err)));
});

export const formatEndpoint = (endpoint, ...args) => (typeof endpoint === 'function' ? endpoint(args) : endpoint);
