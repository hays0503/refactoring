const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    //http://pimenov.kz/api/v1/category/
    //http://pimenov.kz/api/v1/category/kz
    //http://pimenov.kz/api/v1/category/en
    return [
      {
        source: "/api/v1/category",
        destination: "http://pimenov.kz/api/v1/category/",
      },
      {
        source: "/api/v1/category/:slug",
        destination: "http://pimenov.kz/api/v1/category/:slug/",
      },

      {
        source: "/api/v1/category/:slug/subcategories",
        destination:
          "http://pimenov.kz/api/v1/category/:slug/subcategories/",
      },

      {
        source: "/api/v1/products",
        destination: "http://pimenov.kz/api/v1/products/",
      },

      {
        source: "/api/v1/products/by_ids/:ids",
        destination: "http://pimenov.kz/api/v1/products/by_ids/:ids/",
      },

      {
        source: "/api/v1/products/:slug",
        destination: "http://pimenov.kz/api/v1/products/:slug/",
      },

      {
        source: "/api/v1/products/lang/:slug",
        destination: "http://pimenov.kz/api/v1/products/lang/:slug/",
      },

      {
        source: "/api/v1/products/:slug/lang/:lang",
        destination:
          "http://pimenov.kz/api/v1/products/:slug/lang/:lang/",
      },

      // Fetch data from API for RU locale
      // http://pimenov.kz/api/v1/products/filter_by_cat/<slug_cat>/

      // Fetch data from API for other locale
      // http://pimenov.kz/api/v1/products/filter_by_cat/<slug_cat>/lang/<lang>/

      {
        source: "/api/v1/products/filter_by_cat/:slug_cat",
        destination:
          "http://pimenov.kz/api/v1/products/filter_by_cat/:slug_cat/",
      },
      {
        source: "/api/v1/products/filter_by_cat/:slug_cat/lang/:lang",
        destination:
          "http://pimenov.kz/api/v1/products/filter_by_cat/:slug_cat/lang/:lang/",
      },

      {
        source: "/media/product_images/:patch*",
        destination: "http://pimenov.kz:8000/media/product_images/:patch*/",
      },

      {
        source: "/api/v1/populates/:patch*",
        destination: "http://pimenov.kz/api/v1/populates/:patch*/",
      },

      {
        source: "/api/v1/reviews",
        destination: "http://pimenov.kz/api/v1/reviews/",
      },
      {
        source: "/api/v1/brands/by_category/id/:cat_pk",
        destination:
          "http://pimenov.kz/api/v1/brands/by_category/id/:cat_pk/",
      },
      {
        source: "/api/v1/reviews/filter_by_prod/:prod_pk",
        destination:
          "http://pimenov.kz/api/v1/reviews/filter_by_prod/:prod_pk/",
      },

      {
        source: "/api/v1/descrip/filter_by_prod/:prod_pk",
        destination:
          "http://pimenov.kz/api/v1/descrip/filter_by_prod/:prod_pk/",
      },

      {
        source: "/api/v1/specif/filter_by_prod/:prod_pk",
        destination:
          "http://pimenov.kz/api/v1/specif/filter_by_prod/:prod_pk/",
      },

      {
        source: "/api/v1/specif/by_category/id/:cat_pk",
        destination:
          "http://pimenov.kz/api/v1/specif/by_category/id/:cat_pk/",
      },

      {
        source: "/api/v1/products/set/filter",
        destination: "http://pimenov.kz/api/v1/products/set/filter",
      },

      {
        source: "/auth_api/v1/auth_user/:id",
        destination: "http://pimenov.kz:5001/auth_api/v1/auth_user/:id",
      },
    ];
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ru/Astana",
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
