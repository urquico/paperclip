<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Terminal } from 'lucide-vue-next';
import { watchEffect } from 'vue';

import CustomContainer from './components/CustomContainer.vue';
import Badge from './components/ui/badge/Badge.vue';
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
    <CustomContainer>
      <Alert class="shadow animate-pulse">
        <Terminal class="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription> Welcome to Paperclip Game. </AlertDescription>
      </Alert>
    </CustomContainer>

    <!-- Paperclip -->
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

    <!-- Manufacturing -->
    <CustomContainer>
      <Card>
        <CardHeader>
          <CardTitle>Manufacturing</CardTitle>
          <CardDescription
            >{{ paperclip.clipsPerSecond }} Clip/s per second</CardDescription
          >
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <div class="flex gap-2">
            <Button @click="paperclip.buyWire">Buy Wire</Button>

            <Badge variant="outline" class="max-md:p-3">
              {{ paperclip.wire }}
            </Badge>
          </div>

          <div class="flex">
            <Badge variant="secondary" class="max-md:p-3">
              Cost: {{ paperclip.wireCost }}
            </Badge>
          </div>
        </CardContent>
        <CardFooter class="gap-2">
          <div class="flex gap-2">
            <Button @click="paperclip.buyAutoClippers"
              >Buy Auto-Clippers</Button
            >

            <Badge variant="outline" class="max-md:p-3">
              {{ paperclip.autoClippers }}
            </Badge>
          </div>

          <div class="flex">
            <Badge variant="secondary" class="max-md:p-3">
              Cost: {{ paperclip.autoClipperCost }}
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </CustomContainer>

    <!-- {{ JSON.stringify(paperclip.paperclipHistory) }} -->
    <!-- {{ JSON.stringify(paperclip.wire) }} -->
  </main>
</template>
