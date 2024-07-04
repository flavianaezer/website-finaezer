/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image"
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-jodie/src/components/seo"
import GridItem from "@lekoarts/gatsby-theme-jodie/src/components/grid-item"
import locales from "@lekoarts/gatsby-theme-jodie/src/locales"
import { visuallyHidden } from "@lekoarts/gatsby-theme-jodie/src/styles/utils"

type CommissionsProps = {
  projects: {
    nodes: {
      shortTitle: string
      category: string
      slug: string
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }[]
  }
}

const CommissionedProjects: React.FC<PageProps<CommissionsProps>> = ({ data: { projects } }) => {
  // list of artwork that is sold
  const commissionedTitles = [  
                          'Ijsvogel'
                      ]
  const commissionedProjects = projects.nodes.filter(n => commissionedTitles.includes(n.shortTitle))
  // make a Set to hold values from commissionedProjects
  const commissionedProjectsSet = new Set(commissionedProjects);
  const cProjects = projects.nodes.filter((name) => {
    return !commissionedProjectsSet.has(name);
  });

  return (
    <Layout>
      <h1 sx={visuallyHidden} data-testid="page-title">
        {locales.projects}
      </h1>
      <div
        sx={{
          display: `grid`,
          gridTemplateColumns: [`1fr`, `1fr 1fr`],
          gridAutoRows: `50vw`,
        }}
      >
        {cProjects.length > 0 ? (
          cProjects.map((project) => (
            <GridItem to={project.slug} key={project.slug} data-testid={project.shortTitle}>
              <GatsbyImage image={project.cover.childImageSharp.gatsbyImageData} alt="" />
              <span>{project.shortTitle}</span>
            </GridItem>
          ))
        ) : (
          <div sx={{ padding: 3 }}>No projects found at the location defined for "projectsPath"</div>
        )}
      </div>
    </Layout>
  )
}

export default CommissionedProjects

export const query = graphql`
  {
    projects: allProject(sort: { date: DESC }) {
      nodes {
        shortTitle
        category
        slug
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90)
          }
        }
      }
    }
  }
`

export const Head: HeadFC<CommissionsProps> = ({ location }) => <Seo title="Commissioned Projects" pathname={location.pathname} />