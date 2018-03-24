<template>
  <teal-layout>
    <p class="text-2xl font-bold">Sign up</p>
    <div class="flex flex-col mt-3" style="width: 280px;">
      <input v-model.trim="name" @input="$v.name.$touch()" type="text" placeholder="Name" autocomplete="name" class="appearance-none border p-3 py-2 rounded text-lg my-2">
      <p class="text-sm text-red" v-if="$v.name.$error">
        <span>Name is required</span>
      </p>
      <input v-model.trim="email" @input="$v.email.$touch()" type="email" placeholder="Email" autocomplete="email" class="appearance-none border p-3 py-2 rounded text-lg my-2">
      <p class="text-sm text-red" v-if="$v.email.$error">
        <span v-if="!$v.email.required">Email is required</span>
        <span v-else-if="!$v.email.email">Email is not valid</span>
      </p>      
      <input v-model.trim="password" @input="$v.password.$touch()" type="password" placeholder="Password" class="appearance-none border p-3 py-2 rounded text-lg my-2">
      <p class="text-sm text-red" v-if="$v.password.$error">
        <span v-if="!$v.password.required">Password is required</span>
        <span v-else-if="!$v.password.minLength">Password should be at least 6 characters</span>
      </p>      
      <input v-model.trim="confirm" @input="$v.confirm.$touch()" type="password" placeholder="Confirm password" class="appearance-none border p-3 py-2 rounded text-lg my-2">
      <p class="text-sm text-red" v-if="$v.confirm.$error">Passwords do not match</p>      
      <button @click="checkout" :disabled="$v.$invalid" class="p-3 bg-black rounded text-white shadow mt-4">Create an account</button>
      <p class="text-sm text-red text-center mt-2">{{error}}</p>
      <router-link to="/signin" class="my-2 mt-1 text-center">Already have an account ?</router-link>
    </div>
  </teal-layout>
</template>

<script>
import axios from 'axios'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import {SERVER_URL} from "@/config"
import TealLayout from "./TealLayout"

export default {
  data() {
    return {
      data: {},
      name: "",
      email: "",
      password: "",
      confirm: "",
      error: ""
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required, email
    },
    password: {
      required, minLength: minLength(6)
    },
    confirm: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    checkout() {
      // Paddle.Checkout.open({
      //   product: 526810,
      //   email: this.data.email,
      //   successCallback: () => {
      //     this.signup()
      //   }
      // }, false);
      this.signup()
    },
    signup() {
      axios.post(SERVER_URL + '/users', {name: this.name, email: this.email, password: this.password})
      .then(() => axios.post(SERVER_URL + '/auth', {email: this.email, password: this.password}))
      .then(({data}) => {
        localStorage.setItem("jwt-token", data.access_token)
        this.$router.push("/setup")
      })
      .catch(({response}) => {
        console.log(response)
        if (response.data.message) {
          this.error = response.data.message
        } else {
          this.error = "Something went wrong :("
        }
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
