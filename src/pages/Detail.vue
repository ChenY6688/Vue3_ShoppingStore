<template>
  <ul class="new-list">
    <li>編號: {{ id }}</li>
    <li>標題: {{ title }}</li>
    <li>內容: {{ content }}</li>
  </ul>
</template>

<script lang="ts" setup name="Home">
  // 寫法一(從News傳入)
  // import { toRefs } from 'vue';
  // import { useRoute } from 'vue-router'
  // let route = useRoute()
  // let {query} = toRefs(route)

  // 寫法二(從路由定義props傳入)
  defineProps(['id', 'title', 'content'])

</script>

<style scoped>
.new-list {
  list-style: none;
  padding-left: 20px;
}
.new-list>li {
  line-height: 30px;
}
</style>