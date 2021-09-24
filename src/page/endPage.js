import {
  h,
  defineComponent
} from '@vue/runtime-core'
import endPageImg from '../assets/end_page.jpg'
import reStartBtn from '../assets/restartBtn.png'
import {stage} from '../config'

export default defineComponent({
  setup(props, ctx) {
    const onClick = () => {
      ctx.emit('changePage', 'GamePage')
    }
    return {
      onClick
    }
  },
  render(ctx) {
    return h('Container', [h('Sprite', {
      texture: endPageImg,
      width: stage.width, 
      height: stage.height,
    }),
    h('Sprite', {
      texture: reStartBtn,
      width: 160, 
      height: 50,
      x: 115,
      y: 254,
      interactive: true,
      onClick: ctx.onClick
    })
  ])
  }
})