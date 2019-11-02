<template>
  <div class='tab'>
    <b-table striped hover :items="items" :fields="fields"></b-table>
    <b-button variant="success" v-b-modal.addVal>Add valet</b-button>
    <b-modal id="addVal" title="BootstrapVue" centered hide-footer>
      <b-form-group label="Email name:" label-for="val-name">
        <b-form-input id="val-name" v-model="form.name" type="text" required placeholder="Enter name"></b-form-input>
      </b-form-group>
      <b-form-group label="Email address:" label-for="val-mail">
        <b-form-input id="val-mail" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-button variant="success" @click='pushVal'>Add</b-button>
    </b-modal>
  </div>
</template>
<script>
    export default {
        data:()=>({
          form:{
            email:'',
            name:''
          },
          fields:[
          {
            key:'Name',
            sortable:true
          },{
            key:'Email',
            sortable:true
          },{
            key:'Valet_ID',
            sortable:true
          },{
            key:'time',
            sortable:true
          }
        ],
        items:[
          {Name:'Val',Email:'valet@cherry.com',Valet_ID:'15d6f99',time:'1/12/18'},
          {Name:'Pirat',Email:'pirat@cherry.com',Valet_ID:'16g523',time:'6/13/18'},
          {Name:'Pupkin',Email:'vasya@cherry.com',Valet_ID:'99v8vg',time:'4/12/18'},
          {Name:'Dron',Email:'dron@cherry.com',Valet_ID:'116838',time:'31/2/19'},
        ]
      }),
      methods:{
        pushVal(){
          let d = new Date();
          let time = d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear();
          let valet = {
            Name:this.form.name,
            Email:this.form.email,
            Valet_ID:d.getTime(),
            time:time
          }
          console.log(this.name)
          this.items.unshift(valet)
        }
      }
    }
</script>
<style>
  thead{
    background:linear-gradient(rgb(255, 100, 100),rgb(255, 200, 200));
  }
</style>