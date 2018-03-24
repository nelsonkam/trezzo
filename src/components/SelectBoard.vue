<template>
  <teal-layout container-class="w-4/5 lg:w-3/5">
    <div v-if="state == 'connect-trello'">
      <p class="text-xl font-bold">Connect to Trello</p>
      <div class="flex items-center justify-center" style="margin: 4rem 0;">
        <button @click="connectToTrello" class="px-3 py-2 bg-blue text-white shadow rounded-full">Connect to Trello</button>
      </div>
    </div>
    <div v-else-if="state == 'show-boards'">
      <p class="text-xl font-bold">Select a board</p>
      <p>Select a board to connect to your website's widget</p>
      <div class="flex items-center justify-center" style="margin: 4rem 0;" v-if="loadingBoard">
        <p>Loading...</p>
      </div>
      <div class="flex flex-wrap mt-6" v-else>
        <div class="w-1/3" v-for="board in boards" :key="board.id" >
          <div @click="sendBoard(board.id)" class="font-bold h-32 mx-2 mb-4 text-white flex items-end p-4 rounded bg-center" :style="boardStyle(board.prefs)">
            <p>{{board.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-xl font-bold">You're ready to go</p>
      <p>Copy these snippets and add them to your website !</p>
      <div class="relative mt-6">
        <button v-clipboard="scriptSnippet" class="absolute pin-r pin-t uppercase shadow p-2 rounded-full px-3 m-2 bg-white font-bold text-grey-darker">Copy</button>
        <pre v-highlightjs><code class="xml">&lt;script src="https://rawgit.com/nelsonkam/trezzo-widget/master/bundle.js"&gt;&lt;/script&gt;</code></pre>
      </div>
      <div class="relative mt-6">
        <button v-clipboard="widgetSnippet" class="absolute pin-r pin-t uppercase shadow p-2 rounded-full px-3 m-2 bg-white font-bold text-grey-darker">Copy</button>
        <pre v-highlightjs><code class="xml">&lt;trezzo-widget api-key="{{apiKey}}"&gt;&lt;/trezzo-widget&gt;</code></pre>
      </div>
    </div>
  </teal-layout>
</template>

<script>
import axios from 'axios'
import TealLayout from './TealLayout'
import {SERVER_URL} from "@/config"
export default {
  components: {
    TealLayout
  },
  data () {
    return {
      boards: [],
      state: "connect-trello",
      loadingBoard: false,
      scriptSnippet: '<script src="https://rawgit.com/nelsonkam/trezzo-widget/master/bundle.js"><\/script>',
      apiKey: ""
    }
  },
  computed: {
    isConnected() {
      return localStorage.getItem("trello_token")
    },
    widgetSnippet() {
      return '<trezzo-widget api-key="'+this.apikey+'" ><\/trezzo-widget>'
    }
  },
  methods: {
    connectToTrello() {
      window.Trello.authorize({
        type: "popup",
        name: "Trezzo",
        expiration: "never",
        scope: {read: true, write: true},
        success: () => {
          this.showBoards()
        },
        error: (err) => {
        }
      })
    },
    showBoards() {
      this.state = 'show-boards'
      this.loadingBoard = true
      const token = localStorage.getItem("trello_token")
      this.window.Trello.members.get("me", {token}, (data) => {
        data.idBoards.forEach((id) => {
          window.Trello.boards.get(id, {token}, (board) => {
            this.boards.push(board)
          })
        })
        this.loadingBoard = false
      }, (err) => {
        this.loadingBoard = false
      })
    },
    boardStyle(prefs) {
      if (prefs.backgroundImage) {
        return {backgroundImage: `url(${prefs.backgroundImageScaled[2].url})`}
      } else {
        return {backgroundColor: prefs.backgroundColor}
      }
    },
    sendBoard(id) {
      return axios.post(SERVER_URL + "/new_key", {
        token: localStorage.getItem("trello_token"),
        boardId: id,
      }, {
        headers: {"Authorization": "JWT " + localStorage.getItem("jwt-token")}
      }).then((res) => {
        this.apiKey = res.data.key
        this.state = 'copy-snippet'
      }).catch(({response}) => {
        if (response.data && response.data.description && response.data.description === "Signature has expired") {
          this.$router.push('/signin')
        }
      })
    }
  }
}
</script>

<style>

</style>
