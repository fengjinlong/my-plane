import {
  h,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
} from '@vue/runtime-core'
import MapPage from '../component/Map.js'
import Flane from '../component/Flane.js'
import EnemyFlane from '../component/EnemyFlane.js'
import {
  game
} from '../Game.js'
import {
  hit
} from '../utils/index.js'

export default defineComponent({
  setup(props, {
    emit
  }) {
    const planeinfo = getPlaneInfo()
    const enemyinfo = etEnemyInfoArr()


    const handle = () => {
      enemyinfo.map(enemy => {
        enemy.y += 5
      })

      enemyinfo.forEach(el => {
        if (hit(el, planeinfo)) {
          console.log('hit')
          // emit('endGame')

          emit('changePage', 'endPage')
        } else {
          // console.log('nn')
        }
      })
    }
    onMounted(() => {
      game.ticker.add(handle)
    })
    onUnmounted(() => {
      game.ticker.remove(handle)
    })
    // 敌机下落




    return {
      planeinfo,
      enemyinfo
    }
  },
  render(ctx) {
    const enemyArr = ctx.enemyinfo.map((info) => {
      return h(EnemyFlane, {
        x: info.x,
        y: info.y,
      })
    })

    return h('Container', [
      h(MapPage),
      h(Flane, {
        x: ctx.planeinfo.x,
        y: ctx.planeinfo.y
      }),
      ...enemyArr
    ])
  }
})

function etEnemyInfoArr() {
  const enemyinfoArr = reactive([{
    x: 50,
    y: 50,
    width: 308,
    height: 207
  }])
  return enemyinfoArr
}

function getPlaneInfo() {
  const planeinfo = reactive({
    x: 200,
    y: 400,
    width: 258,
    height: 364
  })
  const s = 50
  window.addEventListener('keydown', ({
    key
  }) => {
    console.log(key)
    switch (key) {
      case 'ArrowLeft':
        planeinfo.x -= s;
        break;
      case 'ArrowRight':
        planeinfo.x += s;
        break;
      case 'ArrowUp':
        planeinfo.y -= s;
        break;
      case 'ArrowDown':
        planeinfo.y += s;
        break;
    }
  })
  return planeinfo
}