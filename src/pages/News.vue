<template>
  <div class="news">
    <!-- 導航區 -->
    <ul>
      <li v-for="news in newList" :key="news.id">
        <button @click="showNewsDetail(news)">查看新聞</button>
        <RouterLink 
          :to="{
            // path:'/news/detail',
            name:'newsDetail',
            params:{
              id: news.id,
              title: news.title,
              content: news.content
            }
          }"
        >
          {{ news.title }}
        </RouterLink>
      </li>
    </ul>
    <!-- 展示區 -->
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>
  
<script lang="ts" setup name="News">
  import { RouterView, RouterLink } from 'vue-router'
  import useNews from '@/hooks/useNews';

  const {
    newList, 
    showNewsDetail,
  } = useNews()

</script>

<style scoped>
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.news ul {
  margin-top: 30px;
  /* list-style: none; */
  padding-left: 10px;
}
.news li::marker{
  color: #64967E
}
.news li>a {
  font-size: 18px;
  line-height: 40px;
  text-decoration: none;
  color: #64967E;
  text-shadow: 0 0 1px rgb(0, 84, 0);
}
.news-content{
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;  
}
</style>