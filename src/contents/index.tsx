import { useState } from 'react'
import type { PlasmoCSConfig } from 'plasmo'
import { Phase } from '~background'
/** 通过监听事件，改变状态 */
function ZShot () {
  const [isCapturing, setIsCapturing] = useState(false)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    message === 'start' && setIsCapturing(true)
    console.log('recived message!', message)
  })
  if (!isCapturing) {
    return null
  }
  return (
    <div style={{position: 'absolute', top: "200px", left: "200px"}}>test true</div>
  )
}

// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"],
//   world: 'MAIN'
// }

// 绘制彩虹线条，这个好像没办法抽象
// let hue = 0;

// ctx.strokeStyle = `hsl(${ hue }, 100%, 50%)`;
// if(hue >= 360) hue = 0;
// hue++;

function Scheduler () {
  const [phase, setPhase] = useState(Phase.None)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    setPhase(message) // 如果是状态同步，这里需要订阅phase的变化
  })
  
  if (phase === Phase.None) return null
  else if (phase === Phase.Catching) {
    return SelectRegion
  } else return null
}

function SelectRegion () {
  // 设置鼠标样式，开启DOM选择
  window.addEventListener('mouseenter', event => {
    if (event.target) {
      const target = event.target as HTMLElement
      const origin = target.style.cursor
      target.style.cursor = 'crosshair'
      target.addEventListener('mouseleave', () => {
        target.style.cursor = origin
      }, { once: true })
    }
  })
  // 鼠标点击的时候需要等待下一步操作
  window.addEventListener('mousedown', mouseDownEvent => {
    window.addEventListener('mouseup', mouseUpEvent => {
      // 如果起始点与终止点坐标不在diff范围内，设置为区域模式
      // 否则选择鼠标所在位置的DOM

    }, { once: true })
  }, { once: true })
  return null
}

export default ZShot

// 文章参考
// https://developer.chrome.com/docs/web-platform/region-capture/
// https://developer.chrome.com/docs/extensions/mv3/screen_capture/
// 交互参考
// https://chromewebstore.google.com/detail/%E9%95%80%E9%93%AC%E6%8D%95%E8%8E%B7-%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%E5%92%8Cgif%E5%B7%A5%E5%85%B7/ggaabchcecdbomdcnbahdfddfikjmphe