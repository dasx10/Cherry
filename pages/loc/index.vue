<template>
  <div>
    <b-button @click="edit(false)" variant="success">Add new location</b-button>
    <b-table striped hover :items="locations" :fields="fields" v-if='upload && locations.length>0'>
      <template v-slot:cell(Action)="data">
          <button class="btn btn-success" @click="edit(data.index, data.item.id_airport)"><img src="~/static/i/pen.svg" alt="Edit"></button>
          <button class="btn btn-danger" @click="del(data.index)"><img src="~/static/i/del.svg" alt="Remove"></button>
      </template>
    </b-table>
    <div v-else-if='!upload'><br><b-spinner variant="success" label="Text Centered"></b-spinner></div>
    <div v-else class="alert alert-success" role="alert">No data!</div>
  </div>
</template>
<script>
  export default {
    middleware:['auth','role'],
    computed:{
      upload(){return this.$store.getters['Locations/upload']},
      locations(){return this.$store.getters['Locations/locations']}
    },
    data:()=>({
      fields:[
        {
          key:'airport_name',
          label:'Location',
          sortable:true,
          class:'text-center'
        },{
          key:'address',
          sortable:true,
          class:'text-center nVsSm mw3'
        },{
          key:'longitude',
          sortable:true,
          class:'text-center nVsMd'
        },{
          key:'latitude',
          sortable:true,
          class:'text-center nVsMd'
        },{
          key:'one_night_cost',
          label:'Cost',
          sortable:true,
          class:'text-center nVsSm'
        },{
          key:'Action',
          class:'text-center',
        }
      ],
    }),
    methods:{
      async del(index){
        this.$store.dispatch('Locations/deleteLocation',index);
      },
      async edit(index,id){
        let idAir = {
          index,id
        }
        this.$store.commit('Locations/set',idAir);
      },
       getLocation(){
        this.$store.dispatch('Locations/getLoction');
      }
    },
    async mounted(){
      this.getLocation();
    }
  }
</script>
<style>
  .mw3{
    max-width:25vw;
  }
</style>