import {
  h,
  defineComponent
} from '@vue/runtime-core'
import endPage from '../assets/end_page.jpg'
import restartBtn from '../assets/restartBtn.png'
export default defineComponent({
  setup(props, {
    emit
  }) {
    const onClick = () => {
      emit('changePage', 'startPage')
    }
    return {
      onClick: onClick
    }
  },
  render(ctx) {
    return h('Container', [
      h("Sprite", {
        texture: endPage
      }),
      h("Sprite", {
        x: 215,
        y: 530,
        texture: restartBtn,
        interactive: true, // 不加 点击事件无效
        onClick: ctx.onClick
      })
    ])
  }
})