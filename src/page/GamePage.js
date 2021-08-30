import {
  h,
  defineComponent
} from '@vue/runtime-core'
// import StartPageImg from '../assets/start_page.jpg'
import MapPageImg from '../assets/map.jpg'
export default defineComponent({
  render(ctx) {
    console.log(6666)
    // <div><img /></div>
    return h('Container', [
      h("Sprite", {
        texture: MapPageImg
      }),
    ])
  }
})