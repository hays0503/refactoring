import { Category } from "../types/category";

const buildFlatCategory = (dataCatalog: Category[]) => {
  const getCategory = (dataCatalog: Category) => {
    const category = {
      id: dataCatalog.id,
      parent:dataCatalog.parent,
      slug: dataCatalog.slug,
    };

    if (dataCatalog.children.length > 0) {
      const reqursiveData: any = dataCatalog.children.map((item) => {
        return getCategory(item as Category).flat(Infinity);
      });
      return [category, ...reqursiveData];
    } else {
      return [category];
    }
  };

  const allSlugs = dataCatalog.map((item) => {
    return getCategory(item).flat(Infinity);
  });

  return allSlugs.flat(Infinity);
};

export { buildFlatCategory };
