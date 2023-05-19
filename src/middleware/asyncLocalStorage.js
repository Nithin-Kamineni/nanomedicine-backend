"use strict";
const { AsyncLocalStorage } = require("async_hooks");
const asyncLocalStorage = new AsyncLocalStorage();
const uuid = require("uuid");
const _ = require("lodash");

const initLocalStore = (_req, _res, next) => {
  asyncLocalStorage.run(new Map(), () => {
    asyncLocalStorage.getStore().set("request_id", uuid.v4());
    console.log(`checking db for auth0 details : req_id ${asyncLocalGet("request_id")}`);
    next();
  });
};

const asyncLocalGet = (key) => {
  const store = asyncLocalStorage.getStore();
  if (!_.isEmpty(store) && store.has(key)) {
    return store.get(key);
  }
};

const asyncLocalPut = (key, val) => {
  const store = asyncLocalStorage.getStore();
  if (!_.isEmpty(store)) {
    return store.set(key, val);
  }
};
module.exports = { initLocalStore, asyncLocalGet, asyncLocalPut };
