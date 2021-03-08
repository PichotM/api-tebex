import { register } from './handler';

export const Labels = {
    SECRET_KEY_INVALID: 'An invalid secret key was provided.',
    INVALID_REQUEST: (err) => `Invalid request: ${err}`
};

// eslint-disable-next-line no-restricted-syntax
for (const [name, message] of Object.entries(Labels)) register(name, message);
