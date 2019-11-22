import Vue from 'vue';
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps';
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBgPuneG9CNmnod8G3KTD5qdb_QG-D1uws',
    libraries: "places" // necessary for places input
  },
})

