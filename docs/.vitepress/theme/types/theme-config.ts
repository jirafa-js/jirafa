import type { DefaultTheme } from 'vitepress'

export type Sidebar =
  | {
      [key: string]: { [k: string]: SidebarGroup[] }
    }
  | false
  | undefined

export interface SidebarGroup {
  text: string
  children: SidebarItem[]
}

export interface SidebarItem {
  text: string
  link: string
}

export type Nav =
  | {
      [key: string]: NavItem[]
    }
  | false
  | undefined

export interface NavItem {
  text: string
  link: string
  activeMatch?: string
}

export type ThemConfig = Omit<DefaultTheme.Config, 'sidebar' | 'nav'> & {
  sidebar: Sidebar
  nav: Nav
}
