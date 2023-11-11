/* eslint-disable no-console */
// Manual tests
const { TebexInstance } = require('../web-dev');

const server = new TebexInstance(process.ENV.TEBEX_SECRET_KEY, { timeout: 5000 });
const run = async () => {
    console.log(await server.players.retrieve(1805420));
    console.log(await server.players.packages(1805420));
    console.log(await server.server.information());
    console.log(await server.packages.all());
    console.log(await server.payments.all(1));
};

run();
