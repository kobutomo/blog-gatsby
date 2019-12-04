import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Bio } from "../components/bio"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { MarkdownRemark } from "../graphql-types"
import { Link } from "gatsby"


const Title = styled.h3`
`

type Props = PageRendererProps

const BlogIndex = (props: Props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              title
              description
            }
          }
        }
      }
    }
    
  `)

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="TOP"
        keywords={["blog", "gatsby", "javascript","typescript", "react", "プログラミング", "フロントエンド", "エンジニア"]}
      />
      <Bio />
      {posts.map(({ node }: { node: MarkdownRemark }) => {
        const frontmatter = node!.frontmatter!
        const fields = node!.fields!
        const slug = fields.slug!
        const excerpt = node!.excerpt!

        const title = frontmatter.title || fields.slug
        return (
          <div key={slug}>
            <Title>
              <Link to={slug}>{title}</Link>
            </Title>
            <small>{frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: frontmatter.description || excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
