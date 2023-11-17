import { useState } from 'react'
import type { PlasmoCSConfig } from 'plasmo'

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

export default ZShot