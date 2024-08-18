const fetchCurrentCategory = async (slug: string) => {
    const currentCategory = await (await fetch(`/api/v1/category/${slug}`)).json();
    return currentCategory;
  };
export default fetchCurrentCategory;