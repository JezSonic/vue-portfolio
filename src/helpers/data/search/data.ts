import { ref } from "vue";
import { SearchData } from "@/helpers/search.ts";

const searchData = ref<SearchData[]>([
  {
    title: 'xd',
    description: 'aaa',
    url: 'games'
  },
  {
    title: 'xd2',
    description: 'aaa2',
    url: 'games'
  },
  {
    title: 'xd3',
    description: 'aaa3',
    url: 'games'
  }
])

export default searchData