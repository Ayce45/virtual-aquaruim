<script setup>
  import { ref } from "vue";

  import { useFish } from "@/composable/useFish.js";

  const { availableFishType, getRandomFishName, addFish } = useFish();
  const selectedFish = ref(1);
  const nameFish = ref(getRandomFishName());

  const submitFish = () => {
    if (!selectedFish.value) return;
    if (!nameFish.value) return;

    addFish(selectedFish.value, nameFish.value);
    nameFish.value = getRandomFishName();
  };
</script>

<template>
  <form class="h-full bg-[#1f3d7c] p-5" @submit.prevent="submitFish">
    <label>Fish Type</label>
    <ul class="mt-4 flex flex-wrap">
      <li
        v-for="fish in availableFishType"
        :key="fish.id"
        class="mb-2 block w-1/2 cursor-pointer"
        :class="selectedFish === fish.id ? 'selected' : ''"
        @click="selectedFish = fish.id"
      >
        <img :src="`${fish.img}.png`" :alt="fish.img" class="w-32" />
      </li>
    </ul>

    <label for="fish-name" class="mt-10">Name </label>
    <input
      id="fish-name"
      ref="input"
      v-model="nameFish"
      type="text"
      class="w-full rounded p-2 text-lg"
      placeholder="Mr. Buttons"
      required
    />
    <button
      type="submit"
      class="mt-5 w-full rounded bg-red-600 p-4 text-xl text-white"
    >
      Add Fish
    </button>
  </form>
</template>

<style scoped>
  label {
    @apply mb-2 block font-bold text-white;
  }
  .selected {
    filter: drop-shadow(2px 2px 0 #00cfff) drop-shadow(-2px -2px 0 #00cfff)
      drop-shadow(2px -2px 0 #00cfff) drop-shadow(-2px 2px 0 #00cfff);
  }
</style>
