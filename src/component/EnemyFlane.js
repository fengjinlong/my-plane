import {
  h,
  toRefs,
  defineComponent
} from '@vue/runtime-core'

import enemyPlane from '../assets/enemy.png'
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
        texture: enemyPlane,
        x: ctx.x,
        y: ctx.y,
      }),
    ])
  }
})