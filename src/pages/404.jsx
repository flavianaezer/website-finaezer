import * as React from "react"
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"

const NotFound = () => (
  <Layout>
    <div style={{ textAlign: `center` }}>
      <h1>404</h1>
      <p>You just hit a page that doesn&#39;t exist... the sadness! Here's a toy for you to hug.</p>
      <img src="./404/404.jpg" alt="404"></img>
    </div>
  </Layout>
)

export default NotFound
