import objectPath from 'object-path'
import { ExtractVSCodeToLessVars2 } from '../types'

const extractVSCodeToLessVars2: ExtractVSCodeToLessVars2 = (themeSource) => {
  const vars = [] as string[]
  const addVar = (varName: string, jsonPath: string | string[]) => {
    const value = objectPath.get(themeSource, jsonPath)
    if (value) vars.push(`@${varName}: ${value};`)
  }

  addVar('component-background', ['colors', 'editorGroup.background'])
  addVar('body-background', ['colors', 'editor.background'])
  addVar('layout-body-background', ['colors', 'editor.background'])
  addVar('layout-header-background', ['colors', 'editorGroup.background'])
  addVar('layout-sider-background', ['colors', 'sideBar.background'])
  addVar('normal-text', ['colors', 'editor.forground'])
  addVar('layout-header-color', ['colors', 'editorGroup.forground'])
  addVar('layout-sider-color', ['colors', 'sideBar.forground'])

  return vars.join('\n')
}

export default extractVSCodeToLessVars2
