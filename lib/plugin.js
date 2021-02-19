"use strict";

const fp = require("fastify-plugin");
const factory = require("./client");

module.exports = fp(fastifyPlugin);

async function fastifyPlugin(fastify, options) {
  const client = factory(options);
  fastify.decorate("apiClient", client);
}
