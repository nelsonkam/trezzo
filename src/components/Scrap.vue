<template>
  <div class="m-6">
    <button @click="connectToTrello" v-if="!isConnected" class="px-3 py-2 bg-blue text-white shadow rounded-full">Connect to Trello</button>
    <div v-else>
      <div class="flex flex-wrap">
        <div class="w-1/4" v-for="board in boards" :key="board.id" >
          <div @click="sendBoard(board.id)" class="h-32 mx-2 mb-4 text-white flex items-end p-4 rounded bg-center" :style="boardStyle(board.prefs)">
            <p>{{board.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="bg-white w-full md:w-4/5 lg:w-1/2 rounded-lg shadow p-4 h-64">
      <p>text</p>
    </div> -->
</template>

<script>

import axios from 'axios'
export default {
  name: 'Index',
  data () {
    return {
      boards: [],
      data:""
    }
  },
  computed: {
    isConnected() {
      return localStorage.getItem("trello_token")
    },
  },
  mounted() {
    if (this.isConnected) {
      console.log(this.window);
      setTimeout(() => {
        this.showBoards()
      }, 1000);
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
          this.data = JSON.stringify(err)
        }
      })
    },
    showBoards() {
      const token = localStorage.getItem("trello_token")
      this.window.Trello.members.get("me", {token}, (data) => {
        data.idBoards.forEach((id) => {
          window.Trello.boards.get(id, {token}, (board) => {
            this.boards.push(board)
          })
        })
      }, (err) => {
        this.data = err
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
      axios.post("http://localhost:5000/new_key", {
        token: localStorage.getItem("trello_token"),
        boardId: id,
      }).then((res) => {
        console.log(res.data.key)
      }).catch((err) => {
        console.error(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
