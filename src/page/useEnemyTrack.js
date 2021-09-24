import {
  reactive,
  toRaw
} from '@vue/runtime-core'
import {
  game
} from '../GameContainer'
import {
  stage,
  ENEMYTEAM,
  ENEMYSPEED,
  ENEMY
} from '../config'
// 一个敌方飞机贝塞尔曲线
export const useEnemyTrack = (enemy) => {

  enemy.flying = false

  // 还是做成随机吧
  let x = enemy.x
  let y = enemy.y
  let m = Math.floor(Math.random() * 10)
  let t = 0
  // P = (1−t)2P1 + 2(1−t)tP2 + t2P3
  // x1 y1   x2 y2  x3 y3
  let fn = () => {
    if (!enemy) return
    if (t > 1) {
      game.ticker.remove(fn)
    }
    // 分两种运动轨迹 left right 

    if (m > 5) {
      // left 第二个点 0 0
      enemy.x = x * (1 - t) * (1 - t) + x * t * t
      enemy.y = y * (1 - t) * (1 - t) + 2 * (1 - t) * t * (enemy.y - m * 35) + stage.height * t * t
    } else {
      // right 第二个点 width 0
      enemy.x = x * (1 - t) * (1 - t) + stage.width * 2 * (1 - t) * t + x * t * t
      enemy.y = y * (1 - t) * (1 - t) + 2 * (1 - t) * t * (enemy.y - m * 35) + stage.height * t * t
    }
    t += ENEMYSPEED
  }

  if (t > 1) {
    game.ticker.remove(fn)
  }

  game.ticker.add(fn)
}

// 生产所以敌机
export const useEnemyPlanesFix = () => {
  const N = 5
  const Arr = []
  // onMounted(() => {


  for (let i = 0; i < ENEMYTEAM; i++) {
    Arr[i] = []
    for (let j = 0; j < N; j++) {
      Arr[i][j] = {
        x: (j + 1) * 100,
        y: (i + 1) * 30,
        width: ENEMY.width,
        height: ENEMY.height,
        life: ENEMY.life,
      }
    }
  }


  let sendEnemy = Arr.reduce((x, y) => x.concat(y))

  return reactive(sendEnemy)
}

// 敌机一批次一批次进攻

export const multipleAttack = (enemyPlaneInfo, emit) => {

  const BOOK = [1]
  for (let i = 0; i < ENEMYTEAM - 1; i++) {
    BOOK.push(0)
  }
  const BOOKLength = BOOK.length
  let currnt = 0
  const dfs = () => {
    for (let i = 0; i < BOOKLength; i++) {
      if (BOOK[i] === 1) {
        currnt = i
        for (let j = 0 + i * 5; j < 5 + i * 5; j++) {
          if (enemyPlaneInfo[j]['x']) {
            useEnemyTrack(enemyPlaneInfo[j])
          }
        }
        BOOK[i] = 0
      }
    }
    // 不能通过飞机数量判断
    /**
     * 所以起飞的飞机over 后，才发动下一批敌机
     * 我想知道所以起飞的飞机什么时候over
     * 1 自己坠亡 done
     * 2 被我的子弹干掉 todo
     * 思路很清晰，判断一下敌机over 的状态，做个统计
     */

    // 飞行中飞机消失5个，发动下一批梯队。然后需要初始化标记 为 0

    // 没有飞起的飞机也要 进行下一轮轰炸
    let noFlying = enemyPlaneInfo.every(enemy => enemy.flying === undefined)

    if (noFlying) {
      // if (enemyPlaneInfo.length === BOOKLength * 5 - (currnt + 1) * 5) {

      BOOK[currnt + 1] = 1

      // 初始化标记

    }
    if (enemyPlaneInfo.length === 0) {
      game.ticker.remove(dfs)
    }
  }

  game.ticker.add(dfs)
}