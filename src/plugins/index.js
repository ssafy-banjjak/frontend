/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
// import piniaPersist from "pinia-plugin-persist";
import piniaPersistState from "pinia-plugin-persistedstate";

export function registerPlugins(app) {
  pinia.use(piniaPersistState);
  app.use(vuetify).use(pinia).use(router);
}
