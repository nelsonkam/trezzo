<template>
  <div class="max-h-screen h-screen bg-teal flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow p-4" :class="containerClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TealLayout",
  props: ["container-class"]
}
</script>

<style>

</style>
