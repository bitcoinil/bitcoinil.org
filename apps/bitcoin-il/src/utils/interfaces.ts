import * as React from 'react'
import type { CompiledTheme, CompiledVariant } from '@djitsu/themes'

export interface ClickedMenuItemData {
  key: string
  keyPath: [string]
}
export interface MainMenuItem {
  label: JSX.Element
  key: string
  submenu?: MainMenuItem[]
  element?: React.ReactNode
}
export interface RoutePageProps {
  title: JSX.Element
  subtitle: JSX.Element | null
  body: JSX.Element
  id: string
}

export interface AvailableLanguageData {
  icon: string | JSX.Element
  locale: string
  name: string
}

export interface SiteButtonProps {
  onClick?: Function
  type?: any // Any because it's for the AntD component and I can't figure out the type
  className?: string
  children: React.ReactNode
  color?: string
  background?: string
}

export interface TranslationDictionary {
  [key: string]: string
}

export interface StyledSupportProps {
  onClick: Function
  isExtended: boolean
}

export interface Messages {
  [key: string]: TranslationDictionary
}

export type ThemeContextValue = [ThemeContextState, ThemeContextActions]
export interface ThemeContextState {
  themes: CompiledTheme[]
  active: {
    theme: string
    variant?: string
    isDark: boolean
  }
  debug: {
    hrefLight?: string
    hrefDark?: string
  }
}

export interface BoxProps {
  index: number
  imgSrc: string
  id: string
  titleDefaultMessage: JSX.Element
  titleDescription: string
  subtitleDefaultMessage: JSX.Element
  subtitleDescription: string
  link: string
}

export interface ThemeContextActions {
  setTheme: (theme: string, variant?: string) => void
}

export interface LanguageAtomValue {
  language: string
}

export interface WhitePaperBodyProps {}

export interface WhitePaperTranslation {
  link: string
  language: JSX.Element
  translatedBy?: {
    author: JSX.Element
    link: string
  }[]
}

export interface ThemeSwitchProps {}

export interface ThemeSelectMobileProps {}

export interface ResourcesBodyProps {}

export interface QuickOverviewBoxProps {
  index: Number
  imgSrc: string
  id: string
  titleDefaultMessage: JSX.Element
  titleDescription: string
  subtitleDefaultMessage: JSX.Element
  subtitleDescription: string
  baseFormattedMessage?: String
  link: string
}

export interface NotARouteProps {}

export interface HowItWorksItem {
  index: number
  imgSrc: string
  titleText: JSX.Element
  bodyText: JSX.Element
}

export interface GetStartedWithBitcoinProps {}

export interface FooterProps {}

export interface FAQBodyProps {}

export interface IndividualFAQ {
  categoryHeading: JSX.Element
  hasSubHeadings: boolean
  bodyWithoutSubheadings?: { title: JSX.Element; body: JSX.Element }[]
  subHeadings?: { subHeadingTitle: JSX.Element; subHeadingBody: JSX.Element }[]
}

export interface EventsBodyProps {}

export interface CustomNavLinkProps {
  to: string
  children?: React.ReactNode
}

export interface BuyBodyProps {}

export interface CommunityBodyProps {}

export interface BurgerMenuMenuProps {}

export interface LanguageSelectMobileProps {}

export interface QuickOverviewBox {
  index: Number
  imgSrc: string
  id: string
  titleDefaultMessage: JSX.Element
  titleDescription: string
  subtitleDefaultMessage: JSX.Element
  subtitleDescription: string
  baseFormattedMessage?: String
  link: string
}

export interface BurgerMenuProps {}

export interface IndividualsBodyProps {}

export interface InnovationBodyProps {}

export interface BusinessBodyProps {}

export interface SupportBodyProps {}

export interface BodyCard {
  img: string
  title: JSX.Element
  text: JSX.Element
  id: string
}

export interface TimelineCompProps {
  items: JSX.Element[]
}

export interface GettingStartedBodyProps {}

export interface TimelineItemProps {
  title: string
  body: string
  buttonText: string
  buttonOnClick: Function
}

export interface HowItWorksProps {}

export interface AlternatingTwoColumnRowProps {
  index: number
  imgSrc: string
  titleText: JSX.Element
  bodyText: JSX.Element
}

export interface HeaderProps {}

export interface LanguageSelectProps {}

export interface VocabularyProps {}

export interface VocabularyTerm {
  word: JSX.Element
  definition: JSX.Element
}

export interface ExchangesBodyProps {}

export interface CoreShortcutBox {
  image: string
  title: JSX.Element
  subtitle: JSX.Element
  link: string
}
export interface CoreBodyProps {}

export interface Link {
  linkText: string
  link: string
  postLinkText: string
}

export interface CoreBox {
  img: string
  title: JSX.Element
  mainText: JSX.Element
}

export interface AvailableLanguage {
  name: string
  icon: string
  locale: string
  longName: string
}

export interface LongNamesForLanguageType {
  [key: string]: string
}

export interface Exchange {
  name: JSX.Element
  link: string
}

export interface ExchangeCountry {
  city: JSX.Element
  exchanges: Exchange[]
  flag: string
  countryCode?: string
}
export interface ExchangeLocation {
  location: JSX.Element
  exchanges?: Exchange[]
  cities?: ExchangeCountry[]
  countryCode?: string
}

export interface CardsDisplayProps {
  cards: BodyCard[]
}
