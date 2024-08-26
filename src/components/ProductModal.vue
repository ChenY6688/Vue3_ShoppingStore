<template>
  <VaModal
    class="modal-crud"
    :model-value="modelValue"
    :title="title"
    size="small"
    @ok="handleOk"
    @cancel="resetModalData"
  >
    <div class="img-upload-prod">
      <VaFileUpload
        v-model="imageFile"
        type="gallery"
        uploadButtonText="上傳圖片"
        @update:model-value="limitedOneFile"
      >
        <VaButton class="upload-btn" :rounded="false">
          上傳圖片
        </VaButton>
      </VaFileUpload>
      <div class="img-container" v-if="item.id && imageFile.length === 0">
        <div class="box">
          <img :src="item.image" />
        </div>
      </div>
    </div>
    <VaInput v-model="item.title" class="input-spacing" label="商品介紹" />
    <VaInput v-model="item.price" class="input-spacing" label="價格" />
  </VaModal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect } from 'vue';
import { type ProductInter } from '@/types';

const props = defineProps<{
  modelValue: boolean;
  item: ProductInter;
  title: string;
  type: string;
}>();

const emits = defineEmits(['cancel', 'save']);

const defaultItem: ProductInter = {image: '', title: '', price: 0, id: '', num: 1};
const imageFile = ref([]);
const item = ref<ProductInter>({ ...defaultItem });

watchEffect(() => {
  item.value = { ...props.item };
});

const limitedOneFile = () => {
  if (imageFile.value.length > 1) {
    imageFile.value = imageFile.value.splice(1, 1);
  }
};

const handleOk = () => {
  emits('save', { item: item.value, imageFile: imageFile.value, type: props.type });
  resetModalData()
};

const resetModalData = () => {
  emits('cancel', props.type);
  item.value = { ...defaultItem };
  imageFile.value = [];
};

</script>

<style scoped>
.input-spacing {
  margin-top: 20px; /* 自定義上間隔 */
  margin-bottom: 20px; /* 自定義下間隔 */
}

.modal-crud {
  .va-input {
    display: block;
  }
  .img-upload-prod {
    max-width: 500px;
    width: 100%;
    .img-container {
      width: 100%;
      padding-bottom: 100%;
      height: 0;
      position: relative;
      .box {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #e7e7e7;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .upload-btn {
      width: 100%;
    }
    .va-file-upload {
      margin: 0;
      .va-file-upload-list {
        position: absolute;
        display: block;
        margin: 0 !important;
        padding: 0;
        .va-file-upload-gallery-item {
          max-width: 500px;
          width: 100%;
        }
      }
    }
  }
}
</style>