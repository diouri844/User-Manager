<template>
    <div class="alert alert-dismissible alert-danger">
        <button type="button" class="btn-close" data-bs-dismiss="alert"
        @click="this.CloseMe"></button>
        <strong>{{ this.Title }}</strong> 
        {{  this.Message }}
    </div>
</template>


<script>
import { watch } from 'vue';

export default {
    props: {
        State:{
            type:String,
            required:false
        },
        Title:{
            type: String,
            required: true
        },
        Message:{
            type: String,
            required: true
        },
        Duration:{
            type:Number,
            required:false
        }

    },
    data(){
        console.log(
            this.Title,
            
        )
        return{}
    },
    methods:{
        CloseMe(){
            this.$emit('CloseMe');
            return;
        }
    }
}


</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
</style>