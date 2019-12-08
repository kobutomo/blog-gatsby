import React from "react"
import styled, { css } from "styled-components"

type Props = {
  children?: React.ReactNode
  className?: string,
  width?: string
  align?: "left" | "center" | "right"
}

const Button: React.FC<Props> = ({ children, className, width }) => {
  return <p className={className}>{children}</p>
}

export default styled(Button)`
  a,span {
    display: flex;
    align-items: center;
    padding: 7px 20px 3px;
    width: ${props => (props.width ? props.width : "auto")};
    background-color: #b65858;
    border-radius: 50px;
    justify-content: center;
    box-sizing: border-box; 
    margin: 0 auto;
    box-shadow: 0px 2px 1px 0px #643232;
    ${props => {
    switch (props.align) {
      case "left":
        return css`
          margin: 0;
          margin-right: auto;
        `
      case "right":
        return css`
          margin: 0;
          margin-left: auto;
        `
      default:
        return ""
    }
  }}}
`