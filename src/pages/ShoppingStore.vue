<template>
  <div class="currency-selector">
    <va-select
      v-model="selectedCurrency"
      :options="Object.keys(conversionRates)"
      searchable
      placeholder="選擇貨幣">
    </va-select>
  </div>
  <div class="product-area">
    <div class="product-item" v-for="product in products" :key="product.id">
      <div class="product-content">
        <img class="product-img" :src="product.image" alt="">
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p style="margin-top: 0.3rem;">{{ currency }}${{ priceOnRate(product.price) }}</p>
        </div>
      </div>
      <div class="product-actions">
        <NumberButton v-model:num="product.num" />
        <button @click="addToCart(product, currency)">加入購物車</button>
        <!-- vuestic的VaButton寫法 -->
        <!-- <VaButton 
        @click="$vaToast.init({ message: `成功加入${product.num}件至購物車`, color: '#5d0cf8' }) && addToCart(product)"
        size="small"
        >加入購物車</VaButton> -->
      </div>
    </div>
  </div>

  <div class="cart-sidebar" :class="{ 'open': isCartOpen }">
    <div class="cart-trigger" @click="isCartOpen = !isCartOpen">
      <div>查看購物車</div>
      <div class="cart-number">({{ cartStore.cartNum }})</div>
      <div v-if="!isCartOpen"><BIconCaretLeft /></div>
      <div v-else><BIconCaretRight /></div>
    </div>
    <h2>購物車</h2>
    <SideCart :cartItem="cartStore.cartItem" :currency="currency" @removeItem="removeItem" />
  </div>
</template>

<script lang="ts" setup name="ShoppingStore">
  import { ref, watch } from 'vue';
  import NumberButton from '@/components/NumberButton.vue';
  import SideCart from '@/components/SideCart.vue';
  import useProduct from '@/hooks/useProduct';
  import useCart from '@/hooks/useCart';  
  import useRates from '@/hooks/useRates';
  import { useCartStore } from '@/store/Cart';
  import { type ProductInter } from '@/types';

  const cartStore = useCartStore();
  const { productList } = useProduct();
  const { conversionRates, selectedCurrency } = useRates();
  const { isCartOpen, addToCart, removeItem } = useCart();
  
  const products = ref<ProductInter[]>(productList);
  const currency = ref('USD');

  watch(selectedCurrency,(newRate) => {
    currency.value = newRate;
  });

  const priceOnRate = (price:number) => {
      return Math.round(price * conversionRates.value[currency.value]);
  };

</script>

<style scoped>
.currency-selector {
  margin-bottom: 1rem;
}

.product-area {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  background-color: #ffffff;
}

.product-item {
  flex-basis: calc(33.333% - 1rem); /* 33.333% 寬度減去間距 */
  max-width: calc(33.333% - 1rem);
  margin: 0.5rem;
  box-sizing: border-box; /* 確保 padding 不影響寬度 */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: space-between; /* 讓子元素填滿垂直空間 */
  align-items: center; /* 子元素水平居中 */
  text-align: center; /* 確保按鈕文字居中 */
  border-radius: 10px;
  position: relative; /* 使圖片可以使用 top/bottom 設置位置 */
  @media (max-width: 768px) {
    flex-basis: calc(50% - 1rem); /* 50% 寬度減去間距 */
    max-width: calc(50% - 1rem);
  }
}

.product-content {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中對齊 */
  flex-grow: 1; /* 使內容區域可擴展 */
  text-align: center; /* 確保按鈕文字居中 */
  margin-bottom: 0.6rem; /* 與按鈕保持一些距離 */
}

.product-img {
  max-width: 100%;
  max-height: 200px; /* 可調整的最大高度 */
  object-fit: contain; /* 確保圖片按比例縮放，不會被拉伸 */
}

.product-actions {
  display: flex; /* 使用 flexbox 排列 NumberButton 和 button */
  flex-direction: column; /* 垂直排列 */
  gap: 0.5rem; /* 設置間距 */
  margin-top: auto; /* 推到最底部 */
}

button {
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.cart-trigger {
  position: fixed;
  right: 0;
  top: 0;
  width: 30px;
  height: 100%;
  text-align: center;
  color: #ffffff;
  background-color: gray;
  cursor: pointer;
  display: flex; /* 使元素成為彈性容器 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  writing-mode: vertical-rl; /* 文字垂直顯示 */
  letter-spacing: 40px;
}

.cart-number {
  letter-spacing: 0;
  display: inline-block;
  transform: rotate(270deg);
  transform-origin: left; /* 調整旋轉中心點的位置 */
  margin-left: 1.1rem;
  margin-bottom: 1rem;
}

.cart-sidebar {
  position: fixed;
  right: -400px; /* 初始位置在視圖外 */
  top: 0;
  width: 400px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease;
  padding: 1rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 380px;
  }
  h2{
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
  }
}

.cart-sidebar.open {
  right: 0; /* 側邊欄滑出 */
}

</style>