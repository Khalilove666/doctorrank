import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import {router} from "./router";
import {createPinia} from "pinia";
import {i18n} from "./plugins/i18n";
import moment from "moment";
import './styles/main.scss'

loadFonts()

const app = createApp(App)
// app.config.globalProperties.$moment = moment;

app.use(vuetify)
    .use(router)
    .use(createPinia())
    .use(i18n)
    .mount('#app')
