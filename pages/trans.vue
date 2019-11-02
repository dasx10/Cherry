<template>
  <div class='tab'>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>
<script>
  export default {
    data:()=>({
      fields:[
        {
          key:'timestamp',
          sortable:true
        },{
          key:'Customer_ID',
          sortable:true
        },{
          key:'Valet_ID',
          sortable:true
        },{
          key:'ACCE_PT',
          sortable:true
        },{
          key:'RETURN',
          sortable:true
        },{
          key:'GEO',
          sortable:true
        },{
          key:'Trans_Amt',
          sortable:true
        },{
          key:'Tip',
          sortable:true
        },{
          key:'Rating',
          sortable:true
        }
      ],
      items:[
        {timestamp:'01/01/2019',Customer_ID:'Kris@emai.co',Valet_ID:'a35y2',ACCE_PT:'True',RETURN:'True',GEO:'LAX',Trans_Amt:'NA',Tip:'2$',Rating:'4/5'},
        {timestamp:'21/11/2019',Customer_ID:'Kris@emai.co',Valet_ID:'r4rr8',ACCE_PT:'NA',RETURN:'NA',GEO:'LAX',Trans_Amt:'127.20$',Tip:'5$',Rating:'5/5'},
        {timestamp:'25/09/2019',Customer_ID:'Kris@emai.co',Valet_ID:'t5e2e',ACCE_PT:'True',RETURN:'NA',GEO:'LAX',Trans_Amt:'127.20$',Tip:'6$',Rating:'3/5'},
        {timestamp:'31/02/2019',Customer_ID:'Kris@emai.co',Valet_ID:'abze1',ACCE_PT:'NA',RETURN:'True',GEO:'LAX',Trans_Amt:'127.20$',Tip:'4$',Rating:'1/5'}
      ]
    })
  }
</script>
<style>
  div.tab{
    padding:0 10px;
  }
  @media(max-width: 576px){
    div.tab{
      padding:0;
    }
  }
</style>