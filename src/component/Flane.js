import {
  h,
  ref,
  toRefs,
  defineComponent
} from '@vue/runtime-core'


import plane from '../assets/plane.png'
export default defineComponent({
  props: ['x','y'],
  setup(props) {
    // props 不是响应式的
    // 方案 1
    const {x,y} = toRefs(props)
    return {
      x,
      y
    }

    // 方案 2 使用 reactive，props 作为初始值
  },
  render(ctx) {
    return h('Container', [
      h("Sprite", {
        texture: plane,
        x:  ctx.x,
        y: ctx.y,
      }),
    ])
  }
})
