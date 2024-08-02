import { computed, ref } from "vue";

const allFish = ref([]);
const availableFishType = ref([
  { id: 1, img: "golden-purple-fish", size: "144" },
  { id: 2, img: "goldfish", size: "122" },
  { id: 3, img: "guppie", size: "96" },
  { id: 4, img: "tropical-fish", size: "192" },
  { id: 5, img: "tuna", size: "48" },
]);
const availableFishName =
  `The Fish with No Name, Gilbert, Mr. Buttons, Blubbles, Dinner`.split(", ");

export const useFish = () => {
  const getAllFish = () => {
    return computed(() => allFish.value);
  };

  const getRandomFishName = () => {
    return availableFishName[
      Math.floor(Math.random() * availableFishName.length)
    ];
  };

  const addFish = (fishId, nameFish) => {
    const fish = availableFishType.value.find((fish) => fish.id === fishId);

    allFish.value.push({
      ...fish,
      name: nameFish,
      id: new Date().getTime() + allFish.value.length + 1,
    });
  };

  const removeFish = (fishId) => {
    allFish.value = allFish.value.filter((fish) => fish.id !== fishId);
  };

  return {
    getAllFish,
    addFish,
    removeFish,
    availableFishType,
    getRandomFishName,
  };
};
