"use strict";

/**
 * Get the status of the shopping cart, e.g. items in the cart.
 */
module.exports = async function status() {
  const { baseUrl, username, password } = this[Symbol.for("client.internals")];

  return {
    address: `${baseUrl}/${username}/${password}`,
    items: [{ foo: "bar" }],
  };
};
