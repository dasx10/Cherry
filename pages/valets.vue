<template>
  <div>
    <b-button style='white-space:nowrap;' variant="success" @click="valetAddModal()">Add new valet</b-button>
    <b-table striped hover :items="valets" :fields="fields" v-if='!upload && valets.length > 0'>
      <template v-slot:cell(id_valet)="data">{{data.item.valet_id}}</template>
      <template v-slot:cell(id_airport)="data">
        <span v-if='locations.length > 0 && data.item.id_airport'>{{locations[data.item.id_airport].airport_name}}</span>
        <span v-else-if='data.item.id_airport'>{{data.item.id_airport}}</span>
        <span v-else class='text-danger'>No location</span>
      </template>
      <template v-slot:cell(Action)="data">
        <button class='btn btn-success' @click="valetEditModal(data.index, data.item.id_valet)"><img src="~/static/i/pen.svg" alt="Edit"></button>
        <button class="btn btn-primary" @click="valetShow(data.index)" :to='`/valets/${data.index}`'><img src="~/static/i/eye.svg" alt="Show"></button>
        <button v-if='selected' class="btn btn-danger" @click="valetDelete(data.item.id_valet)"><img src="~/static/i/x.svg" alt="Deactivated"></button>
        <button v-else class="btn btn-warning" @click="valetDelete(data.item.id_valet)"><img src="~/static/i/v.svg" alt="Deactivated"></button>
      </template>
      <template v-slot:cell(total_earning)="data">
        {{data.item.total_earning}} $
      </template> 
    </b-table>
    <div v-else-if='!upload'><br><b-spinner variant="success" label="Text Centered"></b-spinner></div>
    <div v-else class="alert alert-success" role="alert">No data!</div>
    <!-- add modal -->
    <b-modal id="addVal" title="Add new valet" centered hide-footer>
      <b-form @submit.prevent="addValet">
      <div v-if='errMsg && s' class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong class='mx-auto'>{{errMsg}}!</strong> 
        <button type="button" class="close" @click="$store.commit('Users/delErrMsg')">&times;</button>
      </div>
      <b-form-group label="Name:" label-for="AvN">
        <b-form-input id="AvN" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group label="Last name:" label-for="AvLn">
        <b-form-input id="AvLn" required placeholder="Enter last name"></b-form-input>
      </b-form-group>
      <b-form-group label="Email address:" label-for="AvM">
        <b-form-input id="AvM" type="email" required placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group label="Location:" label-for="AvL">
        <select id='AvL' class="custom-select" v-if='locations.length > 0'>
          <option value="0">-- No location --</option>
          <option v-if='location' v-for='location in locations' :key='location.id_airport' :value="location.id_airport">{{location.airport_name}}</option>
        </select>
      </b-form-group>
      <b-form-group label="Avatar:" label-for="AvA">
        <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
      </b-form-group>
        <b-button v-if='!singlUpload' block type='submit' variant="success">Add new Valet</b-button>
        <b-button v-else block class="btn btn-success" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading... <input type="hidden" :value='s=true'>
        </b-button>
        <input v-if='s && !singlUpload' type="hidden" :value='control("addVal")'>
      </b-form>
    </b-modal>
    <!-- end add modal -->
    <!-- edit modal -->
    <b-modal id="editVal" title="Edit valet" centered hide-footer>
      <b-form enctype="multipart/form-data" method="post" @submit.prevent="editValet" v-if='valets[i]'>
        <div v-if='errMsg && s' class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong class='mx-auto'>{{errMsg}}!</strong> 
          <button type="button" class="close" @click="$store.commit('Users/delErrMsg')">&times;</button>
        </div>
        <b-form-group label="Name:" label-for="EvN">
          <b-form-input id="EvN" :value='valets[i].full_name.split(" ")[0]' required placeholder="Enter name"></b-form-input>
        </b-form-group>
        <b-form-group label="Last name:" label-for="EvLn">
          <b-form-input id="EvLn" :value='valets[i].full_name.split(" ")[1]' required placeholder="Enter last name"></b-form-input>
        </b-form-group>
        <b-form-group label="Location:" label-for="EvL">
          <select id='EvL' class="custom-select" v-if='locations.length > 0'>
            <option v-if='!valets[i].id_airport' value="0" :selected='valets[i].id_airport == 0' :disabled='valets[i].id_airport == 0'>-- No location --</option>
            <option v-if='location' v-for='location in locations' :key='location.id_airport' :value="location.id_airport" :selected='location.id_airport == valets[i].id_airport'>{{location.airport_name}}</option>
          </select>
        </b-form-group>
        <b-form-group label="Avatar:">
          <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
        </b-form-group>
        <b-button v-if='!singlUpload' block type='submit' variant="success">Edit valet</b-button>
        <b-button v-else block class="btn btn-success" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading... <input type="hidden" :value='s=true'>
        </b-button>
        <input v-if='s && !singlUpload && !errMsg' type="hidden" :value='control(2)'>
      </b-form>
    </b-modal>
    <!-- end edit modal -->
    <!-- show valet modal -->
    <b-modal id="valInf" title="Valet" centered hide-footer>
      <div class="d-flex text-center" v-if='valets[i]'>
        <div v-if='valets[i].profile_picture_path' class="ava" :style='`background-image:url("${valets[i].profile_picture_path}")`'></div>
        <div class='m-auto'>
          <h3>{{valets[i].full_name}}</h3>
          <p><a :href="`mailto:${valets[i].email}`">{{valets[i].email}}</a></p>
          <p><b>Valet ID: </b><em>{{valets[i].valet_id}}</em></p>
          <p v-if='locations.length > 0'><b>GEO: </b><em style='color:red;' v-if='!valets[i].id_airport || !locations[valets[i].id_airport].airport_name'>no location</em><em v-else>{{locations[valets[i].id_airport].airport_name}}</em></p>
          <p><b>Rate: </b><em>{{valets[i].avg_rate}}/5</em></p>
          <p><b>Total Earning: </b><em>{{valets[i].total_earning}}</em></p>
        </div>
      </div>
    </b-modal>
    <!-- end show valet modal -->
  </div>
