<script setup lang="ts">
let props = defineProps<{
  url: string;
  name: string;
}>();
</script>

<template>
  <article>
    <a
      :href="url"
      target="_blank"
      class="flex flex-col p-2 h-full justify-center items-center bg-gray-800 hover:bg-blue-400 rounded-xl transition-colors delay-75"
    >
      <h1 class="text-center text-xl font-bold transition-colors delay-75">
        {{ name }}
      </h1>
      <img :src="url" :alt="`${name}-thumb`" />
    </a>
  </article>
</template>

<style lang="postcss" scoped>
a:hover > h1 {
  @apply text-gray-800;
}
</style>
