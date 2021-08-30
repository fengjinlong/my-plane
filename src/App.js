import {
  defineComponent,
  h
} from '@vue/runtime-core'
// import Circle from './component/Circle.js'
import Startpage from './page/StartPage.js'

export default defineComponent({
  render() {
    const vnode = h('Container', [h(Startpage, {})])

    // const vnode = h('rect', {
    //   x: 50,
    //   y: 50,
    // }, 'adasd', h('circle', {
    //   x: 100,
    //   y: 100,
    // }))

    // const vnode = h('rect', {
    //   x: 50,
    //   y: 50,
    // }, 'adasd', h(Circle))

    return vnode
  }
})