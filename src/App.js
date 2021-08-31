import {
  defineComponent,
  h,
  computed,
  ref
} from '@vue/runtime-core'

import Startpage from './page/StartPage.js'
import Gamepage from './page/GamePage.js'
import Endpage from './page/endPage'


export default defineComponent({
  setup() {
    const currentPateName = ref('startPage')

    const currentPate = computed(() => {
      console.log(currentPateName.value)
      switch (currentPateName.value) {
        
        case 'startPage':
          return Startpage
          break;
        case 'gamePage':
          return Gamepage
          break;
        case 'endPage':
          return Endpage
        default:
          break;
      }
      // return Gamepage
    })
    return {
      currentPate,
      currentPateName
    }
  },
  render(ctx) {
    const vnode = h('Container', [h(ctx.currentPate, {
      onChangePage(page) {
        console.log(page)
        ctx.currentPateName = page
      }
    })])



    return vnode
  }
})