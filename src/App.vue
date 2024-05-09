<script setup lang="ts">
import { watchEffect } from 'vue';

import Manufacturing from './components/Manufacturing.vue';
import Paperclip from './components/Paperclip.vue';
import TitleHeader from './components/TitleHeader.vue';
import { usePaperclipStore } from './store/paperclip';

const paperclip = usePaperclipStore();

// every 1 second, trigger paperclip.buyPaperclips
watchEffect(() => {
  const interval = setInterval(() => {
    paperclip.buyPaperclips(paperclip.autoClippers);
  }, 1000);

  return () => clearInterval(interval);
});
</script>

<!-- TODO: Refactor the code, make components from it. -->
<template>
  <main class="w-screen h-screen flex flex-col gap-2 mt-4 items-center">
    <!-- Title Header -->
    <TitleHeader />

    <!-- Paperclip -->
    <Paperclip />

    <!-- Manufacturing -->
    <Manufacturing />

    <!-- {{ JSON.stringify(paperclip.paperclipHistory) }} -->
    <!-- {{ JSON.stringify(paperclip.wire) }} -->
  </main>
</template>
