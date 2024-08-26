import { ref, reactive, onMounted, inject } from 'vue';
import type { AxiosInstance } from 'axios';

export default function () {
  const axios = inject('axios') as AxiosInstance;
  // use in ShoppingStore, CurrencyConverter
  const conversionRates = ref<{ [key: string]: number }>({});
  // use in CurrencyConverter
  const amount = ref<number | null>(null);
  const fromCurrency = ref<string>('');
  const toCurrency = ref<string>('');
  const lastUpdateTime = ref<string>('');
  const convertResult = reactive({
    amount: null as number | null,
    fromCurrency: '',
    toCurrency: '',
    convertedAmount: null as number | null,
  });
  // use in ShoppingStore
  const selectedCurrency = ref<string>('');

  // API更新時間為每天早上8:00:01
  const getRates = async () => {
    const localStorageData = localStorage.getItem('latest_rates_data');
    const now = new Date();

    if (localStorageData) {
      const { updateTime } = JSON.parse(localStorageData);
      const lastUpdateDate = new Date(updateTime);
      const startOfDay = new Date(lastUpdateDate);
      startOfDay.setHours(8, 0, 1, 0);
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      endOfDay.setHours(8, 0, 0, 0);

      // 如果當前時間在上一次更新時間當天的8:00:01點至隔天8:00:00點之間
      if (now > startOfDay && now <= endOfDay) {
        // 如果在更新時間範圍內，直接載入已存在的資料
        conversionRates.value = JSON.parse(localStorageData).conversionRates;
        lastUpdateTime.value = JSON.parse(localStorageData).lastUpdateTime;
        console.log("rates loaded");
        return;
      }
    }

    // 執行API請求以獲取新的匯率數據
    try {
      const { data: { conversion_rates, time_last_update_utc } } = await axios.get('https://v6.exchangerate-api.com/v6/95adaf75b68eda4e2fe4eb0d/latest/USD');
      conversionRates.value = conversion_rates;

      // 將更新時間轉換至UTC+8時區內的時間
      const date = new Date(time_last_update_utc);
      date.setHours(date.getHours() + 8);
      lastUpdateTime.value = date.toLocaleString('zh-TW', {
        timeZone: 'UTC',
        hour12: false,
      });

      // 將新數據存儲到localStorage
      localStorage.setItem('latest_rates_data', JSON.stringify({
        updateTime: now.toISOString(),
        conversionRates: conversionRates.value,
        lastUpdateTime: lastUpdateTime.value
      }));
      console.log("loading rates");

    } catch (error) {
      alert(error);
    }
  };

  const convertCurrency = () => {
    if (amount.value !== null && fromCurrency.value && toCurrency.value) {
      // 根據選擇的貨幣進行轉換
      const rate = conversionRates.value[toCurrency.value] / conversionRates.value[fromCurrency.value];

      // 轉換數值並四捨五入至小數點後第四位
      convertResult.convertedAmount = parseFloat((amount.value * rate).toFixed(4));
      convertResult.amount = amount.value;
      convertResult.fromCurrency = fromCurrency.value;
      convertResult.toCurrency = toCurrency.value;
    }
  };

  onMounted(() => {
    getRates();
  });

  return {
    // use in ShoppingStore, CurrencyConverter
    conversionRates,
    // use in ShoppingStore
    selectedCurrency,
    // use in CurrencyConverter
    amount,
    fromCurrency,
    toCurrency,
    convertResult,
    lastUpdateTime,
    // use in CurrencyConverter
    convertCurrency,
  };
}
