import {
  h,
  toRefs,
  defineComponent
} from '@vue/runtime-core'

import bullet from '../assets/bunny-self.png'
export default defineComponent({
  props: ['x', 'y'],
  setup(props) {
    const {
      x,
      y
    } = toRefs(props)
    return {
      x,
      y
    }
  },
  render(ctx) {

    return h('Container', [
      h("Sprite", {
        texture: bullet,
        x: ctx.x,
        y: ctx.y,
      }),
    ])
  }
})