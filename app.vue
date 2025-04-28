<script setup lang="ts">
const apiUrl = "https://users.roproxy.com/v1/usernames/users";
const outfits = ref<any[]>([]);
const error = ref("");
async function search(username: string) {
  try {
    error.value = "";
    const cache = sessionStorage.getItem("outfits");
    if (cache && JSON.parse(cache)) {
      if (JSON.parse(cache)[username.toLowerCase()]) {
        outfits.value = JSON.parse(cache)[username.toLowerCase()];
        console.log(outfits.value);
        return;
      }
    }
    const { data } = await useFetch(`/api/outfits/${username}`);
    if (data.value?.length && data.value?.length > 0) {
      outfits.value = data.value;
      const key = username.toLowerCase();
      const parsedCache = JSON.parse(cache ?? "{}");
      sessionStorage.setItem(
        "outfits",
        JSON.stringify({ ...parsedCache, [key]: outfits.value })
      );
    } else {
      outfits.value = [];
      error.value = "Error: Too Many Requests. Try again later.";
    }
  } catch {
    outfits.value = [];
    error.value = "An error occurred on the Roblox server.";
  }
}
function clearCache() {
  sessionStorage.removeItem("outfits");
}
</script>

<template>
  <article class="py-4 px-12 bg-gray-900 min-h-screen text-gray-300">
    <header>
      <h1 class="text-3xl font-bold text-center mb-4 text-blue-400">
        Roblox Outfits Viewer
      </h1>
      <SearchBar @search="search" />
      <button
        @click="clearCache"
        class="bg-red-900 p-1 my-4 rounded-lg block mx-auto hover:bg-gray-300 hover:text-red-900"
      >
        Erase Cache
      </button>
    </header>
    <section
      class="grid [grid-template-columns:repeat(auto-fill,minmax(224px,1fr))] gap-4"
    >
      <AvatarImage
        v-for="(outfit, index) in outfits"
        :key="index"
        :url="outfit.img"
        :name="outfit.name"
      />
      <strong v-if="error" class="text-red-400">{{ error }}</strong>
    </section>
  </article>
</template>
