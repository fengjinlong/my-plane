import {
  defineComponent,
  h,
  toRefs
} from '@vue/runtime-core'
import bullet from '../assets/bunny.png'
import { ENEMYBULLET } from '../config'

export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {

    const {
      x,
      y
    } = toRefs(props)

    return {
      x,
      y,
    }
  },
  render(ctx) {
    return h('Container', [h('Sprite', {
      texture: bullet,
      x: ctx.x,
      y: ctx.y,
      width: ENEMYBULLET.width,
      height: ENEMYBULLET.height,
    })])
  }
})