</template>
<script>
  export default {
    middleware:['auth','role'],
    computed:{
      valets(){return this.$store.getters['Users/valets']},
      upload(){return this.$store.getters['Users/upload']},
      singlUpload(){return this.$store.getters['Users/singlUpload']},
      locations(){return this.$store.getters['Locations/locations']},
      errMsg(){return this.$store.getters['Users/errMsg']}
    },
    data:()=>({
        file:null,
        selected:1,
        options:[
          {value:0,text:'Deactivated'},
          {value:1,text:'Actived'},
        ],
        s:false,
        i:0,
        id:null,
        fields:[{
          key:'full_name',
          label:'Name',
          sortable:true
        },{
          key:'email',
          label:'Email',
          class:'nVsSm',
          sortable:true
        },{
          key:'id_valet',
          label:'Valet ID',
          class:'nVsSm',
          sortable:true
        },{
          key:'id_airport',
          label:'location',
          sortable:true
        },{
          key:'total_earning',
          sortable:true,
          class:'nVsMd'
        },{
          key:'avg_rate',
          sortable:true,
          class:'nVsMd'
        },{
          key:'Action'
        }]
    }),
    methods:{
      async addValet(){
        let idAir = +document.getElementById('AvL').value;
        let data=await{
          full_name:document.getElementById('AvN').value+' '+document.getElementById('AvLn').value,
          email:document.getElementById('AvM').value,
          profile_picture:this.file
        }
        if(idAir > 0){
          data.id_airport = idAir
        }
        this.$store.dispatch('Users/addValet',data);
      },

      control(){
        if(!this.errMsg){
          this.s=false;
          this.$bvModal.hide(this.modal);
          this.$store.dispatch('Users/getValets',this.selected);
        }
      },

      async editValet(){
        let idAir = +document.getElementById('EvL').value;
        let data=await{
          id_valet:this.id,
          full_name:document.getElementById('EvN').value+" "+document.getElementById('EvLn').value,
          profile_picture:this.file
        }
        if(idAir > 0){
          data.id_airport = idAir
        }
        await this.$store.dispatch('Users/editValet',data);
        if(!this.$store.state['Users/errMsg']){
        }
      },

      async valetDelete(id){
        let data = {
          id:id,
        }
        this.$store.dispatch('Users/deleteValet',data);
      },

      async valetEditModal(i,id){
        this.file = null;
        this.s = false;
        this.id=id;
        this.i=i;
        this.modal = 'editVal'
        this.$bvModal.show(this.modal);
      },
      async valetAddModal(){
        this.s = false;
        this.modal = 'addVal'
        this.$bvModal.show(this.modal);
      },
      async valetShow(i){
        this.i=i;
        this.$bvModal.show('valInf');
      },
      getValets(){
        this.$store.dispatch('Users/getValets',this.selected);
      }
    },
    async mounted(){
      this.getValets();
      if(this.locations.length==0){
        this.$store.dispatch('Locations/getLoction');
      }
    }
  }
</script>
<style>
  .ava{
    height:250px;width:250px;
    background-position:center;background-size:100%;background-repeat:no-repeat;
  }
</style>