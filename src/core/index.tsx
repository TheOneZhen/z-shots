import React, { useRef, useState } from "react"

function Popup() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [rect, setRect] = useState(null)
  const canvasRef = useRef(null)
  const handleMouseDown = (e) => {
    setIsDrawing(true)
    setRect({
      x: e.clientX,
      y: e.clientY,
      w: 0,
      h: 0
    })
  }
  const handleMouseMove = (e) => {
    if (isDrawing) {
      const { x, y } = rect
      const w = e.clientX - x
      const h = e.clientY - y
      setRect({ x, y, w, h })
    }
  }
  const handleMouseUp = () => {
    setIsDrawing(false)
    if (rect.w && rect.h) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(
        window.screen.availWidth > window.innerWidth
          ? window.top.document.getElementById("app").childNodes[0]
          : window.document.getElementById("app").childNodes[0],
        rect.x,
        rect.y,
        rect.w,
        rect.h,
        0,
        0,
        canvas.width,
        canvas.height
      )
      // do something with the canvas image
      // e.g. upload to server, show preview image, etc.
    }
    setRect(null)
  }
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}

export default Popup
