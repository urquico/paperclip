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
import { MinusCircle, PlusCircle } from 'lucide-vue-next';
import { watchEffect } from 'vue';

const paperclip = usePaperclipStore();

watchEffect(() => {
  const interval = setInterval(() => {
    if (paperclip.unsoldInventory !== 0) {
      paperclip.sellPaperclip();
    }
  }, 1000);

  return () => clearInterval(interval);
});
</script>

<template>
  <CustomContainer>
    <Card>
      <CardHeader>
        <CardTitle>Business</CardTitle>
        <CardDescription class="flex gap-2">
          <div class="flex">
            <Badge variant="secondary" class="max-md:p-3">
              P {{ paperclip.funds.toFixed(2) }}
            </Badge>
          </div>
          <div class="flex">
            <Badge variant="secondary" class="max-md:p-3">
              Inventory: {{ paperclip.unsoldInventory }}
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent class="flex gap-2">
        <div class="flex gap-2">
          <div class="flex flex-col gap-2">
            <Button @click="paperclip.increasePaperclipPrice"
              ><PlusCircle className="h-4 w-4"
            /></Button>
            <Button
              @click="paperclip.decreasePaperclipPrice"
              :disabled="paperclip.paperclipPrice <= 0.01"
              ><MinusCircle className="h-4 w-4"
            /></Button>
          </div>

          <Badge variant="outline" class="max-md:p-3">
            Price per clip: {{ paperclip.paperclipPrice }}
          </Badge>
        </div>
      </CardContent>
      <CardFooter class="gap-2">
        Public Demand: {{ paperclip.publicDemand }}
      </CardFooter>
    </Card>
  </CustomContainer>
</template>
