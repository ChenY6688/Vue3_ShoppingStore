<template>
  <div class="app">
    <h2 class="title">Vue3</h2>
    <!-- 導航區 -->
    <div class="navigate">
      <RouterLink to="/productManage" active-class="active">後台</RouterLink>
      <RouterLink to="/shoppingStore" active-class="active">商城</RouterLink>
      <RouterLink to="/currencyConverter" active-class="active">匯率</RouterLink>
    </div>
    <!-- 展示區 -->
    <div class="main-content">
      <RouterView></RouterView>
    </div>

  </div>
</template>

<script lang="ts" setup name="App">
  import { RouterView, RouterLink } from 'vue-router'

</script>

<style scoped>
@import"https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap";
@import"https://fonts.googleapis.com/icon?family=Material+Icons";
.title {
  text-align: center;
  word-spacing: 5px;
  margin: 30px 0;
  height: 70px;
  line-height: 70px;
  background-image: linear-gradient(45deg, gray, white);
  border-radius: 10px;
  box-shadow: 0 0 2px;
  font-size: 30px;
}
.navigate {
  display: flex;
  justify-content: space-around;
  margin: 0 100px;
  @media (max-width: 768px) {
    margin: 0 20px;
  }
}
.navigate a {
  display: block;
  text-align: center;
  width: 90px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: gray;
  text-decoration: none;
  color: white;
  font-size: 18px;
  letter-spacing: 5px;
}
.navigate a.active {
  background-color: #64967E;
  color: #ffc268;
  font-weight: 900;
  text-shadow: 0 0 1px black;
}
.main-content {
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  width: 90%;
  /* height: 400px; */
  /* border: 1px solid; */
}
</style>