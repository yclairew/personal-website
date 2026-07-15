import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// const nextConfig: NextConfig = { // for hosting
//   output: 'export',
// };

// module.exports = nextConfig;


const nextConfig: NextConfig = { // for hosting on people.tamu.edu
  output: "export",
  basePath: "/~y.clairewu",
  assetPrefix: "/~y.clairewu/",
  trailingSlash: true,
};

module.exports = nextConfig;