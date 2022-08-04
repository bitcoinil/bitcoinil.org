import * as React from 'react'

export const useFade = () => {
  const disappearReappearHTMLElement = (
    el: HTMLElement,
    fadeTime: number,
    onFinish: Function
  ) => {
    el.style.transition = `opacity ${fadeTime}ms`
    el.style.opacity = '0'
    window.setTimeout(() => {
      el.style.opacity = '1'
      onFinish()
    }, fadeTime + 500)
  }

  return { disappearReappearHTMLElement }
}
