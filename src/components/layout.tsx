import { PageRendererProps } from "gatsby"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "../css/reboot.css"


interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const StyledH1 = styled.h1`
  font-size: 1.8rem;
`

const StyledH3 = styled.h3`
  font-size: 1.8rem;
  text-shadow:0px 2px 2px #237bff;
`

const Header = styled.header`
  padding: 15px 0;
  text-shadow:0px 2px 2px #237bff;
`


const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  box-sizing: border-box;
  padding: 0 20px;
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
