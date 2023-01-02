const modifyGrid = (data) => data

export default modifyGrid


// variant 2
// import {
//     onlyPages,
//     onlyProjects,
//   } from "@lekoarts/gatsby-theme-jodie/src/utils/resolver-templates";
  
//   const modifyGrid = (data) => onlyPages(data);
//   const modifyGrid = (data) => onlyProjects(data)

//   export default modifyGrid;

//   // variant 3
// import { filterBySlug } from "@lekoarts/gatsby-theme-jodie/src/utils/resolver-templates";
// const modifyGrid = (data) => filterBySlug(data, ["/about"]);

// export default modifyGrid;