import { Category } from "@/shared/types/category";

const buildFlatCategory = (dataCatalog: Category[]): any[] => {
  const getCategory = (dataCatalog: Category): any[] => {
    const category = {
      id: dataCatalog.id,
      parent: dataCatalog.parent,
      slug: dataCatalog.slug,
    };

    if (dataCatalog.children.length > 0) {
      const recursiveData: any[] = dataCatalog.children.flatMap((item) => {
        return getCategory(item as Category);
      });
      return [category, ...recursiveData];
    } else {
      return [category];
    }
  };

  const allSlugs = dataCatalog.flatMap((item) => {
    return getCategory(item);
  });

  return allSlugs;
};

export { buildFlatCategory };
