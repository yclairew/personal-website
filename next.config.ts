import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  ...(isProd && {
    basePath: "/~y.clairewu",
    assetPrefix: "/~y.clairewu/",
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/~y.clairewu" : "",
},
};

export default nextConfig;