import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  toRaw,
  ref,
  toRefs
} from '@vue/runtime-core'
import enemy from '../assets/enemy.png'
import {
  ENEMY,
  ENEMYBULLET
} from '../config'

const useAttack = (emit, x, y) => {
  // 2000 发射一次
  const attackInter = 5000
  let timer
  onMounted(() => {
    timer = setInterval(() => {
      emit('attack', {
        x: x.value + ENEMY.width / 2 - ENEMYBULLET.width / 2,
        y: y.value + ENEMY.height / 2
      })
    }, attackInter)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
}

export default defineComponent({
  props: ['x', 'y', 'width', 'height'],
  setup(props, {
    emit
  }) {

    const {
      x,
      y,
      width,
      height,
    } = toRefs(props)
    // } = toRaw(props)
    // let yy = ref(y)

    // 发射子弹
    useAttack(emit, x, y)
    return {
      x,
      y,
      width,
      height

    }
  },
  render(ctx) {
    return h('Container', [h('Sprite', {
      texture: enemy,
      x: ctx.x,
      y: ctx.y,
      life: 5,
      width: ctx.width,
      height: ctx.height,
    })])
  }
})