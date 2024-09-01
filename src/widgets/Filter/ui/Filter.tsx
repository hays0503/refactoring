import React, { useState, useEffect, CSSProperties, useRef } from "react";
import {
  Collapse,
  Slider,
  InputNumber,
  Select,
  Button,
  Flex,
  Typography,
  Space,
} from "antd";
import { Category } from "@/shared/types/category";
import {
  selectDataByLangBrands,
  selectDataByLangCategory,
  selectDataByLangNameSpecification,
  selectDataByLangValueSpecification,
} from "@/shared/tool/selectDataByLang";
import { useLocale, useTranslations } from "next-intl";
import { Brands } from "@/shared/types/brend";
import {
  NameSpecification,
  Specification,
  ValueSpecification,
} from "@/shared/types/specification";
import ucFirst from "@/shared/tool/ucFirst";
import style from "./Filter.module.scss";
import useThemeStore from "@/_app/store/theme";
import { DeleteOutlined } from "@ant-design/icons";
import createFilterUrl from "@/shared/tool/createFilterUrl";
import parseFilters from "@/shared/tool/parseFilters";
import { DownOutlined , UpOutlined} from '@ant-design/icons';
import { revalidateConfig } from "@/shared/config/revalidateConfig";
const { Panel } = Collapse;
const { Option } = Select;

type FilterProps = {
  [key: string]: {
    key: NameSpecification;
    value: ValueSpecification[];
  };
};

const processData = (data: Specification[]) => {
  const result: FilterProps = {};

  data.forEach((item) => {
    const name = item.name_specification.name_specification;
    const value = item.value_specification;
    if (!result[name]) {
      result[name] = {
        key: {} as NameSpecification,
        value: [],
      };
    }
    if (result[name].value.length === 0) {
      result[name].key = item.name_specification;
    }
    // Если такого значения нет, то добавляем
    if (
      !result[name].value.find(
        (item) => item.value_specification === value.value_specification
      )
    ) {
      result[name].value.push(value);
    }
  });

  return result;
};

const { Text } = Typography;

