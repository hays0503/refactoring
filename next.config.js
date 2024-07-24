const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    //http://185.100.67.246:8888/api/v1/category/
    //http://185.100.67.246:8888/api/v1/category/kz
    //http://185.100.67.246:8888/api/v1/category/en
    return [
      {
        source: "/api/v1/category",
        destination: "http://185.100.67.246:8888/api/v1/category/",
      },
      {
        source: "/api/v1/category/:slug",
        destination: "http://185.100.67.246:8888/api/v1/category/:slug/",
      },

      {
        source: "/api/v1/category/:slug/subcategories",
        destination:
          "http://185.100.67.246:8888/api/v1/category/:slug/subcategories/",
      },

      {
        source: "/api/v1/products",
        destination: "http://185.100.67.246:8888/api/v1/products/",
      },

      {
        source: "/api/v1/products/by_ids/:ids",
        destination: "http://185.100.67.246:8888/api/v1/products/by_ids/:ids/",
      },

      {
        source: "/api/v1/products/:slug",
        destination: "http://185.100.67.246:8888/api/v1/products/:slug/",
      },

      {
        source: "/api/v1/products/lang/:slug",
        destination: "http://185.100.67.246:8888/api/v1/products/lang/:slug/",
      },

      {
        source: "/api/v1/products/:slug/lang/:lang",
        destination:
          "http://185.100.67.246:8888/api/v1/products/:slug/lang/:lang/",
      },

      // Fetch data from API for RU locale
      // http://185.100.67.246:8888/api/v1/products/filter_by_cat/<slug_cat>/

      // Fetch data from API for other locale
      // http://185.100.67.246:8888/api/v1/products/filter_by_cat/<slug_cat>/lang/<lang>/

      {
        source: "/api/v1/products/filter_by_cat/:slug_cat",
        destination:
          "http://185.100.67.246:8888/api/v1/products/filter_by_cat/:slug_cat/",
      },
      {
        source: "/api/v1/products/filter_by_cat/:slug_cat/lang/:lang",
        destination:
          "http://185.100.67.246:8888/api/v1/products/filter_by_cat/:slug_cat/lang/:lang/",
      },

      {
        source: "/media/product_images/:patch*",
        destination: "http://185.100.67.246:8888/media/product_images/:patch*/",
      },

      {
        source: "/api/v1/populates/:patch*",
        destination: "http://185.100.67.246:8888/api/v1/populates/:patch*/",
      },

      {
        source: "/api/v1/reviews",
        destination: "http://185.100.67.246:8888/api/v1/reviews/",
      },
      {
        source: "/api/v1/brands/by_category/:cat_pk",
        destination:
          "http://185.100.67.246:8888/api/v1/brands/by_category/:cat_pk/",
      },
      {
        source: "/api/v1/reviews/filter_by_prod/:prod_pk",
        destination:
          "http://185.100.67.246:8888/api/v1/reviews/filter_by_prod/:prod_pk/",
      },

      {
        source: "/api/v1/descrip/filter_by_prod/:prod_pk",
        destination:
          "http://185.100.67.246:8888/api/v1/descrip/filter_by_prod/:prod_pk/",
      },

      {
        source: "/api/v1/specif/filter_by_prod/:prod_pk",
        destination:
          "http://185.100.67.246:8888/api/v1/specif/filter_by_prod/:prod_pk/",
      },

      {
        source: "/api/v1/specif/by_category/:cat_pk",
        destination:
          "http://185.100.67.246:8888/api/v1/specif/by_category/:cat_pk/",
      },
      
      {
        source: "/api/v1/products/set/filter",
        destination: "http://185.100.67.246:8888/api/v1/products/set/filter",
      },

      {
        source: "/auth_api/v1/auth_user/:id",
        destination: "http://pimenov.kz:5001/auth_api/v1/auth_user/:id",
      },
    ];
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};

module.exports = withNextIntl(nextConfig);
