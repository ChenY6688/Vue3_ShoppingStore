<template>
  <div class="group">
    <button class="btn btn-left" @click="decrement"><BIconDashLg /></button>
    <span>{{ num }}</span>
    <button class="btn btn-right" @click="increment"><BIconPlusLg /></button>
  </div>
</template>

<script lang="ts" setup name="NumberButton">
  import { defineProps, defineEmits } from 'vue';
  import { useCartStore } from '@/store/Cart';

  const cartStore = useCartStore() 
  const props = defineProps<{
    num: number;
    belongCart?: boolean;
  }>();

  const emit = defineEmits(['update:num']);

  const increment = () => {
    emit('update:num', props.num + 1);
    if(props.belongCart){
      cartStore.cartNum += 1
      const cartData = {
        cartItem: cartStore.cartItem,
        cartNum: cartStore.cartNum
      };
      localStorage.setItem('shoppingCart', JSON.stringify(cartData));
    }
  };

  const decrement = () => {
    if (props.num > 1) {
      emit('update:num', props.num - 1);
      if(props.belongCart){
        cartStore.cartNum -= 1
      const cartData = {
        cartItem: cartStore.cartItem,
        cartNum: cartStore.cartNum
      };
      localStorage.setItem('shoppingCart', JSON.stringify(cartData));
      }
    }
  };
</script>
<style scoped>
.group {
  display: flex;
  button {
    text-align: center;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    line-height: 0.8rem;
    font-size: 0.8rem;
    color: rgb(232, 231, 231);
    border: 1px solid gray;
    background-color: rgb(195, 194, 194);
    max-width: 37px;
    width: 100%;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: gray;
      color: #ffffff;
    }
    &:disabled {
      background-color: #ffffff;
      color: black
    }
  }
  .btn-left {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
    padding-right: 0.5rem;
    padding-left: 0.8rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }
  .btn-right {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
    padding-right: 0.8rem;
    padding-left: 0.5rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }
  span {
    text-align: center;
    border: 1px solid black;
    padding: 0.2rem 0.4rem;
    padding-right: 0.8rem;
    padding-left: 0.8rem;
    width: 100%;
    max-width: 80px;
    font-size: 1rem;
    color: gray;
    border-radius: 0;
    opacity: 1;
  }
}
</style>