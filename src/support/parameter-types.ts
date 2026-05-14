import { defineParameterType } from "@cucumber/cucumber";
import { PAGE_ROUTES, ROLES } from "../config/constants.js";

defineParameterType({
  name: "page",
  regexp: new RegExp(Object.keys(PAGE_ROUTES).join("|")),
  transformer(pageName: string) {
    const route = PAGE_ROUTES[pageName];
    if (!route) throw new Error(`Unknown page: ${pageName}`);
    return { name: pageName, route };
  },
});

defineParameterType({
  name: "role",
  regexp: new RegExp(Object.values(ROLES).join("|")),
  transformer(role: string) {
    return role;
  },
});

defineParameterType({
  name: "httpMethod",
  regexp: /GET|POST|PUT|DELETE|PATCH/,
  transformer(method: string) {
    return method;
  },
});
