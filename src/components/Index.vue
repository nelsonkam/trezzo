<template>
  <div>
    <div class="hero bg-teal">
      <div style="margin: 16px 5%;">
        <div class="hero-head">
          <div class="flex justify-between items-center">
            <p class="font-bold text-2xl text-white">trezzo</p>
            <div>
              <router-link class="bg-white text-black px-3 py-2 rounded-full shadow uppercase font-bold text-grey-darker" to="/signin">Sign In</router-link>
            </div>
          </div>
        </div>
        <div class="hero-body" style="padding: 8rem 0 10rem 0;">
          <h1 class="text-white text-center font-bold is-size-1">Get actionable feedback</h1>
          <p class="text-grey-light text-center text-2xl my-3">Receive feedback and bug reports from your users directly into Trello</p>
          <div class="text-center" style="margin-top: 3rem;">
            <router-link class="bg-black text-white px-6 py-4 hover:text-white rounded-full shadow uppercase font-bold" to="/signup">Get Started Now</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b" style="padding-left: 5%; padding-right: 5%;">
      <div class="flex flex-col items-center " style="margin-top: 4rem;">
        <h2 class="text-center text-4xl font-bold text-black leading-normal">How does it work ?</h2>
        <p class="text-center text-2xl max-w-lg mt-2">Trezzo provides a widget that connects to a Trello board and creates a new card each time feedback is sent. </p>
        <div class="flex flex-col items-center" style="margin: 4rem 0;">
          <p class="text-center text-xl max-w-sm">Try it now, click on the button below then take a look at this <a target="_blank" href="https://trello.com/b/ImDEGZs6">Trello board</a> after sending. </p>
          <trezzo-widget api-key="demo-key" style="margin-top: 4rem;"></trezzo-widget>
        </div>
      </div>
    </div>
    <div class="border-b" style="padding-left: 5%; padding-right: 5%;">
      <div class="flex flex-col items-center" style="margin-top: 4rem; margin-bottom: 4rem;">
        <h2 class="text-center text-4xl font-bold text-black">Pricing</h2>
        <p class="text-center text-2xl mb-3">One pricing for all your needs</p>
        <div class="flex flex-col items-center p-4 border max-w-sm px-6 mt-8">
          <p class="font-bold text-black text-center text-2xl mb-2">Unlimited</p>
          <p class="text-black font-bold text-3xl mb-3">$19.99 <span class="text-xl text-grey">Monthly</span></p>
          <ul class="text-xl px-6" style="list-style: disc;">
            <li>Unlimited Trello boards</li>
            <li>Unlimited websites</li>
            <li>Unlimited feedback and <br> bug reports</li>
          </ul>
          <div class="mt-8 mb-3">
            <router-link class="bg-black text-white px-6 py-3 hover:text-white rounded-full shadow uppercase font-bold" to="/signup"> Start Now !</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="" style="padding-left: 5%; padding-right: 5%;">
      <div class="flex flex-col items-center" style="margin-top: 4rem; margin-bottom: 8rem;"> 
        <p class="text-5xl text-black font-bold text-center">Don't take our word for it. <br> Try it yourself !</p>
        <div class="text-center" style="margin-top: 3rem;">
          <router-link class="bg-black text-white px-6 py-4 hover:text-white rounded-full shadow uppercase font-bold" to="/signup">Get Started Now</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrezzoWidget from "./TrezzoWidget"
export default {
  components: {
    TrezzoWidget
  }
}
</script>

<style>

</style>
