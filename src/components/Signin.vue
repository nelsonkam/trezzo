<template>
  <teal-layout>
    <p class="text-2xl font-bold">Sign in</p>
    <div class="flex flex-col mt-3" style="width: 280px;">
      <input v-model="data.email" type="email" placeholder="Email" autocomplete="email" class="appearance-none border p-3 py-2 rounded text-lg my-2">
      <input v-model="data.password" type="password" placeholder="Password" class="appearance-none border p-3 py-2 rounded text-lg my-2">
      <button @click="signin" class="p-3 bg-black rounded text-white shadow mt-4">Sign In</button>
      <p class="text-sm text-red text-center mt-2">{{error}}</p>
      <router-link to="/signup" class="my-2 text-center">Don't yet have an account ?</router-link>
    </div>
  </teal-layout>
</template>

<script>
import axios from 'axios'
import {SERVER_URL} from "@/config"
import TealLayout from "./TealLayout"

export default {
  data() {
    return {
      data: {},
      error: ""
    }
  },
  methods: {
    signin() {
     axios.post(SERVER_URL + '/auth', {email: this.data.email, password: this.data.password})
      .then(({data}) => {
        localStorage.setItem("jwt-token", data.access_token)
        this.$router.push("/setup")
      })
      .catch(({response}) => {
        this.error = "Invalid credentials"
      })
    }
  },
  components: {
    TealLayout
  }
}
</script>

<style>

</style>
