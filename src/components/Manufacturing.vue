<script setup lang="ts">
import CustomContainer from '@/components/CustomContainer.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePaperclipStore } from '@/store/paperclip';

const paperclip = usePaperclipStore();
</script>

<template>
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
            {{ paperclip.wire }} Inches
          </Badge>
        </div>

        <div class="flex">
          <Badge variant="secondary" class="max-md:p-3">
            Cost: {{ paperclip.wireCost }}
          </Badge>
        </div>
      </CardContent>
      <CardFooter class="gap-2" v-if="paperclip.paperclip >= 50">
        <div class="flex gap-2">
          <Button
            @click="paperclip.buyAutoClippers"
            :disabled="paperclip.funds < paperclip.autoClipperCost"
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
</template>
