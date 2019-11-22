<template>
<b-form @submit.prevent="send">
<b-row class="text-center map" style='min-height:calc(100vh - 150px);'>
    <b-col md='7' lg='8'>
        <gmap-map :center="center" :zoom="3" map-type-id="terrain" style="width:100%;height:100%;min-height:300px;" >
            <gmap-marker @dragend="updateMaker" :position="loc" :clickable="true" :draggable="true" @click="center=loc,usePlace"></gmap-marker>
        </gmap-map>
    </b-col>
    <b-col md='5' lg='4'>
        <div class="input-group my-4" v-if='!edit'>
            <GmapAutocomplete id='pos' class="form-control" :position.sync="loc" @keyup.enter="usePlace" @place_changed="setPlace"></GmapAutocomplete>
            <div class="input-group-append nVsSm">
                <button class="btn btn-outline-success" type="button" id="button-addon2" @click='usePlace'>SEARCH</button>
            </div>
            <b-button class='vsSm my-3' block variant="outline-success" @click="usePlace">Search</b-button>
        </div>
        <div class="form-group my-3">
            <label for="nameLoc">Location title</label>
            <input class="form-control" id="nameLoc" :placeholder="`default: ${place.name}`" v-model='nameLocation'>
        </div>
        <div class="form-group my-3">
            <label for="costLoc">One night cost</label>
            <input class="form-control" id="costLoc" v-model='cost' @input='number' required placeholder="Enter cost">
        </div>
        <b-input-group prepend="lng" class="mt-3 inf nVsSm">
             <b-form-input v-model='loc.lng' disabled></b-form-input>
        </b-input-group>
        <b-input-group prepend="lat" class="my-3 inf nVsSm">
             <b-form-input v-model='loc.lat' disabled></b-form-input>
        </b-input-group>
        <b-button type='submit' class='mb-3' v-if='!s && !upload && edit !== false && place !== "" && place !== null && !place.geometry' block variant="success">Edit location</b-button>
        <b-button type='submit' class='mb-3' v-else-if='!s && !upload && edit === false && place !== "" && place !== null && !place.geometry' block variant="success">Add new location</b-button>
        <b-button v-else-if='s || upload' class="mb-3" variant="success" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading... <input type="hidden">
        </b-button>
        <b-button class='cl' block variant="secondary" to='/loc'>Close</b-button>
        <div class='opac'></div>
    </b-col>
</b-row>
</b-form>
</template>
<script>
    export default {
        middleware:['auth','role'],
        computed:{
            location(){return this.$store.getters['Locations/location']},
            upload(){return this.$store.getters['Locations/singlUpload']}
        },
        data:()=>({
            nameLocation:'',
            cost:'',
            center:{lat: 11.0, lng: 11.0},
            loc:{lat: 11.0, lng: 11.0},
            place:'',
            edit:false,
            s:false,
        }),
        mounted(){
            this.s = false;
            document.getElementById('pos').value=this.location.address;
            this.place = {
                address:this.location.address,
                name:this.location.airport_name
            }
            this.cost = this.location.one_night_cost;
            this.center=this.loc={
                lat:this.location.latitude,
                lng:this.location.longitude
            }
            if(this.location.index==undefined){
                this.edit=false;
            }else{
                this.edit=this.location.index;
            }
        },
        methods: {
            setPlace(place) {
                this.place = place
            },
            usePlace(place) {
                if (this.place.geometry) {
                    this.loc = {
                        lat: this.place.geometry.location.lat(),
                        lng: this.place.geometry.location.lng(),
                    };
                    this.center = this.loc;
                    this.place = {
                        name:this.place.name?this.place.name:this.place.address_components[0].long_name,
                        address:this.place.formatted_address
                    }
                }
            },
            updateMaker(e) {
                if(!this.edit){
                const geo = new google.maps.Geocoder()
                console.log(e.latLng)
                geo.geocode({'latLng':e.latLng},(result,status) => {
                    if(status===google.maps.GeocoderStatus.OK){
                        this.place = {
                            name:result[0].address_components[0].long_name,
                            address:result[0].formatted_address,
                        } 
                        document.getElementById('pos').value = result[0].formatted_address
                        document.getElementById('nameLoc').placeholder = result[0].address_components[0].long_name
                    }
                })
                this.loc={lat:e.latLng.lat(),lng:e.latLng.lng(),}
                }else{
                    this.loc = {
                        lat:this.location.latitude,
                        lng:this.location.longitude
                    }
                }
            },
            send(){
                this.s = true;
                if(this.nameLocation != ''){
                    this.place.name = this.nameLocation;
                }
                if(this.edit){
                    this.editLocation();
                }else{
                    this.addLocation();
                }
                setTimeout(this.s=false,2000);
            },
            addLocation(){
                let data = {
                    airport_name:this.place.name,
                    address:this.place.address,
                    longitude:this.loc.lng,
                    latitude:this.loc.lat,
                    one_night_cost:+this.cost
                };
                this.$store.dispatch('Locations/addLocation',data);
            },
            editLocation(){
                let d = new Date();
                let time = d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear();
                let data = {
                    id_airport:this.location.index,
                    airport_name:this.place.name,
                    address:this.place.address,
                    longitude:this.loc.lng,
                    latitude:this.loc.lat,
                    one_night_cost:+this.cost
                };
                this.$store.dispatch('Locations/editLocation',data);
            },
            number(){
                this.cost = this.cost.replace(/[^\d\.]/g, '');
            }
        }
    }
</script>
<style>
    .map{
        border-radius:10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        padding:10px 0;
        margin:5px;
    }
    .cl{
        position: absolute;
        width:calc(100% - 30px);
        bottom:0px;
    }
    .opac{
        height:40px;
    }
    @media(max-width:769px){
        .map{
            margin:5px 5px 40px 5px;
        }
    }
    @media(max-width:576px){
        .map{
            box-shadow:none;
            padding:0;
            margin:10px 0 0 0;
        }
    }
</style>