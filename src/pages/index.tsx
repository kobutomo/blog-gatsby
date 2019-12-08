import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Bio } from "../components/bio"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { MarkdownRemark } from "../graphql-types"
import { Link } from "gatsby"

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
            }
          }
        }
      }
    }
    
  `)

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const Post = styled.div`
  &:last-child{
    border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  }
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  a {
    display: block;
    position: relative;
    padding: 10px;
    padding-bottom: 20px;
  }
  .post {
    &__meta{
    }
    &__title{
      font-size: 1.8rem;
    }
    &__content{
      font-size: 1.4rem;
    }
  }
  @media screen and (min-width: 960px) {
    a {
      padding: 25px;
    }
    .post {
      &__meta{
      }
      &__title{
        font-size: 2.2rem;
      }
      &__content{
        font-size: 1.6rem;
      }
    }
  }
  `

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="TOP"
        keywords={["blog", "gatsby", "javascript", "typescript", "react", "プログラミング", "フロントエンド", "エンジニア"]}
      />
      {posts.map(({ node }: { node: MarkdownRemark }) => {
        const frontmatter = node!.frontmatter!
        const fields = node!.fields!
        const slug = fields.slug!
        const excerpt = node!.excerpt!

        const title = frontmatter.title || fields.slug
        return (
          <Post key={slug}>
            <Link to={slug}>
              <div className="post__meta">
                <h3 className="post__title">{title}</h3>
                <small className="post__date">{frontmatter.date}</small>
              </div>
              <p
                className="post__content"
                dangerouslySetInnerHTML={{
                  __html: frontmatter.description || excerpt,
                }}
              />
            </Link>
          </Post>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
