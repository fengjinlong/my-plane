import {
  h,
  defineComponent
} from '@vue/runtime-core'
// import StartPageImg from '../assets/start_page.jpg'
import StartPageImg from '../assets/start_page.jpg'
import StartBtn from '../assets/startBtn.png'
export default defineComponent({
  setup(props, {emit}) {
    const onClick = () => {
      emit('changePage', 'gamePage')
    }
    return {
      onClick
    }
  },
  render(ctx) {
    // <div><img /></div>
    return h('Container', [
      h("Sprite", {
        texture: StartPageImg
      }),
      h("Sprite", {
        texture: StartBtn,
        x: 226,
        y: 515,
        // 允许点击
        interactive: true,
        onClick: ctx.onClick

      })
    ])
  }
})