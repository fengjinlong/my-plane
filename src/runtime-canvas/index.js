import {
  createRenderer
} from '@vue/runtime-core'
// createRenderer 这个方法在vue 默认的dom渲染器里面有一些options，
// 如果我们直接使用，汇报一些问题，为了实现我们非dom的渲染器，所以我们要把它抽离出来
// 同时，按照他的需要给他传一些options的参数，这些参数有一些方法作为必选的参数
// 需要什么参数，报什么错误，我们添加什么参数

import {
  Graphics,
  Text,
  Container,Texture,
  Sprite 
} from 'pixi.js'

const renderer = createRenderer({
  createElement(type) {
    let element;
    if (type === 'Container') {
      element = new Container();
    } else if (type === 'Sprite') {
      element = new Sprite()
    }
    // if(type === 'rect'){
    //   element = new Graphics()
    //   element.beginFill(0xff0000)
    //   element.drawRect(0,0, 500,500)
    //   element.endFill()
    // } else if (type === 'circle') {
    //   element = new Graphics()
    //   element.beginFill(0xff8888)
    //   element.drawCircle(0,0,50)
    //   element.endFill()
    // }
    return element
  },
  patchProp(el, key, pv, nv) {
    switch (key) {
      case "texture":
        el.texture = Texture.from(nv);
        break;
      case "onClick":
        el.on('pointertap', nv)
        break;
      default:
        el[key] = nv
    }
  },
  setElementText(node, text) {
    const txt = new Text(text)
    node.addChild(txt)
  },
  createText(t) {
    return new Text(t)
  },
  insert(el, parent) {
    parent.addChild(el)
  },
  createComment() {},
  parentNode() {},
  nextSibling() {},
  remove(el) {
    const parent = el.parent
    if (parent) {
      parent.removeChild(el)
    }
  }
})

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent)
}