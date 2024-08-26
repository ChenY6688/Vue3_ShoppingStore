<template>
  <div class="button-container">
    <VaButton @click="addNewItemModal = !addNewItemModal">
      新增商品
    </VaButton>
  </div>
  <VaDataTable class="table-crud" :items="items" :columns="columns" striped>
    
    <template #cell(image)="{ value }">
      <img :src="value" width="80" alt="">
    </template>
    <template #cell(actions)="{ rowIndex }">
      <VaButton preset="plain" icon="edit" @click="editItemByIndex(rowIndex)" />
      <VaButton preset="plain" icon="delete" class="ml-3" @click="deleteItemByIndex(rowIndex)" />
    </template>
  </VaDataTable>

  <ProductModal
    :model-value="!!editedItem"
    :item="editedItem || createdItem"
    title="編輯商品"
    type="editItem"
    @cancel="handleCancel"
    @save="handleSave"
  />

  <ProductModal
    :model-value="addNewItemModal"
    :item="createdItem"
    title="新增商品"
    type="addItem"
    @cancel="handleCancel"
    @save="handleSave"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { nanoid } from 'nanoid';
import Swal from "sweetalert2";
import ProductModal from '@/components/ProductModal.vue';
import useProduct from '@/hooks/useProduct';
import { type ProductInter, type SaveDataParams } from '@/types';

const { productList } = useProduct();

const items = ref<ProductInter[]>(productList);
const createdItem: ProductInter = {image: '', title: '', price: 0, id: '', num: 1};
const editedItem = ref<ProductInter | null>(null);
const addNewItemModal = ref(false);

const columns = [
  // { key: 'id', label: 'ID', sortable: true, width: 40 },
  { key: 'image', label: '商品圖', width: 90 },
  { key: 'title', label: '商品介紹', width: 300 },
  { key: 'price', label: '價格', width: 40 },
  { key: 'actions', label: '動作', width: 40 },
];

const handleCancel = (type:string) => {
  if(type === 'editItem'){
    editedItem.value = null;
  }else if(type === 'addItem'){
    addNewItemModal.value = !addNewItemModal.value
  };
}
  
const handleSave = ({ item, imageFile, type }: SaveDataParams) => {
  const saveData = () => {
    if (type === 'addItem') {
      item.id = nanoid();
      item.num = 1;
      items.value = [...items.value, { ...item }];
    } else if (type === 'editItem') {
      const index = items.value.findIndex(i => i.id === item.id);
      if (index !== -1) {
        items.value[index] = { ...item };
      }
    }
    localStorage.setItem('productList', JSON.stringify(items.value));
  };

  if (imageFile.length > 0) {
    const reader = new FileReader();
    if (imageFile[0] instanceof File) {
      reader.readAsDataURL(imageFile[0]);
    } else {
      item.image = imageFile[0];
      saveData();
    }
    reader.onload = (e) => {
      const base64Image = e.target!.result as string;
      item.image = base64Image;
      saveData();
    };
  } else {
    saveData();
  }
};

const editItemByIndex = (index: number) => {
  editedItem.value = { ...items.value[index] };
};

const deleteItemByIndex = async (id: number) => {
  const item = items.value[id];
  const { isConfirmed } = await Swal.fire({
    icon :"warning",
    title: "刪除商品",
    html: item.title,
    confirmButtonColor: "#84bd00",
    cancelButtonColor: "#646464",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  });
  if (isConfirmed) {
    items.value = [...items.value.slice(0, id), ...items.value.slice(id + 1)];
    localStorage.setItem('productList', JSON.stringify(items.value));
  };
}

</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: flex-end; /* 將按鈕靠右 */
  margin-bottom: 16px; /* 與表格保持一定距離 */
}
.table-crud {
  --va-form-element-default-width: 0;

  .va-input {
    display: block;
  }

  &__slot {
    th {
      vertical-align: middle;
    }
  }
}

</style>