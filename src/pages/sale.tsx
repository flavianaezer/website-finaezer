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
                          'Merel',
                          'Cactussen',
                          'Verlaten huis',
                          'Fibonacci Olifant',
                          'ESP8266 Programmers',
                          'Heuchera in pot',
                          'Raam met bloemen',
                          'Koolmees',
                          'Hostas',
                          'Katten van Jimi',
                          'Kinderen op de trampoline',
                          'Ijsvogel',
                          'Koi',
                          'Kleine Krishna',
                          'Lotus 1',
                          'Meer in het voorjaar',
                          'Madelief met stokjes',
                          'Vissen',
                          'Joanna Imkerij',
                          'Duif',
                          'Papaver',
                          'Tulpen in vaas',
                          'Kat en vis',
                          'Schilpad',
                          'Wilgenboom in winter',
                          'Bonte specht',
                          'Zwaan',
                          'Eekhoorn',
                          'Schotse Hooglander',
                          'Halsbandpapegaai',
                          'Witte dahlias in vaas',
                          'Vis blauw',
                          'Zonnebloem en vlinders 2',
                          'Siererwt 1'
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