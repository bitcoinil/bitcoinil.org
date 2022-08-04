import { atom } from 'recoil'
import { LanguageAtomValue } from '../utils/interfaces'

export const currentlySelectedLanguageState = atom<LanguageAtomValue>({
  key: 'currentlySelectedLanguage',
  default: { language: 'en' }
})

export const isBurgerMenuOpenState = atom<boolean>({
  key: 'isBurgerMenuOpen',
  default: false
})

export const showSystemThemeSwitch = atom<boolean>({
  key: 'showSystemThemeSwitch',
  default: false
})

export const isDarkModeState = atom<boolean>({
  key: 'isDarkMode',
  default: false
})

export const isDevModeVisibleState = atom<boolean>({
  key: 'isDevModeVisibleState',
  default: false
})

export const isThemeDebugVisibleState = atom<boolean>({
  key: 'isThemeDebugVisibleState',
  default: false
})

export const isTooltipShownOnFormattedMessagesHover = atom<boolean>({
  key: 'isTooltipShownOnFormattedMessagesHover',
  default: false
})
