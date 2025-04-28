<script setup lang="ts">
let user = ref("");
const emit = defineEmits<{
  search: string[];
}>();

function submit() {
  emit("search", user.value);
}
</script>

<template>
  <form @submit.prevent="submit" class="text-center">
    <input
      type="search"
      v-model="user"
      placeholder="username"
      class="bg-gray-800 border-gray-400 border-2 outline-none rounded-l-lg p-1 focus:border-blue-400 transition-colors delay-200 focus:text-blue-400"
    />
    <button
      type="submit"
      class="bg-gray-400 border-gray-400 border-2 py-1 px-4 rounded-r-lg transition-colors delay-200 hover:border-blue-400 hover:bg-blue-400"
    >
      <Icon name="uil:search" class="text-white" />
    </button>
  </form>
</template>

<style lang="postcss" scoped>
input:focus ~ button {
  @apply bg-blue-400 border-blue-400;
}
</style>
