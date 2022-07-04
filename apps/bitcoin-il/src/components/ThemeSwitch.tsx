import { ControlOutlined } from '@ant-design/icons'
import { Button, Popover, Switch } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { ThemeSwitchProps } from '../utils/interfaces'
import { useTheme } from '../theme'

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({}) => {
  const [isSystem, setIsSystem] = React.useState(true)
  const [isDark, setIsDark] = React.useState(true)

  const [, actions] = useTheme()

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    isDark
      ? actions.setTheme('bitil-theme', 'bitil-dark')
      : actions.setTheme('bitil-theme', 'bitil-light')
  }

  const content = React.useMemo(() => {
    return (
      <Switch
        checked={isSystem}
        checkedChildren="System"
        unCheckedChildren="Manual"
        onChange={(v) => {
          setIsSystem(v)
          if (v) {
            actions.setTheme('bitil-theme')
          }
        }}
        defaultChecked
      />
    )
  }, [isSystem])

  return (
    <>
      {isSystem ? (
        <Button
          type="text"
          size="small"
          onClick={() => {
            setIsSystem(false)
            toggleDarkMode()
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </Button>
      ) : (
        <StyledThemeSwitch
          id="ThemeSwitch"
          onChange={toggleDarkMode}
          checked={isDark}
          checkedChildren="☀️"
          unCheckedChildren="🌙"
        />
      )}
      <Popover
        content={content}
        title="Dark Mode"
        trigger="hover"
        placement="bottomRight"
      >
        <Button type="text" size="small" icon={<ControlOutlined />} />
      </Popover>
    </>
  )
}

export default ThemeSwitch

const StyledThemeSwitch = styled(Switch)``
