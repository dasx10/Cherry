<template>
  <div class='tab'>
    <b-button variant="success" v-b-modal.addVal class='my-2'>Add new valet</b-button>
    <b-table striped hover :items="items" :fields="fields" responsive ></b-table>
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
            key:'avatar',
            sortable:false
          },{
            key:'time',
            sortable:true
          }
        ],
        items:[
          {Name:'Val',Email:'valet@cherry.com',Valet_ID:'15d6f99',time:'1/12/18',avatar:''},
          {Name:'Pirat',Email:'pirat@cherry.com',Valet_ID:'16g523',time:'6/13/18',avatar:''},
          {Name:'Pupkin',Email:'vasya@cherry.com',Valet_ID:'99v8vg',time:'4/12/18',avatar:''},
          {Name:'Dron',Email:'dron@cherry.com',Valet_ID:'116838',time:'31/2/19',avatar:''},
          {Name:'Robert Row',Email:'robert@cherry.com',Valet_ID:'159216',time:'31/2/19',avatar:'https://images.pexels.com/photos/3031391/pexels-photo-3031391.jpeg'},
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
    background:#6C757D;
  }
</style>