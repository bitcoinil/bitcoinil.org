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

export const isDarkModeState = atom<boolean>({
  key: 'isDarkMode',
  default: false
})
