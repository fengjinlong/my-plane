import {
  defineComponent,
  h
} from '@vue/runtime-core'
import Circle from './component/Circle.js'
export default defineComponent({
  render() {
    // const vnode = h('rect', {
    //   x: 50,
    //   y: 50,
    // }, 'adasd', h('circle', {
    //   x: 100,
    //   y: 100,
    // }))
    const vnode = h('rect', {
      x: 50,
      y: 50,
    }, 'adasd', h(Circle))
    console.log(vnode)
    return vnode
  }
})