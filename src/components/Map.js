import {
  defineComponent,
  h,
  ref
} from '@vue/runtime-core'
import {stage} from '../config'
import Map from '../assets/map.jpg'
import {
  game
} from '../GameContainer'

export default defineComponent({
  setup() {
    const viewHeight = 540
    const y1 = ref(0)
    const y2 = ref(-viewHeight)
    game.ticker.add(() => {
      const speed = 0.8
      y1.value += speed
      y2.value += speed
      if (y1.value >= viewHeight) {
        y1.value = -viewHeight
      }
      if (y2.value >= viewHeight) {
        y2.value = -viewHeight
      }

    })

    return {
      y1,
      y2
    }
  },
  render(ctx) {
    return h('Container', [h('Sprite', {
      texture: Map,
      width: stage.width, 
    height: stage.height,
      y: ctx.y1
    }), h('Sprite', {
      texture: Map,
      width: stage.width, 
      height: stage.height,
      y: ctx.y2
    })])
  }
})