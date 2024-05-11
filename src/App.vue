<script setup lang="ts">
import { watchEffect } from 'vue';

import Business from './components/Business.vue';
import CustomContainer from './components/CustomContainer.vue';
import Manufacturing from './components/Manufacturing.vue';
import Paperclip from './components/Paperclip.vue';
import TitleHeader from './components/TitleHeader.vue';
import { usePaperclipStore } from './store/paperclip';

const paperclip = usePaperclipStore();

// every 1 second
watchEffect(() => {
  const interval = setInterval(() => {
    paperclip.buyPaperclips(paperclip.autoClippers);
    paperclip.randomizeWireCost();

    if (paperclip.clipsPerSecond !== 0) {
      paperclip.flushPaperclipHistory();
    }

    if (paperclip.unsoldInventory !== 0) {
      paperclip.sellPaperclip();
    }
  }, 1000);

  return () => clearInterval(interval);
});
</script>

<template>
  <main class="w-screen h-screen flex flex-col gap-2 mt-4 items-center">
    <!-- Title Header -->
    <TitleHeader />

    <!-- Paperclip -->
    <Paperclip />

    <CustomContainer class="flex gap-2">
      <!-- Business -->
      <Business />

      <!-- Manufacturing -->
      <Manufacturing />
    </CustomContainer>
  </main>
</template>
