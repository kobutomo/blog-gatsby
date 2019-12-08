import { graphql, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Bio } from "../components/bio"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Query, SitePageContext } from "../graphql-types"
import { Link } from "gatsby"
import Button from "../components/Button"

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: Query
}

const Date = styled.p`
  display: block;
`

const Divider = styled.hr`
  border-top: 1px solid #ccc;
  margin: 0;
  margin-bottom: 20px;
  @media screen and (min-width: 960px) {
    margin-bottom: 40px;
  }
`

const PostNavigator = styled.ul`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 50%;
    text-align: center;
  }
  @media screen and (min-width: 960px) {
    margin-top: 0;
    margin-bottom: 40px;
    li{
     width: 30%;
      margin-top: -38px;
    }
  }
`

const Article = styled.div`
padding: 25px 0;
@media screen and (min-width: 960px) {
  padding: 50px 0;
}
> *:first-child {
  margin-top: 0;
}
> *:last-child {
  margin-bottom: 0;
}
p{
  margin: 1em 0;
}
strong{
  font-weight: 400;
  background: linear-gradient(0deg, #dd9c9c 2px, #1c232c 2px);
}
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  @media screen and (min-width: 560px) {
    font-size: 2.8rem;
  }
  @media screen and (min-width: 960px) {
    font-size: 3.2rem;
  }
`

const BlogPostTemplate = (props: Props) => {
  const data = props.data!
  const post = data.markdownRemark!
  const excerpt = post.excerpt!
  const frontmatter = post.frontmatter!
  const html = post.html!
  const siteTitle = data.site!.siteMetadata!.title!
  const { previous, next } = props.pageContext
  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={frontmatter.title!}
        description={frontmatter.description || excerpt}
      />
      <Title>{post.frontmatter!.title}</Title>
      <Date>{frontmatter.date}</Date>
      <Article dangerouslySetInnerHTML={{ __html: html }} />
      <Divider />
      <Button width={"100px"}>
        <Link to="/" rel="top">TOP</Link>
      </Button>
      <PostNavigator>
        <li>
          {previous && (
            <Button width={"120px"} align={"left"}>
              <Link to={previous.fields!.slug!} rel="prev">
                ← Prev
            </Link>
            </Button>
          )}
        </li>
        <li>
          {next && (
            <Button width={"120px"} align={"right"}>
              <Link to={next.fields!.slug!} rel="next">
                Next →
            </Link>
            </Button>
          )}
        </li>
      </PostNavigator>
    </Layout>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
