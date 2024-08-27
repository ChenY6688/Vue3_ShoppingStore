import { reactive, onMounted, inject, computed } from 'vue';
import { type ProductInter } from '@/types';
import type { AxiosInstance } from 'axios';


export default function () {
  // AxiosInstance provide from axiosPlugin.ts
  const axios = inject('axios') as AxiosInstance;

  const localStorageData = localStorage.getItem('productList');
  const productList = localStorageData ? JSON.parse(localStorageData) : reactive<ProductInter[]>([]);
  const pageState = reactive({
    currentPage: 1,
    itemsPerPage: 5,
  });

  const paginatedProducts = computed(() => {
    const start = (pageState.currentPage - 1) * pageState.itemsPerPage;
    const end = start + pageState.itemsPerPage;
    return productList.slice(start, end);
  });

  const changePage = (page: number) => {
    pageState.currentPage = page;
  };

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
    pageState,
    paginatedProducts,
    changePage,
  }
}