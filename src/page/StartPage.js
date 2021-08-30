import {h, defineComponent} from '@vue/runtime-core'
// import StartPageImg from '../assets/start_page.jpg'
import StartPageImg from '../assets/start_page.jpg'
export default defineComponent({
  render () {
    // <div><img /></div>
    return h('Container', [h("Sprite", {
      texture: StartPageImg
    })])
  }
})


