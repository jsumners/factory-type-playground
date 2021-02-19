"use strict";

/**
 * Clear all items from the shopping cart.
 */
module.exports = async function clear() {
  const { baseUrl, username, password } = this[Symbol.for("client.internals")];

  return `${baseUrl}/${username}/${password}/clear`;
};
