import {
  h,
  ref,
  toRaw,
  toRefs,
  isReactive,
  reactive,
  onMounted,
  onUnmounted,
  defineComponent,
  watch,
} from '@vue/runtime-core'
import useFighting from './fighting'
import {
  useEnemyTrack,
  multipleAttack,
  useEnemyPlanesFix
} from './useEnemyTrack'
import {
  stage,
  ENEMY,
  ENEMYTOTAL,
  ENEMYBULLET
} from '../config'
import {game} from '../GameContainer'

import Mapg from '../components/Map'
import Plane from '../components/plane'
import EnemyPlane from '../components/enemyPlane'

import Bullet from '../components/bullet'
import EnemyBullet from '../components/enemyBullet'
// 生产敌方飞机
const useEnemyPlanes = () => {
  // 敌方飞机初始数据
  const initData = (x) => {
    return {
      x,
      y: 200,
      width: ENEMY.width,
      height: ENEMY.height,
      life: ENEMY.life,
    }
  }

  const enemyPlanes = reactive([])
  let tt;
  onMounted(() => {
    tt = setInterval(() => {
      let x = Math.floor(Math.random() * stage.width);
      let y = Math.floor(Math.random() * stage.width);
      // 375 130
      x = x > stage.width - ENEMY.width ? y : x
      // 飞机不超过10个
      if (enemyPlanes.length > ENEMYTOTAL) {
        clearInterval(tt)
        return
      }
      enemyPlanes.push(initData(x))
    }, 50)
  })
  onUnmounted(() => {
    clearInterval(tt)
  })
  return enemyPlanes
}

export default defineComponent({
  setup(props, {
    emit
  }) {


    // 我方飞机
    const planeInfo = useCreatePlan()
    // 敌方飞机
    let enemyPlaneInfo = useEnemyPlanesFix()
    // 我方子弹
    const {
      bulletsArr,
      addBullet
    } = useBullets()

    // 发射我方子弹
    const onAttack = (info) => {
      addBullet(info)
    }

    // 地方总子弹集合 
    const enemyBArr = reactive([])
    // 敌机发射子弹
    const shoot = (info) => {
      let s = {
        width: ENEMYBULLET.width,
        height: ENEMYBULLET.height,
      }
      enemyBArr.push(Object.assign(s, info))
    }

    // 战斗逻辑
    // useFighting(emit, planeInfo, enemyPlaneInfo, bulletsArr, enemyBArr)
    useFighting(emit, planeInfo, enemyPlaneInfo, bulletsArr, enemyBArr)

    // 起飞的敌机发起了进攻
    let ttt= setTimeout(()=>{

      multipleAttack(enemyPlaneInfo, emit)
      clearTimeout(ttt)
    }, 8000)


    return {
      planeInfo,
      onAttack,
      shoot,
      enemyBArr,
      bulletsArr,
      enemyPlaneInfo
    }
  },
  render(ctx) {
    // 子弹
    const bulletsArr = ctx.bulletsArr.map(bullet => {
      return h(Bullet, {
        x: bullet.x,
        y: bullet.y
      })
    })
    // 敌方子弹
    const enemyBulletsArr = ctx.enemyBArr.map(b => {
      return h(EnemyBullet, {
        x: b.x,
        y: b.y,
      })

    })
    const enemyPlanes = ctx.enemyPlaneInfo.map(pla => {
      return h(EnemyPlane, {
        x: pla.x,
        y: pla.y,
        width: pla.width,
        height: pla.height,
        onAttack: (m) => {
          ctx.shoot(m)
        }
      })
    })
    return h('Container', [
      h(Mapg),
      h(Plane, {
        x: ctx.planeInfo.x,
        y: ctx.planeInfo.y,
        onAttack: ctx.onAttack,
      }),
      ...enemyPlanes,
      ...bulletsArr,
      ...enemyBulletsArr
    ])
  }
})

// 我方子弹
function useBullets() {
  const bulletsArr = reactive([])
  const addBullet = (b) => {
    bulletsArr.push({
      ...b,
      width: 30,
      height: 50
    })
  }
  return {
    bulletsArr,
    addBullet
  }
}

function useCreatePlan() {
  const planeInfo = reactive({
    x: 0,
    y: 600,
    width: 64,
    height: 90
  })
  const speed = 30
  window.addEventListener('keydown', (e) => {
    switch (e.code) {
      case "ArrowUp":
        planeInfo.y -= speed
        break
      case "ArrowDown":
        planeInfo.y += speed
        break
      case "ArrowLeft":
        planeInfo.x -= speed
        break;
      case "ArrowRight":
        planeInfo.x += speed
        break;
    }
  })
  return planeInfo
}