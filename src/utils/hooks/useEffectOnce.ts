/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* useEffectOnce is a replacement for useEffect that fixes React 18's useEffect mounting, unmounting, and remounting. For example, when leveraging useEffect to update our database with a donors information after checkout, useEffect would send this information twice- once for each mount. This hook fixes that issue. */

import { useEffect, useRef, useState } from 'react'

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void | (() => void)>()
  const effectCalled = useRef(false)
  const renderAfterCalled = useRef(false)
  const [val, setVal] = useState<number>(0)

  if (effectCalled.current) {
    renderAfterCalled.current = true
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect()
      effectCalled.current = true
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1)

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return
      }
      if (destroyFunc.current) {
        destroyFunc.current()
      }
    }
  }, [])
}
