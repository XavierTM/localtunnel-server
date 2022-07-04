
console.clear();


const { config } = require('dotenv');

const log = require('book');

const CreateServer = require('../server');

config();

const debug = console.debug;

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT || 8080;
const MAX_TCP_SOCKETS = process.env.MAX_TCP_SOCKETS || 10;
const DOMAIN = process.env.DOMAIN;
const ADDRESS = process.env.ADDRESS || '0.0.0.0';
const SECURE = (process.env.SECURE || '').toLowerCase() === 'true' ? true : false;

if (!DOMAIN) {
    throw new Error('Please set the DOMAIN environment variable');
}


const server = CreateServer({
    max_tcp_sockets: MAX_TCP_SOCKETS,
    secure: SECURE,
    domain: DOMAIN,
});

server.listen(PORT, ADDRESS, () => {
    debug('server listening on port: %d', server.address().port);
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('SIGTERM', () => {
    process.exit();
});

process.on('uncaughtException', (err) => {
    log.error(err);
});

process.on('unhandledRejection', (reason, promise) => {
    log.error(reason);
});

