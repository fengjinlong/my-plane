import {
  defineComponent,
  h,
  toRefs
} from '@vue/runtime-core'
import plane from '../assets/plane.png'
import { MYPLANR } from '../config'

export default defineComponent({
  props: ['x', 'y'],
  setup(props, {emit}) {
    const {
      x,
      y
    } = toRefs(props)

    window.addEventListener('keydown', (e) => {
      if (e.code === "Space") {
        emit('attack', {
          x: x.value,
          y: y.value
        })
      }
    })

    return {
      x,
      y
    }
  },
  render(ctx) {
    return h('Container', [h('Sprite', {
      texture: plane,
      x: ctx.x,
      y: ctx.y,
      width: MYPLANR.width,
      height: MYPLANR.height,
    })])
  }
})