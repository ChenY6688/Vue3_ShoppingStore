<template>
  <div class="side-cart-area">
    <div v-for="(item) in cartItem" :key="item.id" class="cart-item">
      <img :src="item.image" alt="" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-quantity">數量: {{ item.num }}</div>
        <div class="cart-item-price">小計:{{ subtotalPrice(item.num, item.price) }}</div>
      </div>
      <NumberButton v-model:num="item.num" :belongCart="true"/>
      <div class="cart-item-delete" @click="removeItem(item)"><BIconTrash /></div>
    </div>
    <div class="cart-totalPrice">總計:{{ currency }}${{ totalPrice }}</div>
  </div>
</template>
  
<script lang="ts" setup name="SideCart">
  import { computed } from 'vue';
  import Swal from "sweetalert2";
  import NumberButton from '@/components/NumberButton.vue';
  import { type ProductInter } from '@/types';
  import useRates from '@/hooks/useRates';
  
  const props = defineProps<{
    cartItem: ProductInter[];
    currency: string;
    }>();
    
  const emit = defineEmits(['removeItem']);

  const { conversionRates } = useRates();

  const removeItem = async (item:ProductInter) => {
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
      emit('removeItem', item);
    }
  }

  const subtotalPrice = (num:number, price:number) => {
      return num * Math.round(price * conversionRates.value[props.currency]);
  };

  const totalPrice = computed(() => {
    return props.cartItem.reduce((sum, item) => sum + (item.num * Math.round(item.price *  conversionRates.value[props.currency])), 0);
  });
  
</script>
  
<style scoped>
.side-cart-area {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  gap: 1rem; /* 設置項目之間的間距 */
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem; /* 設置圖片和信息之間的間距 */
  margin-bottom: 0.6rem;
}

.cart-item-img {
  width: 50px; /* 調整為合適的寬度 */
  height: 50px; /* 調整為合適的高度 */
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  width: 90px;
  gap: 0.5rem; /* 設置數量和小計之間的間距 */
}

.cart-item-quantity {
  color: gray;
}

.cart-item-price {
  color: gray;
}

.cart-item-delete {
  margin-left: 1rem;
  font-size: 1.3rem;
  margin-top: 0.4rem;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
  @media (max-width: 768px) {
    margin-left: 0.2rem;
  }
}

.cart-totalPrice {
  color: gray;
  text-align: right;
  margin-right: 2rem;
  font-weight: 600;
}
</style>