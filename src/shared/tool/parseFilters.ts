const parseFilters = (filters: string[]) => {
  if (filters) {
    const filterObject: Record<string, any> = {};
    let currentKey: string | null = null;

    filters.forEach((filter, index) => {
      if (isKey(filter)) {
        currentKey = filter;
        if (!filterObject[currentKey]) {
          filterObject[currentKey] = [];
        }
      } else if (currentKey) {
        if (currentKey === "category" || currentKey === "brand") {
          const ids = decodeURIComponent(filter)
            .split(",")
            .map((id) => Number(id));
          filterObject[currentKey] = ids;
        } else if (currentKey === "price_min" || currentKey === "price_max") {
          filterObject[currentKey] = Number(filter);
        } else if (currentKey === "specifications") {
          const [specName, specValue] = decodeURIComponent(filter).split(":");
          filterObject[currentKey].push({ name: specName, value: specValue });
        } else {
          filterObject[currentKey].push(filter);
        }
      } else {
        console.warn(`Unexpected value without a key: ${filter}`);
      }
    });

    // Remove any NaN values from the arrays
    Object.keys(filterObject).forEach((key) => {
      if (Array.isArray(filterObject[key])) {
        filterObject[key] = filterObject[key].filter(
          (value) => !isNaN(value) || typeof value === "object"
        );
      }
    });

    return filterObject;
  }
  else
    return {};
};

function isKey(value: string): boolean {
  const possibleKeys = [
    "category",
    "brand",
    "price_min",
    "price_max",
    "specifications",
  ];
  return possibleKeys.includes(value);
}

export default parseFilters;
