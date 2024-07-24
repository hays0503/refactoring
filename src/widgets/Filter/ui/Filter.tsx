import React, { useState, useEffect } from "react";
import {
  Collapse,
  Slider,
  InputNumber,
  Checkbox,
  Input,
  Divider,
  Select,
  Button,
  Flex,
} from "antd";
import { Category } from "@/shared/types/category";
import {
  selectDataByLangBrands,
  selectDataByLangCategory,
  selectDataByLangNameSpecification,
  selectDataByLangProducts,
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
    result[name].value.push(value);
  });

  return result;
};

const Filter = ({
  slug_category,
  id_category,
}: {
  slug_category: string;
  id_category: number;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [specification, setSpecification] = useState<FilterProps>();
  const [specificationValue, setSpecificationValue] = useState<{name:string,value:string}[]>([]);
  const [priceRange, setPriceRange] = useState([10, 1699990]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);

  const localActive = useLocale();

  const t = useTranslations();

  useEffect(() => {
    // Fetch categories
    fetch(`/api/v1/category/${slug_category}/subcategories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch brands
    fetch(`/api/v1/brands/by_category/${id_category}`)
      .then((response) => response.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => console.error("Error fetching brands:", error));

    //Fetch colors
    fetch(`/api/v1/specif/by_category/${id_category}`)
      .then((response) => response.json())
      .then((data) => {
        const result = processData(data);
        setSpecification(result);
      })
      .catch((error) => console.error("Error fetching colors:", error));
  }, [id_category, slug_category]);

  const handleFilter = () => {
    const filterData = {
      category: id_category,
      brand: selectedBrand,
      price_min: priceRange[0],
      price_max: priceRange[1],
      specifications: specificationValue,
    };
    alert(JSON.stringify(filterData));
  };

  return (
    <div className={style.FilterContainer}>
      <Collapse
        style={{ width: "100%" }}
      >
        <Panel header="Подкатегории" key="1">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите категорию"
            onChange={(value) => setSelectedCategory(value || null)}
          >
            {categories.map((cat) => (
              <Option key={cat.slug} value={cat.slug}>
                {selectDataByLangCategory(cat, localActive)}
              </Option>
            ))}
          </Select>
        </Panel>

        <Panel header="Цена (₸)" key="2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <InputNumber
              min={10}
              max={1699990}
              value={priceRange[0] ?? 0}
              onChange={(value) => setPriceRange([value ?? 0, priceRange[1]])}
            />
            <InputNumber
              min={10}
              max={1699990}
              value={priceRange[1]}
              onChange={(value) => setPriceRange([priceRange[0], value ?? 0])}
            />
          </div>
          <Slider
            range
            value={priceRange}
            min={10}
            max={1699990}
            onChange={setPriceRange}
          />
        </Panel>
        <Panel header="Бренды" key="3">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Выберите бренд"
            onChange={setSelectedBrand}
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
            const header = ucFirst(selectDataByLangNameSpecification(
              specification[key].key,
              localActive
            ));
            return (
              <Panel header={header} key={header}>
                <Select
                  style={{ width: "100%" }}
                  placeholder={`${t("select")} ${header}`}
                  mode="multiple"
                  onSelect={(value,option) => {
                      const data = [...specificationValue,{
                        name:specification[key].key.name_specification,
                        value:value}]
                      console.log(data)
                      setSpecificationValue(data);  
                  }}
                >
                  {specification[key].value.map((item) => (
                    <Option
                      key={item.value_specification}
                      value={item.value_specification}
                    >
                      {ucFirst(selectDataByLangValueSpecification(item, localActive))}
                    </Option>
                  ))}
                </Select>
              </Panel>
            );
          })}
      </Collapse>

      <Button type="primary" onClick={handleFilter}>
        Применить фильтр
      </Button>
      </div>
  );
};

export default Filter;
