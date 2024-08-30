// export const revalidateConfig: any = {
//     "api/v1/populates":{ tags: ["fetchPopularProduct"], revalidate: 1 },
//     "/api/v1/products/by_ids":{ tags: ["fetchProductByIds"] },
//     "/api/v1/products/all/slugs":{ revalidate: 60 },
//     "/api/v1/category":{ revalidate: 60 },
//     "/api/v1/products/set/filter": {},
//     "/basket_api/v1/bascket":{},
//     "/basket_api/v1/bascket/create_or_update":{},
//     "/basket_api/v1/order":{},
//     "/api/v1/products":{},
//     "/api/v1/reviews/filter_by_prod":{},
//     "/auth_api/v1/auth_user":{},
//     "/api/v1/specif/filter_by_prod":{},
//     "/api/v1/reviews":{},
//     "/api/v1/products/filter_by_cat":{},
//     "/api/v1/citys":{},
//     "/api/v1/category/[slug]/subcategories":{},
//     "/api/v1/brands/by_category/id/[id]":{},
//     "/api/v1/specif/by_category/id/[id]":{},
// }

export const revalidateConfig: any = {
    "api/v1/populates":{ tags: ["fetchPopularProduct"], revalidate: 1800 },
    "/api/v1/products/by_ids":{ tags: ["fetchProductByIds"], revalidate: 1800  },
    "/api/v1/products/all/slugs":{ revalidate: 1800 },
    "/api/v1/category":{ revalidate: 1800 },
    "/api/v1/products/set/filter": {revalidate: 1800},
    "/basket_api/v1/bascket":{revalidate: 1800},
    "/basket_api/v1/bascket/create_or_update":{revalidate: 1800},
    "/basket_api/v1/order":{revalidate: 1800},
    "/api/v1/products":{revalidate: 1800},
    "/api/v1/reviews/filter_by_prod":{revalidate: 1800},
    "/auth_api/v1/auth_user":{revalidate: 1800},
    "/api/v1/specif/filter_by_prod":{revalidate: 1800},
    "/api/v1/reviews":{revalidate: 1800},
    "/api/v1/products/filter_by_cat":{revalidate: 1800},
    "/api/v1/citys":{revalidate: 1800},
    "/api/v1/category/[slug]/subcategories":{revalidate: 1800},
    "/api/v1/brands/by_category/id/[id]":{revalidate: 1800},
    "/api/v1/specif/by_category/id/[id]":{revalidate: 1800},
}