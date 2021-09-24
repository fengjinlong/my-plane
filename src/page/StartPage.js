import {
  h,
  defineComponent
} from '@vue/runtime-core'
import startPageImg from '../assets/start_page.jpg'
import startBtn from '../assets/startBtn.png'
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
      texture: startPageImg,
      width: stage.width, 
      height: stage.height,
    }),
    h('Sprite', {
      texture: startBtn,
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