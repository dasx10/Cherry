<template>
  <div class='tab'>
    <gmap-map :center="{lat:0,lng:0}" hidden map-type-id="terrain"></gmap-map>
    <b-table striped hover :items="transactions" :fields="fields" v-if='upload && transactions.length>0'>
      <template v-slot:cell(date_of_order_creation)="data">
        {{data.item.date_of_order_creation.getDay()}}/{{data.item.date_of_order_creation.getMonth()}}/{{data.item.date_of_order_creation.getFullYear()}}
      </template>
      <template v-slot:cell(accepted)="data">
        {{data.item.accepted?'True':'NA'}}
      </template>
      <template v-slot:cell(returned)="data">
        {{data.item.returned?'True':'NA'}}
      </template>
      <template v-slot:cell(GEO)="data">
        <span v-if='address[data.index]'>{{address[data.index]}}</span>
        <span v-else>
          <span hidden>{{$store.dispatch('Trans/getTrans')}}</span>
          <span v-if="data.index == 0" hidden>{{getAdress(data.index)}}</span>
          loading
          <div class="spinner-border spinner-border-sm ml-1" role="status"></div>
        </span>
      </template>
    </b-table>
    <div v-else-if='!upload'><br><b-spinner variant="success" label="Text Centered"></b-spinner></div>
    <div v-else class="alert alert-success" role="alert">No data!</div>
  </div>
</template>
<script>
  export default {
    middleware:['auth'],
    computed:{
      transactions(){return this.$store.getters['Trans/transactions']},
      upload(){return this.$store.getters['Trans/upload']},
    },
    data:()=>({
      timestamp:[],
      address:[],
      fields:[
        {
          key:'date_of_order_creation',
          label:'Timestamp',
          sortable:true
        },{
          key:'driver_email',
          label:'Customer ID',
          sortable:true
        },{
          key:'valet_id',
          label:'Valet ID',
          sortable:true
        },{
          key:'accepted',
          label:'ACCEPT',
          sortable:true
        },{
          key:'returned',
          label:'RETURN',
          sortable:true
        },{
          key:'GEO',
          sortable:true,
          class:'mw3',
        },{
          key:'order_price',
          label:'Trans_Amt',
          sortable:true
        },{
          key:'Tip',
          sortable:true
        },{
          key:'driver_rated',
          label:'Rating',
          sortable:true
        }
      ]
    }),
    methods:{
      getAdress(i){
        const geo = new google.maps.Geocoder()
        geo.geocode({latLng:{
            lat:this.$store.state['Trans'].transactions[i].drop_off_latitude,
            lng:this.$store.state['Trans'].transactions[i].drop_off_longitude
          }
          },(result) => {
          this.address[i]=result[0].formatted_address;
        })
      },
    },
    async mounted(){
      this.$store.dispatch('Trans/getTrans');
    }
  }
</script>