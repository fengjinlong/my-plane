import {
  h,
  defineComponent,
  reactive
} from '@vue/runtime-core'
import MapPage from '../component/Map.js'
import Flane from '../component/Flane.js'
export default defineComponent({
  setup() {
    const planeinfo = getPlaneInfo()
    
    return {
      planeinfo
    }
  },
  render(ctx) {
    return h('Container', [
      h(MapPage),
      h(Flane, {
        x: ctx.planeinfo.x,
        y: ctx.planeinfo.y
      }),
    ])
  }
})

function getPlaneInfo () {
  const planeinfo = reactive({
    x: 200,
    y: 200
  })
  const s = 50
  window.addEventListener('keydown', ({
    key
  }) => {
    console.log(key)
    switch (key) {
      case 'ArrowLeft':
        planeinfo.x -= s;
        break;
      case 'ArrowRight':
        planeinfo.x += s;
        break;
      case 'ArrowUp':
        planeinfo.y -= s;
        break;
      case 'ArrowDown':
        planeinfo.y += s;
        break;
    }
  })
  return planeinfo
}