const Filter = ({
  params,
  id_category,
  setFiltredProductIds,
}: {
  params: any;
  id_category: number;
  setFiltredProductIds: (value: number[]) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [specification, setSpecification] = useState<FilterProps>();
  const [specificationValue, setSpecificationValue] = useState<
    { name: string; value: string }[]
  >([]);
  const [priceRange, setPriceRange] = useState([10, 1699990]);
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number[]>([]);
  const [loadings, setLoadings] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | string[]>([]);
  const RefFilterData = useRef<any>({});
  const [visibleFilter, setVisibleFilter] = useState<boolean>(true);
  const localActive = useLocale();

  const t = useTranslations();

  useEffect(() => {
    const paramFilters: any = parseFilters(params?.filters);

    if (paramFilters["specifications"]) {
      paramFilters["specifications"].forEach(
        (item: { name: string; value: string }) => {
          if (!Array.isArray(RefFilterData.current[item.name])) {
            RefFilterData.current[item.name] = [];
          }
          if (!RefFilterData.current[item.name]?.includes(item.value)) {
            RefFilterData.current[item.name]?.push(item.value);
          }
        }
      );
      setSpecificationValue(paramFilters["specifications"]);
    }
    // Цена
    if (paramFilters["price_min"] && paramFilters["price_max"]) {
      RefFilterData.current["price_min"] = paramFilters["price_min"];
      RefFilterData.current["price_max"] = paramFilters["price_max"];
      setActiveKey(Object.keys(RefFilterData.current));
      setPriceRange([paramFilters["price_min"], paramFilters["price_max"]]);
    }

    // Fetch categories
    fetch(`/api/v1/category/${params.slug}/subcategories`,{
      next: revalidateConfig["/api/v1/category/[slug]/subcategories"],
    })
      .then((response) => response.json())
      .then((data) => {
        //Подкатегории
        if (paramFilters["category"]) {
          const categoriesData = data
            .filter((item: Category) =>
              paramFilters["category"].includes(item.id)
            )
            .map((item: Category) =>
              selectDataByLangCategory(item, localActive)
            );

          RefFilterData.current["category"] = categoriesData;
          setActiveKey(Object.keys(RefFilterData.current));
          setSelectedCategory(paramFilters["category"]);
        }
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch brands
    fetch(`/api/v1/brands/by_category/id/${id_category}`,{
      next: revalidateConfig["/api/v1/brands/by_category/id/[id]"],
    })
      .then((response) => response.json())
      .then((data) => {
        // Бренды
        if (paramFilters["brand"]) {
          const brandData = data
            .filter((item: Brands) => paramFilters["brand"].includes(item.id))
            .map((item: Brands) => selectDataByLangBrands(item, localActive));
          RefFilterData.current["brand"] = brandData;
          setActiveKey(Object.keys(RefFilterData.current));
          setSelectedBrand(paramFilters["brand"]);
        }
        setBrands(data);
      })
      .catch((error) => console.error("Error fetching brands:", error));

    //Fetch colors
    fetch(`/api/v1/specif/by_category/id/${id_category}`,
      {
        next: revalidateConfig["/api/v1/specif/by_category/id/[id]"],
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const result = processData(data);

        setSpecification(result);
      })
      .catch((error) => console.error("Error fetching colors:", error));
  }, [id_category, params.slug,localActive, params.filters]);

  const handleFilter = () => {
    setLoadings(true);
    let filterData = {};
    if (selectedCategory) {
      filterData = { ...filterData, category: selectedCategory };
    }
    if (selectedBrand) {
      filterData = { ...filterData, brand: selectedBrand };
    }
    if (priceRange[0] !== 10 || priceRange[1] !== 1699990) {
      filterData = {
        ...filterData,
        price_min: priceRange[0],
        price_max: priceRange[1],
      };
    }
    if (specificationValue.length > 0) {
      filterData = { ...filterData, specifications: specificationValue };
    }

    alert(JSON.stringify(filterData));
    const urlFilterParam = createFilterUrl(filterData);
    window.open(
      `/${params.locale}/${params.city}/products-in-category/${params.slug}/${params.page}/${params.limit}/${params.sort}/filters/${urlFilterParam}`,
      "_blank"
    );
    setLoadings(false);
  };

  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const darkMode: CSSProperties = {
    backgroundColor: isDarkMode ? "rgb(94, 94, 94)" : "white",
  };

  const handleSelectId = (
    key: string, // Параметр для "category"
    value: number,
    option: { key: string; value: number; children: string },
    RefFilterData: React.MutableRefObject<{ [key: string]: string[] }>,
    selected: number[],
    setSelected: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    if (RefFilterData.current[key]) {
      if (RefFilterData.current[key].includes(option.children)) return;
      RefFilterData.current[key].push(option.children);
      setSelected([...selected, value]);
    }
  };

  const handleDeselectId = (
    key: string, // Параметр для "category"
    value: string,
    RefFilterData: React.MutableRefObject<{ [key: string]: string[] }>,
    data: any[],
    selected: number[],
    setSelected: React.Dispatch<React.SetStateAction<number[]>>,
    translate: (data: any, locale: string) => string
  ) => {
    const deselected = RefFilterData.current[key].filter(
      (item: string) => item !== value
    );
    RefFilterData.current[key] = deselected;

    const findDeselectId = data.find(
      (item: any) => translate(item, localActive) === value
    )?.id;

    if (findDeselectId !== undefined) {
      setSelected(selected.filter((item: number) => item !== findDeselectId));
    }
  };

  return (
    <Flex vertical={true} align="center" justify="center" gap={10} >
      <Button id={style.mobile} onClick={() => setVisibleFilter(!visibleFilter)}>
        {visibleFilter ? "Скрыть фильтры" : "Показать фильтры"}
        {visibleFilter ? <UpOutlined /> : <DownOutlined />}
      </Button>
      <div className={style.ScrollArea} style={{
        display: visibleFilter ? "block" : "none",
      }}>
        <div className={style.FilterContainer} style={darkMode}>
          <Collapse
            ghost
            expandIconPosition="end"
            style={{ width: "100%" }}
            activeKey={activeKey}
            onChange={(e) => setActiveKey(e)}
          >
            <Panel
              header={`Подкатегории (${categories.length})`}
              key="category"
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Выберите категорию"
                value={RefFilterData.current["category"]}
                onSelect={(
                  value: number,
                  option: { key: string; value: number; children: string }
                ) => {
                  handleSelectId(
                    "category",
                    value,
                    option,
                    RefFilterData,
                    selectedCategory,
                    setSelectedCategory
                  );
                }}
                onDeselect={(value: string) => {
                  handleDeselectId(
                    "category",
                    value,
                    RefFilterData,
                    categories,
                    selectedCategory,
                    setSelectedCategory,
                    selectDataByLangCategory
                  );
                }}
                onClear={() => {
                  RefFilterData.current["category"] = [];
                  setSelectedCategory([]);
                }}
              >
                {categories.map((cat) => {
                  const name = selectDataByLangCategory(cat, localActive);
                  return (
                    <Option key={cat.id} value={cat.id}>
                      {name}
                    </Option>
                  );
                })}
              </Select>
            </Panel>

            <Panel header="Цена (₸)" key="price_min">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  marginBottom: 10,
                }}
              >
                <Slider
                  range
                  defaultValue={priceRange}
                  min={10}
                  max={1699990}
                  onChange={setPriceRange}
                />
                <Flex justify="center" align="baseline" gap={5}>
                  <Flex justify="center" align="baseline" gap={5}>
                    <Text>От</Text>
                    <InputNumber
                      min={10}
                      max={1699990}
                      value={priceRange[0] ?? 0}
                      onChange={(value) =>
                        setPriceRange([value ?? 0, priceRange[1]])
                      }
                    />
                  </Flex>
                  <Flex justify="center" align="baseline" gap={5}>
                    <Text>До</Text>
                    <InputNumber
                      min={10}
                      max={1699990}
                      value={priceRange[1]}
                      onChange={(value) =>
                        setPriceRange([priceRange[0], value ?? 0])
                      }
                    />
                  </Flex>
                </Flex>
              </div>
            </Panel>
            <Panel header={`Бренды (${brands.length})`} key="brand">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Выберите бренд"
                value={RefFilterData.current["brand"]}
                onSelect={(
                  value: number,
                  option: { key: string; value: number; children: string }
                ) => {
                  handleSelectId(
                    "brand",
                    value,
                    option,
                    RefFilterData,
                    selectedBrand,
                    setSelectedBrand
                  );
                }}
                onDeselect={(value, option) => {
                  handleDeselectId(
                    "brand",
                    value,
                    RefFilterData,
                    brands,
                    selectedBrand,
                    setSelectedBrand,
                    selectDataByLangBrands
                  );
                }}
                onClear={() => {
                  RefFilterData.current["brand"] = [];
                  setSelectedBrand([]);
                }}
              >
                {brands.map((brand) => (
                  <Option key={brand.id} value={brand.id}>
                    {selectDataByLangBrands(brand, localActive)}
                  </Option>
                ))}
              </Select>
            </Panel>

            {specification &&
              Object.keys(specification).map((key) => {
                const header = ucFirst(
                  selectDataByLangNameSpecification(
                    specification[key].key,
                    localActive
                  )
                );
                return (
                  <Panel
                    header={`${header} (${specification[key].value.length})`}
                    key={header}
                  >
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder={`${t("select")} ${header}`}
                      mode="multiple"
                      value={RefFilterData.current[key]}
                      onSelect={(value, option) => {
                        const data = [
                          ...specificationValue,
                          {
                            name: specification[key].key.name_specification,
                            value: value,
                          },
                        ];
                        RefFilterData.current[key]?.push(value);
                        setSpecificationValue(data);
                      }}
                      onDeselect={(value, option) => {
                        const data = specificationValue.filter(
                          (item) => item.value !== value
                        );
                        RefFilterData.current[key] = RefFilterData.current[
                          key
                        ].filter((item: string) => item !== value);
                        setSpecificationValue(data);
                      }}
                      onClear={() => {
                        RefFilterData.current[key] = [];
                        const data = specificationValue.filter(
                          (item) => item.name !== key
                        );
                        setSpecificationValue(data);
                      }}
                    >
                      {specification[key].value.map((item) => (
                        <Option
                          key={item.value_specification}
                          value={item.value_specification}
                        >
                          {ucFirst(
                            selectDataByLangValueSpecification(
                              item,
                              localActive
                            )
                          )}
                        </Option>
                      ))}
                    </Select>
                  </Panel>
                );
              })}
          </Collapse>

          <Flex
            justify="center"
            style={{ marginBottom: 10 }}
            vertical={true}
            gap={"10px"}
          >
            <Button type="primary" loading={loadings} onClick={handleFilter}>
              Применить фильтр
            </Button>

            <Button onClick={() => setFiltredProductIds([])}>
              Сбросить <DeleteOutlined />
            </Button>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export default Filter;
