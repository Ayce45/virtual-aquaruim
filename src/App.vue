<script setup>
  import Aquarium from "@/components/Aquarium.vue";
  import FishForm from "@/components/FishForm.vue";
</script>

<template>
  <div class="flex">
    <div class="w-1/5">
      <FishForm />
    </div>
    <div class="w-4/5">
      <Aquarium />
    </div>
  </div>
</template>
