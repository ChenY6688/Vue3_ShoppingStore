<template>
  <VaPagination
    :model-value="props.modelValue"
    class="mb-3 justify-center sm:justify-start"
    @update:model-value="updateCurrentPage"
    :pages="pages"
    input
  />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  modelValue: number;
  itemsPerPage: number;
  totalCount: number;
}>();

const emit = defineEmits(['update:currentPage']);

const pages = computed(() => {
  return Math.ceil(props.totalCount / props.itemsPerPage);
});

const updateCurrentPage = (newPage: number) => {
  emit('update:currentPage', newPage);
};

</script>

<style scoped>
</style>
