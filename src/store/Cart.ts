import { defineStore } from 'pinia'
import { type ProductInter } from '@/types';

const shoppingCart = localStorage.getItem('shoppingCart');
const parsedCart = shoppingCart ? JSON.parse(shoppingCart) : { cartNum: 0, cartItem: [] };

export const useCartStore = defineStore('cart', {
  state() {
    return {
      cartNum: parsedCart.cartNum || 0,
      cartItem: parsedCart.cartItem as ProductInter[] || [] as ProductInter[]
    }
  },
  actions: {
    addItem(product: ProductInter) {
      this.cartItem.push(product);
    },
  },
})