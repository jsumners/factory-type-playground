"use strict";

const path = require("path");
const glob = require("glob");

const clientProto = {};

// We want to bind every method's `this` to the root client object.
// So we will cache all methods on the first `require` of this factory
// code. Then we can iterate the methods when creating a new client and
// bind them correctly.
const methodCollections = {};
const methods = glob.sync("**/*.method.js", {
  cwd: __dirname,
});
for (const method of methods) {
  const collection = path.dirname(method);
  const methodName = path.basename(method, ".method.js");
  const func = require(path.join(__dirname, method));
  if (!methodCollections[collection]) {
    methodCollections[collection] = {};
  }
  methodCollections[collection][methodName] = func;
}

/**
 * An API client with endpoint organized by topic.
 *
 * @param {string} username User that has access to the API.
 * @param {string} password Password for the user.
 *
 * @returns {object} An API client.
 */
module.exports = function clientFactory({ username, password }) {
  if (typeof username !== "string") {
    throw Error("Username must be a string");
  }
  if (typeof password !== "string") {
    throw Error("Password must be a string");
  }

  const instance = Object.create(clientProto, {
    [Symbol.for("client.internals")]: {
      value: {
        username,
        password,
        baseUrl: "http://example.com/api",
      },
    },
  });

  for (const collection of Object.keys(methodCollections)) {
    Object.defineProperty(instance, collection, {
      value: {},
    });
    for (const method of Object.keys(methodCollections[collection])) {
      const func = methodCollections[collection][method];
      instance[collection][func.name || method] = func.bind(instance);
    }
  }

  return instance;
};
