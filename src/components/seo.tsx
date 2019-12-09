/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Helmet from "react-helmet"

interface Meta {
  name: string
  content: string
}

interface Props {
  title: string
  lang?: string
  meta?: Meta[]
  keywords?: string[]
  description?: string
}

export const SEO = (props: Props) => {
  const lang = props.lang || "ja"
  const meta = props.meta || []
  const keywords = props.keywords || []
  const description = props.description || ""

  const { avatar, site } = useStaticQuery(
    graphql`
      query {
        avatar: file(absolutePath: { regex: "/og.png/" }) {
          childImageSharp {
            original {
              src
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const ogImage = `${site.siteMetadata.siteUrl}${avatar.childImageSharp.original.src}`
  console.log(ogImage)
  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={props.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          content: "width=device-width, initial-scale=1.0",
          name: "viewport"
        },
        {
          content: metaDescription,
          name: `description`,
        },
        {
          content: props.title,
          property: `og:title`,
        },
        {
          content: ogImage,
          property: `og:image`,
        },
        {
          content: metaDescription,
          property: `og:description`,
        },
        {
          content: `website`,
          property: `og:type`,
        },
        {
          content: `summary`,
          name: `twitter:card`,
        },
        {
          content: site.siteMetadata.author,
          name: `twitter:creator`,
        },
        {
          content: props.title,
          name: `twitter:title`,
        },
        {
          content: metaDescription,
          name: `twitter:description`,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
              content: keywords.join(`, `),
              name: `keywords`,
            }
            : []
        )
        .concat(meta)}
    />
  )
}
