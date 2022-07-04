import { atom } from 'recoil'
import { LanguageAtomValue } from '../utils/interfaces'

export const currentlySelectedLanguage = atom<LanguageAtomValue>({
  key: 'currentlySelectedLanguage',
  default: { language: 'en' }
})

export const isBurgerMenuOpen = atom<boolean>({
  key: 'isBurgerMenuOpen',
  default: false
})
