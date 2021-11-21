import { useState, useEffect } from 'react'

export const useDrag = (dragRef, dropRef, options) => {
  const {
    onPointerDown = () => {},
    onPointerUp = () => {},
    onPointerMove = () => {},
    onDrag = () => {},
  } = options

  const [mouseDown, setMouseDown] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setIsDragging(mouseDown)
  }, [mouseDown])

  const handlePointerDown = (e) => {
    setMouseDown(true)

    onPointerDown(e)
  }

  const handlePointerUp = (e) => {
    if (isDragging) {
      onPointerUp(e)
    }

    setMouseDown(false)
  }

  const handlePointerMove = (e) => {
    onPointerMove(e)

    if (isDragging) {
      onDrag(e)
    }
  }

  useEffect(() => {
    const e1 = dragRef.current
    const e2 = dropRef.current
    if (e1 && e2) {
      e1.addEventListener('pointerdown', handlePointerDown)
      e2.addEventListener('pointerup', handlePointerUp)
      e2.addEventListener('pointermove', handlePointerMove)

      return () => {
        e1.removeEventListener('pointerdown', handlePointerDown)
        e2.removeEventListener('pointerup', handlePointerUp)
        e2.removeEventListener('pointermove', handlePointerMove)
      }
    }

    return () => {}
  }, [isDragging])

  return { isDragging }
}

export default useDrag
