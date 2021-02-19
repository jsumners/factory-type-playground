This is a simple test to determine if it is possible to use
TypeScript `.d.ts` files to provide IntelliSense to Visual Studio Code
for a traditional object created by composition through a factory function.

## Example 1

In this example, any time `client.` is written, the IDE should present
a completion list with `cart`. Subsequently, after choosing `cart`, a
completion list with `clear` and `status` should be presented.

The IDE should also provide descriptions of each function's parameters.
These descriptions should come from the included JSDoc blocks.

```js
const factory = require("./lib/client");
const client = factory({ username: "foo", password: "bar" });

const result = await client.cart.status();
```

## Example 2

This is the same as Example 1, except that it is ESM style code.

```js
import pkg from "./lib/client/index.js";
const { factory } = pkg;
const client = factory({ username: "foo", password: "bar" });

const result = await client.cart.status();
```

## Example 3

This is the same as Example 1, but uses the main module export.

```js
const factory = require("./");
const client = factory({ username: "foo", password: "bar" });

const result = await client.cart.status();
```

## Example 4

This is the same as Example 1, but uses a Fastify plugin.

```js
const { fastifyPlugin } = require("./");
const fastify = require("fastify")();

fastify.register(fastifyPlugin, { username: "foo", password: "bar" });

fastify.get("/", {
  async handler(req, res) {
    return client.cart.status();
  },
});
```
