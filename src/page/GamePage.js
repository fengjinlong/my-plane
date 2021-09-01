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
import Bullet from '../component/Bullet.js'

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
    const enemyInfo = etEnemyInfoArr()
    const {
      bullets,
      addBullet
    } = bulletInfoArr()




    const onAttack = (bullet) => {
      // console.log(bullets)
      addBullet(bullet)
      // console.log(bullets)
    }

    useFighting(bullets, enemyInfo, planeinfo)

    return {
      planeinfo,
      enemyinfo: enemyInfo,
      bullets,
      onAttack
    }
  },
  render(ctx) {
    // 子弹
    const bulletArr = ctx.bullets.map(info => {
      return h(Bullet, {
        ...info
      })
    })
    const enemyArr = ctx.enemyinfo.map((info) => {
      return h(EnemyFlane, {
        x: info.x,
        y: info.y
      })
    })

    return h('Container', [
      h(MapPage),
      h(Flane, {
        x: ctx.planeinfo.x,
        y: ctx.planeinfo.y,
        onAttack: ctx.onAttack
      }),
      ...enemyArr,
      ...bulletArr
    ])
  }
})

function useFighting(bullets, enemyInfo, planeinfo) {
  const handle = () => {
    // 我的子弹向上飞
    bullets.map(info => {
      info.y -= 2
    })
    // 敌机下走
    enemyInfo.map(enemy => {
      enemy.y += 1
    })
    // 我飞机 敌机 碰撞 游戏结束
    enemyInfo.forEach(el => {
      if (hit(el, planeinfo)) {
        emit('changePage', 'endPage')
      }
    })

    // 我子弹 敌机碰撞 子弹敌机消失
    bullets.forEach((bullet, bulletIndex) => {
      enemyInfo.forEach((ene, enemyIndex) => {
        if (hit(bullet, ene)) {
          bullets.splice(bulletIndex, 1)
          enemyInfo.splice(enemyIndex, 1)
        }
      })
    })

  }
  onMounted(() => {
    game.ticker.add(handle)
  })
  onUnmounted(() => {
    game.ticker.remove(handle)
  })
}



// 子弹
function bulletInfoArr() {
  const bullets = reactive([{}])
  const addBullet = (bullet) => {
    // console.log(bullet)
    bullets.push({
      ...bullet,
      width: 61,
      height: 99
    })
  }
  return {
    bullets,
    addBullet,
  }
}

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