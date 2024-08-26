import { ref } from 'vue';
import Swal from "sweetalert2";
import { type ProductInter } from '@/types';
import { useCartStore } from '@/store/Cart';
import useRates from '@/hooks/useRates';

export default function () {
  const isCartOpen = ref(false);
  const cartStore = useCartStore()
  const { conversionRates } = useRates();

  const addToCart = (product:ProductInter, currency:string) => {
    const existingProductIndex = cartStore.cartItem.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      cartStore.cartItem[existingProductIndex].num += product.num;
    } else {
      product.price = Math.round(product.price / conversionRates.value[currency]);
      const cartProduct = { ...product };
      cartStore.addItem(cartProduct);
    }

    cartStore.cartNum += product.num;
    const cartData = {
      cartItem: cartStore.cartItem,
      cartNum: cartStore.cartNum
    };
    localStorage.setItem('shoppingCart', JSON.stringify(cartData));
    Swal.fire({
      icon: 'success',
      title: `成功加入${product.num}件至購物車`,
      timer: 2000,
      confirmButtonColor: "#84bd00",
      cancelButtonColor: "#646464",
    });
    product.num = 1;
  }

  const removeItem = (product: ProductInter) => {
    const index = cartStore.cartItem.findIndex(cartItem => cartItem.id === product.id);
    if (index !== -1) {
      cartStore.cartNum -= cartStore.cartItem[index].num;
      cartStore.cartItem.splice(index, 1);
    }
    const cartData = {
      cartItem: cartStore.cartItem,
      cartNum: cartStore.cartNum
    };
    localStorage.setItem('shoppingCart', JSON.stringify(cartData));
  };

  return {
    // use in ShoppingStore
    isCartOpen,
    addToCart, 
    removeItem,
  }
}