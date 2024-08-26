<template>
  <div class="currency-converter">
    <h2>匯率轉換器</h2>
    <VaForm ref="formRef" class="converter-form">
      <!-- <div class="form-group">
        <label for="amount">金額:</label>
        <input v-model="amount" type="number" id="amount" placeholder="輸入金額" />
      </div> -->
      <div class="form-group">
        <VaInput 
          v-model="amount" 
          :rules="[(value: number) => value > 0 || '需為大於0的正整數']" 
          type="number">
          <template v-slot:label>
            <span style="font-size: 1.2rem">金額:</span>
          </template>
        </VaInput>
      </div>
      <div class="form-group">
        <!-- <label for="fromCurrency">來源貨幣:</label>
        <select v-model="fromCurrency" id="fromCurrency">
          <option v-for="currency in Object.keys(conversionRates)" :key="currency" :value="currency">{{ currency }}
          </option>
        </select> -->
        <va-select
          v-model="fromCurrency"
          :rules="[(value: string) => value !== '' || '請選擇一種貨幣']"
          :options="Object.keys(conversionRates)"
          searchable
          placeholder="選擇貨幣">
          <template v-slot:label>
            <span style="font-size: 1.2rem">來源貨幣:</span>
          </template>
        </va-select>
      </div>
      <div class="form-group">
        <!-- <label for="toCurrency">目標貨幣:</label>
        <select v-model="toCurrency" id="toCurrency">
          <option v-for="currency in Object.keys(conversionRates)" :key="currency" :value="currency">{{ currency }}
          </option>
        </select> -->
        <va-select
          v-model="toCurrency"
          :rules="[(value: string) => value !== '' || '請選擇一種貨幣']"
          :options="Object.keys(conversionRates)"
          searchable
          placeholder="選擇貨幣">
          <template v-slot:label>
            <span style="font-size: 1.3rem">目標貨幣:</span>
          </template>
        </va-select>
      </div>
    </VaForm>
    <!-- <button @click="convertCurrency">轉換</button> -->
    <VaButton @click="validate() && convertCurrency()">轉換</VaButton>
    <div v-if="convertResult.convertedAmount !== null" class="result">
      <p>{{ convertResult.amount }} {{ convertResult.fromCurrency }} = {{ convertResult.convertedAmount }} {{ convertResult.toCurrency }}</p>
    </div>
    <div class="update-time">
      <p>最後更新時間: {{ lastUpdateTime }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup name="CurrencyConverter">
import useRates from '@/hooks/useRates';
import { useForm } from 'vuestic-ui';

const { isValid, validate } = useForm('formRef')

const {
  amount,
  fromCurrency,
  toCurrency,
  convertResult,
  conversionRates,
  lastUpdateTime,
  convertCurrency,
} = useRates();

</script>

<style scoped>
.currency-converter {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
  h2{
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}

.converter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input,
select,
button {
  padding: 0.5rem;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #0056b3;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #004494;
}

.result {
  margin-top: 1rem;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.update-time {
  margin-top: 1rem;
  font-size: 14px;
  color: #666;
}

</style>
