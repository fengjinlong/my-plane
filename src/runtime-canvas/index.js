import {
  createRenderer
} from '@vue/runtime-core'
import {
  Graphics,
  Component,
  Container,
  Sprite,
  Texture,
  Text
} from 'pixi.js'

const renderer = createRenderer({
  createElement(type) {
    let element;
    switch (type) {
      case 'Container':
        element = new Container();
        break
      case 'Sprite':
        element = new Sprite();
        break
        default:

    }
    // if (type === 'rect') {
    //   element = new Graphics();
    //   element.beginFill(0xff0000)
    //   element.drawRect(0, 0, 500, 500)
    //   element.endFill()
    // }
    // if (type === 'circle') {
    //   element = new Graphics();
    //   element.beginFill(0x9acd32)
    //   element.drawCircle(0,0, 50)
    //   element.endFill()
    // }

    return element
  },
  patchProp(el, key, oldVal, newVal) {
    switch (key) {
      case 'texture':
        el.texture = Texture.from(newVal);
        break;
      case 'onClick':
        el.on('pointertap', newVal)
        break;
      default:
        el[key] = newVal;
        break;
    }
  },
  createText(text) {
    return new Text(text)
  },
  insert(el, parent) {
    parent.addChild(el)
  },
  setElementText(node, text) {
    node.addChild(new Text(text))
  },
  // 注释
  createComment(text) {
    // return new Text(text)
  },
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