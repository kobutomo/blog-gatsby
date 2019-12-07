import { PageRendererProps } from "gatsby"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import "../css/reboot.css"
import "../css/prism.css"


interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const titleStyle = `
font-size: 2.5rem;
text-shadow:2px 2px 1px #7f92d3;
font-weight: bold;
letter-spacing : 0.1em;
text-align: center;
a {
  position: relative;
  color: #fff;
  background: linear-gradient(0deg, #dd9c9c 2px, #1c232c 2px);
}
@media screen and (min-width: 560px) {
  font-size: 3rem;
  a{
    background: linear-gradient(0deg, #dd9c9c 3px, #1c232c 3px);
  }
}
@media screen and (min-width: 960px) {
  font-size: 4.2rem;
  a{
    background: linear-gradient(0deg, #dd9c9c 4px, #1c232c 4px);
  }
}

`
const StyledH1 = styled.h1`
font-size: 2.5rem;
font-weight: bold;
letter-spacing : 0.1em;
text-align: center;
a {
  position: relative;
  text-shadow:3px 3px 0px #7f92d3;
  color: #fff;
  background: linear-gradient(0deg, #dd9c9c 2px, #1c232c 2px);
  transition: all ease .3s;
}
@media screen and (min-width: 560px) {
  font-size: 3rem;
  a{
    background: linear-gradient(0deg, #dd9c9c 3px, #1c232c 3px);
  }
}
@media screen and (min-width: 960px) {
  font-size: 4.2rem;
  a{
    background: linear-gradient(0deg, #dd9c9c 4px, #1c232c 4px);
    &:hover{
      text-shadow: 6px 6px 0px #7f92d3;
    }
  }
}
`

const StyledH3 = styled.h3`
font-size: 2.5rem;
font-weight: bold;
letter-spacing : 0.1em;
text-align: center;
a {
  position: relative;
  text-shadow:3px 3px 0px #7f92d3;
  color: #fff;
  background: linear-gradient(0deg, #dd9c9c 2px, #1c232c 2px);
  transition: all ease .3s;
}
@media screen and (min-width: 560px) {
  font-size: 3rem;
  a{
    background: linear-gradient(0deg, #dd9c9c 3px, #1c232c 3px);
  }
}
@media screen and (min-width: 960px) {
  font-size: 4.2rem;
  a{
    background: linear-gradient(0deg, #dd9c9c 4px, #1c232c 4px);
    &:hover{
      text-shadow: 6px 6px 0px #7f92d3;
    }
  }
}
`

const Header = styled.header`
  padding: 20px 0 30px;
  @media screen and (min-width: 560px) {
    padding: 20px 0 30px;
  }
  @media screen and (min-width: 960px) {
    padding: 30px 0 50px;
  }
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
