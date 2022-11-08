<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <nav class="nav_content">
    <div class="nav_logo">
      <h3> VN UManager </h3>
    </div>
    <div class="nav_link">
      <button class="btn_serve_add" > Create user </button>
      <button class="btn_serve_remove" > Delete user  </button>
      <button class="btn_serve_update"> Update  user </button>
    </div>
  </nav>
  <hr class="line" />
</template>

<style scoped>
.nav_content{
  margin-top:1%;
  margin-left: 7%;
  display: flex;
  align-content: space-between;
  width:60%;
}
.nav_logo{
  margin-right: 2%;
  width:100%;
  float: left;
  left: 0;
}
.line{
  opacity:0.3;
  width:30%;
  margin-left:38%;
}
.nav_link{
  display: flex;
  width:100%;
  align-content:space-between;
  background-color: transparent;
}
.btn_serve_add, .btn_serve_remove, .btn_serve_update{
  font-size:15px;
  margin-right:3%;
  cursor:pointer;
  width:100%;
  height:auto;
  color:white;
  background-color: transparent;
  border:none;
  opacity: 0.;
}
.btn_serve_remove:hover , .btn_serve_remove:focus,
.btn_serve_add:hover , .btn_serve_add:focus,
.btn_serve_update:hover , .btn_serve_update:focus
{
  opacity: 0.7;
  color: #eee;
  transition: 0.7s;
}
</style>
