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

type SaleProps = {
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

const SaleProjects: React.FC<PageProps<SaleProps>> = ({ data: { projects } }) => {
  // list of artwork that is sold
  const soldTitles = [  
                          'Black Bird',
                          'Cacti',
                          'Deserted House',
                          'Fibonacci Elephant',
                          'ESP8266 Programmers',
                          'Fall container with coral bells',
                          'Flavia & Cavias',
                          'Flowery Window',
                          'The Great Tit',
                          'Summer Hostas',
                          'Jimis cats',
                          'Emiel, Madelief and Wilma on the trampoline',
                          'Kingfisher',
                          'Koi',
                          'Little Krishna',
                          'Lotus 1',
                          'Beautiful Lake during Spring',
                          'Madelief with Sticks',
                          'Fish in water',
                          'Neighbors Bee House - Joanna Imkerij',
                          'Pigeon',
                          'Poppies red & orange',
                          'Red and white tulips in a vase',
                          'Retro Cat and Fish',
                          'Water turtle',
                          'Willow tree during Winter',
                          'Great Spotted Woodpecker',
                          'Swan',
                          'Squirrel',
                          'Scottish Highlander',
                          'Ringnecked Parrot',
                          'White Dahlias in vase',
                          'Zappy Fish'
                      ]
  const soldProjects = projects.nodes.filter(n => soldTitles.includes(n.shortTitle))
  // make a Set to hold values from soldProjects
  const soldProjectsSet = new Set(soldProjects);
  const forSaleProjects = projects.nodes.filter((name) => {
    return !soldProjectsSet.has(name);
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
        {forSaleProjects.length > 0 ? (
          forSaleProjects.map((project) => (
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

export default SaleProjects

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

export const Head: HeadFC<SaleProps> = ({ location }) => <Seo title="For Sale Projects" pathname={location.pathname} />