import Vue from 'vue'
import Vuetify from 'vuetify'
import '@babel/polyfill'
import 'api/resource'
import router from 'router/router'
import App from 'pages/App.vue'
import store from 'store/store'
import { connect } from './util/ws'
import 'vuetify/dist/vuetify.css'
import * as Sentry from "@sentry/browser"
import { Vue as VueIntegration } from "@sentry/integrations"

Sentry.init({
    dsn: "https://a4470dc8162a431aa0af47effa390939@o437390.ingest.sentry.io/5399944",
    integrations: [new VueIntegration({ Vue, attachProps: true })],
});

Sentry.configureScope(scope =>
    scope.setUser({
        id: profile && profile.id,
        username: profile && profile.name
    })
)

if (profile) {
    connect()
}

Vue.use(Vuetify)

new Vue({
    el: '#app',
    store,
    router,
    render: a => a(App),
    vuetify: new Vuetify({}),
}).$mount('#app')