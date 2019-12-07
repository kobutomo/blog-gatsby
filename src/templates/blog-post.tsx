import { graphql, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Bio } from "../components/bio"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Query, SitePageContext } from "../graphql-types"
import { Link } from "gatsby"

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: Query
}

const Date = styled.p`
  display: block;
`

const Divider = styled.hr`
`

const PostNavigator = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const Article = styled.div`
p{
  margin: 1em 0;
}
strong{
  font-weight: 400;
  background: linear-gradient(0deg, rgba(221, 156, 156, 1) 2px, #1c232c 2px);
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
      <Bio />
      <PostNavigator>
        <li>
          {previous && (
            <Link to={previous.fields!.slug!} rel="prev">
              ← {previous.frontmatter!.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields!.slug!} rel="next">
              {next.frontmatter!.title} →
            </Link>
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
        description
      }
    }
  }
`
