import Vue from 'nativescript-vue'
import App from './components/App'
import store from './store';
import routes from './router'
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('BarcodeScanner', () => require('nativescript-barcodescanner').BarcodeScannerView)
Vue.prototype.$routes = routes;
const vm = new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
