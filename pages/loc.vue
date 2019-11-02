<template>
  <div class='tab'>
    <b-table striped hover :items="items" :fields="fields"></b-table>
    <b-button v-b-modal.map variant="success">Add</b-button>
    <b-modal size="xl" id='map' centered>
        <b-form-group id="name" label="Location name:" label-for="lng">
            <b-form-input id="lng" v-model="form.name" type="text" required placeholder="Enter name"></b-form-input>
        </b-form-group>
        <b-form-group id="lng" label="longitude:" label-for="lng">
            <b-form-input id="lng" v-model="form.longitude" type="text" @input="find" required placeholder="Enter longitude"></b-form-input>
        </b-form-group>
        <b-form-group id="lng" label="latitude:" label-for="lng">
            <b-form-input id="lng" v-model="form.latitude" type="text" @input="find" required placeholder="Enter latitude"></b-form-input>
        </b-form-group>
        <b-button class='my-2' @click='find'>Сheck</b-button>
        <GMap v-if='ok' :cluster="{options: {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}}" :center="{lat: +form.latitude, lng: +form.longitude}"
            :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
            :zoom="6">
            <GMapMarker :position="{lat: +form.latitude, lng: +form.longitude}" @click="currentLocation = loc">
                <GMapInfoWindow>
                    <code>
                        lat: {{ form.latitude, }},
                        lng: {{ form.longitude, }}
                    </code>
                </GMapInfoWindow>
            </GMapMarker>
        </GMap>
    </b-modal>
  </div>
</template>
<script>
  export default {
    data:()=>({
      fields:[
        {
          key:'time',
          sortable:true
        },{
          key:'Airport',
          sortable:true
        },{
          key:'longitude',
          sortable:true
        },{
          key:'latitude',
          sortable:true
        }
      ],
      items:[
        {time:'1/12/18',Airport:'Air-1',longitude:45,latitude:15,},
        {time:'4/12/18',Airport:'Air-2',longitude:45,latitude:15,},
        {time:'12/12/18',Airport:'Air-4',longitude:45,latitude:15,}
      ],
      pins:{
        selected: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB...',
        notSelected: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAM...'
      },
      mapStyle:[],
      currentLocation:{},
      ok:false,
      form:{
        name:'',
          latitude:'',
          longitude:''
      },
    }),
    methods:{
      async find(){
        if(this.form.latitude!=''&&this.form.latitude!=''){
          this.ok = await false;
          this.ok = await true;
        }
      }
    }
  }
</script>