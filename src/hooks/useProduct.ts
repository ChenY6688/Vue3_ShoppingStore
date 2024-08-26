import { reactive, onMounted, inject } from 'vue';
import { type ProductInter } from '@/types';
import type { AxiosInstance } from 'axios';


export default function () {
  // AxiosInstance provide from axiosPlugin.ts
  const axios = inject('axios') as AxiosInstance;

  const localStorageData = localStorage.getItem('productList');
  const productList = localStorageData ? JSON.parse(localStorageData) : reactive<ProductInter[]>([]);

  const getProduct = async () => {
    if(!localStorageData){
      try {
        const { data } = await axios.get('https://api.escuelajs.co/api/v1/products');
        const limitedData = data.slice(5, 30);
        limitedData.forEach((product: ProductInter) => {
          product.num = 1;
          product.price = Math.round(product.price);
          product.image = (product as unknown as { images: string[] }).images[0];
        });
        Object.assign(productList, limitedData);
        localStorage.setItem('productList', JSON.stringify(productList));
        console.log('loading productList');
      } catch (error) {
        alert(error);
      }
    }else{
      console.log('productList loaded');
    }
  };

  onMounted(()=>{
    getProduct()
  })

  return {
    // use in ShoppingStore, ProductManage
    productList,
  }
}