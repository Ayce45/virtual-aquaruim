<script setup>
  import { useFish } from "@/composable/useFish.js";

  import Fish from "./Fish.vue";

  const { getAllFish } = useFish();
</script>

<template>
  <div id="aquarium" class="aquarium">
    <Fish v-for="fish in getAllFish().value" :key="fish.id" :fish="fish" />
  </div>
</template>

<style scoped>
  .aquarium {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("/bg.jpg") no-repeat center center;
    background-size: cover;
    overflow: hidden;
  }
</style>
