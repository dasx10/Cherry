<template>
    <div>
    <div v-if='user.name' class='container'>
        <b-row class='prof p-2 text-center'>
            <b-col md='12 mb-5'>
                <div v-if='user.ava' class="ava" :style='`background-image:url("${user.ava}")`'></div>
            </b-col>
            <b-col md='12'>
                <p class='mb-3 badge badge-pill badge-success' style='cursor:pointer;' v-b-modal.editProfile>Edit profile</p>
                <h3 v-if='user.name'>{{user.name ? user.name : 'No name'}}</h3>
                <p v-if='user.email'>{{user.email}}</p>
                <p v-if='user.valet_id'><b>Valet ID: </b> <em>{{user.valet_id}}</em></p>
                <p v-if='user.airport_name'><b>Location: </b> <em>{{user.airport_name}}</em></p>
                <p v-if='user.car_model'><b>Car model: </b> <em>{{user.car_model}}</em></p>
                <p v-if='user.plate_number'><b>Plate number: </b> <em>{{user.plate_number}}</em></p>
                <p v-if='user.avg_rate >= 0'><b>Rate: </b> <em>{{user.avg_rate}}/5</em></p>
            </b-col>
        </b-row>
        <b-modal id="editProfile" title="Valet" centered hide-footer>
            <div v-if='errMsg' class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong class='mx-auto'>{{errMsg}}!</strong> 
            <button type="button" class="close" @click="$store.commit('Users/delErrMsg')">&times;</button>
            </div>
            <b-form @submit.prevent="editProfile">
            <b-form-group label="Enter name:" label-for="prof-name">
                <b-form-input id="prof-name" type="text" :value="user.name.split(' ')[0]" required placeholder="Enter name"></b-form-input>
            </b-form-group>
            <b-form-group label="Enter lastname:" label-for="prof-name">
                <b-form-input id="prof-lastname" type="text" :value="user.name.split(' ')[1]" required placeholder="Enter lastname"></b-form-input>
            </b-form-group>
            <b-form-group label="New password:" label-for="prof-mail">
                <b-form-input id="prof-pass" type="password" placeholder="Enter password"></b-form-input>
            </b-form-group>
            <b-form-group label="Avatar:" label-for="ava">
                <b-form-file v-model="file" id='ava' :state="Boolean(file)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
            </b-form-group>
            <b-button v-if='!singlUpload && !s' block type='submit' variant="success">Save</b-button>
            <b-button v-else-if='singlUpload' block class="btn btn-success" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading... <input type="hidden" :value='s=true'>
            </b-button>
            <span v-else-if='!singlUpload'>
                <input type="hidden" :value='s=false'>
                <span v-if='!errMsg && !singlUpload && !s'>{{$bvModal.hide('editProfile')}}</span>
            </span>
            </b-form>
        </b-modal>
    </div>

    <div v-else>
      <br>
      <b-spinner variant="success" label="Text Centered"></b-spinner>
      <input type='hidden' :value='getProfile()'>
    </div>

    </div>
</template>
<script>
export default {
    middleware:'auth',
    computed:{
        user(){return this.$store.getters['Users/User']},
        singlUpload(){return this.$store.getters['Users/singlUpload']},
        errMsg(){return this.$store.getters['Users/errMsg']}
    },
    data:()=>({
        s:false,
        file: null,
        success:false,
        name:'',
        email:'',
    }),
    methods:{
        async editProfile(){
            let data = {};
            data.new_full_name=document.getElementById('prof-name').value + ' ' + document.getElementById('prof-lastname').value;
            if(document.getElementById('prof-pass').value){data.new_password=document.getElementById('prof-pass').value}
            this.$store.dispatch('Users/editProfile',data);
            if(document.getElementById('ava').files[0]!=undefined){
                this.$store.dispatch('Users/editProfileAvatar',document.getElementById('ava').files[0]);
            }
        },
        async getProfile(){
            this.$store.dispatch('Users/getProfile');
        }
    },
    async mounted(){
        this.getProfile();
    }
}
</script>
<style scoped>
    .ava{
        height:18vw;
        width:18vw;
        background: url('https://images.pexels.com/photos/3031391/pexels-photo-3031391.jpeg') center no-repeat;
        background-size:100%;
        border-radius: 50%;
        border:2px solid gray;
    }
    .prof *{
        margin: 0 auto;
    }
    .prof:last-child *{
        margin: 5px auto;
    }
    @media(max-width:1200px){
        .ava{
            height: 22vw;
            width: 22vw;
        }
    }
    @media(max-width: 768px){
        .ava{
            height: 25vw;
            width: 25vw;
        }
    }
    @media(max-width:576px){
        .ava{
            height: 50vw;
            width: 50vw;
        }
    } 
</style>