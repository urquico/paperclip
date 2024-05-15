<script setup lang="ts">
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'vue';

interface ContainerProps {
  class?: HTMLAttributes['class'];
}

const styles = 'w-5/6 max-md:w-full max-md:px-4';

const props = withDefaults(defineProps<ContainerProps>(), {
  class: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <section :class="cn(styles, props.class)">
    <slot />
  </section>
</template>
