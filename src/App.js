import {
  defineComponent,
  h,
  ref,
  computed
} from '@vue/runtime-core'

import StartPage from './page/StartPage.js'
import GamePage from './page/GamePage'
import EndPage from './page/EndPage'
import {
  game
} from './GameContainer'

import {
  handleTickerAll
} from './page/fighting'

export default defineComponent({
  setup() {
    const currentPageName = ref('StartPage')

    const currentPage = computed(() => {
      if (currentPageName.value === 'StartPage') {
        return StartPage
      } else if (currentPageName.value === 'GamePage') {
        return GamePage
      } else if (currentPageName.value === 'EndPage') {
        return EndPage
      }
    })
    return {
      currentPageName,
      currentPage,
    }
  },
  render(ctx) {
    return h('Container', [
      h(ctx.currentPage, {
        onChangePage: (page) => {
          ctx.currentPageName = page
        },
        onHit() {
          console.log('hit')
          game.ticker.remove(handleTickerAll[0])
        },
      })
    ])

  }
})