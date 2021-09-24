import {
  defineComponent,
  h,
  toRefs
} from '@vue/runtime-core'
import bullet from '../assets/bunny-self.png'


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
      x: ctx.x + 18,
      y: ctx.y,
      width: 30,
      height: 50,
    })])
  }
})