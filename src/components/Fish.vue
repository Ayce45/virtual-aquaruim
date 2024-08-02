<script setup>
  import { computed, onMounted, onUnmounted, ref } from "vue";

  import { useFish } from "@/composable/useFish.js";

  const props = defineProps({
    fish: {
      type: Object,
      required: true,
    },
  });

  const $aquarium = ref(null);
  const { removeFish } = useFish();

  onMounted(() => {
    $aquarium.value = document.querySelector("#aquarium");

    const x = Math.random() * ($aquarium.value.clientWidth - 300);
    const y = Math.random() * ($aquarium.value.clientHeight - 300);
    position.value = { x, y };

    setTimeout(() => {
      moveFish();
    }, 100);
  });

  const position = ref({
    x: 0,
    y: 0,
  });

  const minMilliseconds = 4000;
  const maxMilliseconds = 10000;

  const timeout = ref(null);
  const direction = ref("right");
  const transition = ref(false);
  const hunger = ref(0);
  const deader = ref(0);

  const isHungry = computed(() => {
    return hunger.value >= 70;
  });

  const isDead = computed(() => {
    return hunger.value >= 100;
  });

  const moveFish = () => {
    transition.value = true;
    const x = Math.random() * ($aquarium.value.clientWidth - 300);
    const y = Math.random() * ($aquarium.value.clientHeight - 300);

    if (x > position.value.x) {
      direction.value = "right";
    } else {
      direction.value = "left";
    }

    position.value = { x, y };
    timeout.value =
      Math.floor(Math.random() * maxMilliseconds) + minMilliseconds;

    setTimeout(moveFish, timeout.value);
  };

  const hungerInterval = setInterval(() => {
    hunger.value++;
  }, 100);

  const deaderInterval = setInterval(() => {
    if (isDead.value) {
      clearInterval(hungerInterval);
      deader.value++;
    } else {
      deader.value = 0;
    }

    if (deader.value > 50) {
      removeFish(props.fish.id);
      clearInterval(deaderInterval);
    }
  }, 100);

  onUnmounted(() => {
    clearInterval(hungerInterval);
    clearInterval(deaderInterval);
  });
</script>

<template>
  <div
    class="fish text-center"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      transition: transition ? `all ${timeout / 1000}s linear` : 'none',
    }"
  >
    <img
      key="fish"
      class="inline-block"
      :src="`${isDead ? 'dead' : props.fish.img}.png`"
      :alt="props.fish.img"
      :style="{
        height: `${props.fish.size}px`,
        transform: `scaleX(${direction === 'right' ? 1 : -1})`,
        transition: `all ${timeout / 10000}s linear`,
      }"
    />
    <br />
    <div
      class="relative mt-2 inline overflow-hidden rounded bg-[rgba(0,0,0,.6)] p-2 text-center text-white"
    >
      {{ props.fish.name }}
      <div
        :class="{
          'bg-green-600': hunger < 30,
          'bg-yellow-600': hunger >= 30 && hunger < 70,
          'bg-red-600': hunger >= 70,
          hidden: hunger >= 100,
        }"
        class="absolute bottom-0 left-0 h-1 w-full"
        :style="{ width: (hunger / 100) * 100 + '%' }"
      ></div>
    </div>

    <button
      v-if="isHungry && !isDead"
      style="transform: translateX(-50%)"
      class="speech-bubble"
      @click="hunger = 0"
    >
      I'm hungry
    </button>
  </div>
</template>

<style scoped>
  .fish {
    position: absolute;
  }

  .speech-bubble {
    @apply absolute bottom-[100%] left-[50%] whitespace-nowrap rounded-full px-4 py-2;
    background: rgba(255, 255, 255, 0.9);
  }
  .speech-bubble::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 10px;
    border-color: transparent rgba(255, 255, 255, 0.9) transparent transparent;
    top: 99%;
    left: 50%;
    transform: translateX(-50%) rotate(-90deg);
  }
</style>
