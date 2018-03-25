<template>
  <div class="">
    <div class="p-4">
      <transition name="slide" enter-active-class="slideInUp" leave-active-class="fadeOutDown" mode="out-in">
        <button v-if="!open" @click="open = !open" class="text-white py-3 px-4 shadow rounded-full text" style="background-color: #2962FF;">Have feedback ?</button>
        <div class="shadow rounded-lg" v-else style="width: 300px;">
          <div class="flex justify-between items-center text-white py-3 px-4 rounded-t-lg text-lg text-center flex" style="background-color: #2962FF;">
            <p>Have feedback ?</p>
            <button @click="open = !open" class="bg-blue-dark h-6 w-6 rounded-full outline-none" style="padding: 6px 6px;">
              <svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" class="outline-none">
                <line x1="1" y1="11" x2="11" y2="1" stroke="white" stroke-width="2" />
                <line x1="1" y1="1" x2="11" y2="11" stroke="white" stroke-width="2" />
              </svg>
            </button>
          </div>
          <div class="px-4 py-2 flex items-center justify-center" >
            <div class="flex flex-col w-full">
              <p class="text-grey-dark pt-2">See a bug or want a feature ?</p>
              <p class="text-grey-dark pt-1 pb-1">Send us a message ! </p>
              <input v-model="name" type="text" class="appearance-none p-2 my-2 border-2 text-base rounded" placeholder="Name" autocomplete="name">
              <p class="text-sm text-red" v-if="$v.email.$error && !$v.name.required" @input="$v.name.$touch()">Name is required</p>
              <input v-model="email" type="email" class="appearance-none p-2 my-2 border-2 text-base rounded" placeholder="Email address" autocomplete="email">
              <p class="text-sm text-red" v-if="$v.email.$error" @input="$v.email.$touch()">
                 <span v-if="!$v.email.required">Email is required</span>
                 <span v-else-if="!$v.email.email">Email is invalid</span>
              </p>              
              <textarea v-model="message" @input="$v.email.$touch()" type="text" class="appearance-none p-2 my-2 border-2 text-base rounded" placeholder="Message" rows="4"></textarea>
              <p class="text-sm text-red" v-if="$v.email.$error && !$v.message.required">Message is required</p>
              <button :disabled="$v.$invalid || loading" @click="sendMessage" class="bg-green text-white p-2 rounded-full shadow my-2" style="background-color: #00C853;">
                <span v-if="loading">Sending feedback...</span>
                <span v-else-if="sent">Feadback sent !</span>
                <span v-else-if="error">Something went wrong :(</span>
                <span v-else>Send feedback</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {SERVER_URL} from "@/config"
import {required, email} from 'vuelidate/lib/validators'
export default {
  name: 'TrezzoWidget',
  props: ["api-key"],
  data () {
    return {
      open: false,
      loading: false,
      sent: false,
      error: false,
      name: '',
      email: '',
      message: ''
    }
  },
  validations: {
    name: {
      required
    },
    email: {
      required, email
    },
    message: {
      required
    }
  },
  methods: {
    sendMessage() {
      this.loading = true
      const data = {
        key: this.apiKey,
        name: this.name,
        email: this.email,
        message: this.message
      }
      axios.post(SERVER_URL + "/send_message", data).then((res) => {
        this.loading = false
        this.sent = true
        setTimeout(() => {
          this.sent = false
          this.name = ""
          this.email = ""
          this.message = ""
          this.$v.$reset()
          this.open = false
        }, 800);
      }).catch((err) => {
        this.loading = false
        this.error = true
        console.error(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import 'tailwindcss/dist/tailwind.css';
@import 'vue2-animate/dist/vue2-animate.min.css';
.outline-none, .outline-none:focus {
  outline: none;
}
</style>
