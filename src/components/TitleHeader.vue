<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-vue-next';

import CustomContainer from './CustomContainer.vue';
</script>

<template>
  <CustomContainer>
    <Alert class="shadow animate-pulse">
      <Terminal class="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription> Welcome to Paperclip Game. </AlertDescription>
    </Alert>
  </CustomContainer>
</template>
