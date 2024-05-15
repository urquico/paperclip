<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePaperclipStore } from '@/store/paperclip';

import CustomContainer from './CustomContainer.vue';

const paperclip = usePaperclipStore();
</script>

<template>
  <CustomContainer>
    <div class="flex gap-2 justify-between max-md:flex-col-reverse">
      <Button @click="paperclip.buyPaperclip" :disabled="paperclip.wire <= 0"
        >Make Paperclip</Button
      >
      <Badge variant="outline" class="max-md:p-3">
        Paperclips: {{ paperclip.paperclip }}
      </Badge>
    </div>
  </CustomContainer>
</template>
