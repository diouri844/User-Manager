<template>
<form class="position-absolute bottom-20 end-50 my-5">
    <Notify v-show="this.ErrorState" 
    Title="Notification Login "
    :Message='this.ErrorMessage'
    />
    <fieldset>
        <legend class="mb-5">Plese Login :</legend>
        <div class="form-group mb-4">
            <label class="form-label  ">
                <i class="text-primary bi bi-envelope"></i> Email : </label>
            <input type="email" class="form-control 
            px-3 py-1"
            v-model="this.Email"
             aria-describedby="emailHelp"
            placeholder="Enter email">
            <small v-show="this.emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
            </small>
        </div>
        <div class="form-group mb-4">
            <label class="form-label ">
                <i class="text-primary bi bi-lock"></i> Password</label>
            <input type="password"
            v-model="this.Password" 
            autocomplete
            class="form-control px-3 py-1" 
            placeholder="Password">
        </div>
            
        <button @click="CheckAuth" type="button"
        class="btn btn-sm btn-outline-primary my-2">
            <i class="bi bi-send"></i> {{ this.SubmitText }}
        </button>
    </fieldset>
</form>
</template>

<script>
import { ValidateEmail, ValidatePassword } from '../Validations/AuthValidate';
import Notify from './Notify.vue';
export default {
    components: {
        Notify
    },
    data(){
        return{
            'emailHelp':false,
            'Email':"",
            'Password':"",
            'ErrorState':false,
            'ErrorMessage':'',
            'SubmitText':'Submit'
        }
    },
    methods:{
        CheckAuth(){
            // creat my form data :
            let DataToSend = new FormData();
            let counter = 0;
            // check values sended :
            // check email :
            const ResponseEmail = ValidateEmail(this.Email);
            console.log("\n Check Email : ", ResponseEmail);
            if ( ResponseEmail.Valide ){
                // add email to the formdata :
                DataToSend.append('Eamil',this.Email);
                counter += 1;
            }else{
                // display error mesage :
                this.ErrorState = true;
                this.ErrorMessage = ResponseEmail.Message;
                // after a time out clear fileds :
            }
            // check password : 
            const ResponsePassword = ValidatePassword(this.Password);
            console.log("\n Check Password : ", ResponsePassword);
        }
    }
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
</style>