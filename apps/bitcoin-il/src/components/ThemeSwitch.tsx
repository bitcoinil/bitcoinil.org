import { ControlOutlined } from '@ant-design/icons'
import { Button, Popover, Switch } from 'antd'
import * as React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { isDarkModeState } from '../state/state'
import { useTheme } from '../theme'
import { ThemeSwitchProps } from '../utils/interfaces'

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({}) => {
  const [isSystem, setIsSystem] = React.useState(false)
  const isDark = useRecoilValue(isDarkModeState)

  const [, actions] = useTheme()

  const toggleSystem = React.useMemo(() => {
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
            actions.toggleDarkMode()
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </Button>
      ) : (
        <StyledThemeSwitch
          id="ThemeSwitch"
          onChange={() => actions.toggleDarkMode()}
          checked={isDark}
          checkedChildren="☀️"
          unCheckedChildren="🌙"
        />
      )}
      <Popover
        content={toggleSystem}
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
