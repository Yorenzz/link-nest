<script setup lang="ts">
import Login from '@/views/LoginAndRegister/Components/Login.vue'
import Register from '@/views/LoginAndRegister/Components/Register.vue'
</script>

<template>
  <div class="login-register-page">
    <Login />
    <Register />
  </div>
</template>

<style scoped lang="scss">
.login-register-page {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
