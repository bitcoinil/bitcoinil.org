import * as React from 'react'
import styled from 'styled-components'

export default function DevTools() {
  return (
    <StyledDevTools id="DevTools">
      <h1>DEV TOOLS</h1>
      <button onClick={() => console.clear()}>Clear Console</button>
    </StyledDevTools>
  )
}

const StyledDevTools = styled.div`
  position: absolute;
  left: 0;
  top: 40vh;
  border: 2px solid;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: white;

  button {
    font-size: 18px;
    padding: 20px;
    margin-bottom: 10px;
  }
`
