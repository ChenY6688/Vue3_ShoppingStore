import { reactive } from 'vue'
import { type NewsInter } from '@/types';
import { useRouter } from 'vue-router'

export default function(){
  const newList  = reactive([
    {id: 'news01',title: '很好的食物', content: '花椰菜'},
    {id: 'news02',title: '如何一夜暴富', content: '學IT'},
    {id: 'news03',title: '震驚, 萬萬沒想到', content: '明天是週一'},
    {id: 'news04',title: '好消息！好消息！', content: '快過年了'},
  ])

  const router = useRouter()

  const showNewsDetail = (news: NewsInter) => {
    router.push({
      name: 'newsDetail',
      params: {
        id: news.id,
        title: news.title,
        content: news.content
      }
    });
  };

  return {
    newList,
    showNewsDetail
  }
}