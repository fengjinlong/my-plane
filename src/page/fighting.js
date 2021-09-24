import {
  onMounted,
  onUnmounted
} from '@vue/runtime-core'
import {
  game
} from '../GameContainer'
import {
  hitTestObject
} from '../utils/index'
import {
  stage
} from '../config/index'
import {
  useEnemyTrack
} from './useEnemyTrack'

export const handleTickerAll = [];
export default function useFighting(emit, planeInfo, enemyPlaneInfo, bulletsArr, enemyBArr) {

  const handleTicker = () => {
    // 敌方子弹向下
    enemyBArr.forEach((eb, i) => {
      eb.y += 1
      if (eb.y > stage.height) {
        enemyBArr.splice(i, 1)
      }
    })

    // 我方飞机中地方子弹
    enemyBArr.forEach(eb => {
      if (hitTestObject(planeInfo, eb)) {
        emit('hit')
       
        let t = setTimeout(() => {
          emit('changePage', 'EndPage')
          clearTimeout(t)
        }, 3000)
      }
    })

    // 双方子弹碰撞
    enemyBArr.forEach((eb, i) => {
      bulletsArr.forEach((mb, j) => {
        if (hitTestObject(eb, mb)) {
          enemyBArr.splice(i, 1)
          bulletsArr.splice(j, 1)
        }
      })
    })
    // 敌方飞机下飞
    // enemyPlaneInfo.forEach((enemyPlane, i) => {
    //   enemyPlane.y++
    //   if (enemyPlane.y > stage.height) {
    //     enemyPlaneInfo.splice(i,1)
    //   }
    //   // 到底自动销毁
    // })


    enemyPlaneInfo.forEach((enemyPlane, i) => {
      // useEnemyTrack(enemyPlane)
      if (enemyPlane.y >= stage.height - 10) {
        enemyPlaneInfo.splice(i, 1, {flying:undefined})
      }
    })
    // 我方子弹向上飞
    bulletsArr.forEach((bullet, i) => {
      bullet.y -= 15
      if (bullet.y < 0) {
        bulletsArr.splice(i, 1)
      }
    })
    // 撞机失败
    enemyPlaneInfo.forEach(ele => {
      if (hitTestObject(ele, planeInfo)) {
        console.log('游戏结束')
        emit('hit')
        setTimeout(() => {

          emit('changePage', 'EndPage')
        }, 3000)
      }
    })

    // 我方子弹打到敌方飞机
    bulletsArr.forEach((bullet, i) => {
      enemyPlaneInfo.forEach((enemy, j) => {

        if (hitTestObject(bullet, enemy)) {
          console.log('j', j)
        enemy.flying = undefined
          // if (enemy.flying) {
          // }
          bulletsArr.splice(i, 1)
          enemyPlaneInfo.splice(j, 1, {flying:undefined })
         
        }
      })
    })
  }

  onMounted(() => {
    game.ticker.add(handleTicker)
  })
  onUnmounted(() => {
    game.ticker.remove(handleTicker)
  })

  handleTickerAll.push(handleTicker)

}