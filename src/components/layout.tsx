import { PageRendererProps } from "gatsby"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "../css/reboot.css"


interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const titleStyle = `
font-size: 2rem;
text-shadow:2px 2px 1px #7f92d3;
font-weight: bold;
letter-spacing : 0.1em;
text-align: center;
a {
  position: relative;
  color: #fff;
  &::before{
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    background-color: #dd9c9c;
    bottom: 0px;
    left: 0;
    z-index:-1;
  }
}
`

const StyledH1 = styled.h1`${titleStyle}`

const StyledH3 = styled.h3`${titleStyle}`

const Header = styled.header`
  padding: 15px 0;
`


const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  box-sizing: border-box;
  padding: 0 25px;
  @media screen and (min-width: 560px) {
    padding: 0 50px;
  }
`

export const Layout = (props: Props) => {
  const { location, title, children } = props
  const rootPath = `/`

  const HeaderTitle = location.pathname === rootPath ? StyledH1 : StyledH3

  return (
    <Content>
      <Header>
        <HeaderTitle>
          <Link to={`/`}>{title}</Link>
        </HeaderTitle>
      </Header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Content>
  )
}
