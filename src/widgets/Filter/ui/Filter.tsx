import React, { useState, useEffect } from 'react';
import { Collapse, Slider, InputNumber, Checkbox, Input, Divider, Select, Button, Flex } from 'antd';
import { Category } from '@/shared/types/category';
import { selectDataByLangBrands, selectDataByLangCategory, selectDataByLangProducts } from '@/shared/tool/selectDataByLang';
import { useLocale } from 'next-intl';
import { Brands } from '@/shared/types/brend';

const { Panel } = Collapse;
const { Option } = Select;

const Filter = ({slug_category,id_category}:{slug_category:string,id_category:number}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [colors, setColors] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 1699990]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);

  const localActive = useLocale();

  useEffect(() => {
    // Fetch categories
    fetch(`/api/v1/category/${slug_category}/subcategories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    // // Fetch brands
    fetch(`/api/v1/brands/by_category/${id_category}`)
      .then(response => response.json())
      .then(data => {
        console.log('brands:', data)
        setBrands(data)
      })
      .catch(error => console.error('Error fetching brands:', error));

    // // Fetch colors (assuming there's an endpoint for this, adjust if needed)
    // fetch('api/v1/colors/')
    //   .then(response => response.json())
    //   .then(data => setColors(data))
    //   .catch(error => console.error('Error fetching colors:', error));
  }, []);

  const handleFilter = () => {
    const filterData = {
      category: selectedCategory,
      brand: selectedBrand,
      price_min: priceRange[0],
      price_max: priceRange[1],
      colors: selectedColors,
    };

    // fetch('api/v1/products/set/filter/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(filterData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Filtered products:', data);
    //   })
    //   .catch(error => console.error('Error filtering products:', error));
  };

  return (
    <Flex wrap={true} align='center' justify='center'  
    //  style={{ backgroundColor:'yellow'}}
    >
      <span> id_category {id_category}</span>
      <span> slug_category {slug_category}</span>
      <span>
          {brands.map(brand => selectDataByLangBrands(brand,localActive))}
      </span>
      <Collapse defaultActiveKey={['1', '2', '3', '4']} style={{width:'100%'}}>
        <Panel header="Подкатегории" key="1">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Выберите категорию"
            onChange={(value) => setSelectedCategory(value || null)}
          >
            {categories.map(cat => (
              <Option key={cat.slug} value={cat.slug}>{selectDataByLangCategory(cat,localActive)}</Option>
            ))}
          </Select>
        </Panel>
        
        <Panel header="Цена (₸)" key="2">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
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
            style={{ width: '100%' }}
            placeholder="Выберите бренд"
            onChange={setSelectedBrand}
          >
            {brands.map(brand => (
              <Option key={brand.id} value={brand.id}>{selectDataByLangBrands(brand,localActive)}</Option>
            ))}
          </Select>
        </Panel>
        
        <Panel header="Цвет" key="4">
          {/* <Checkbox.Group
            style={{ display: 'block' }}
            onChange={setSelectedColors}
          >
            {colors.map(color => (
              <Checkbox key={color.id} value={color.name}>{color.name}</Checkbox>
            ))}
          </Checkbox.Group> */}
        </Panel>
      </Collapse>
      <Divider />
      <Button type="primary" onClick={handleFilter}>Применить фильтр</Button>
    </Flex>
  );
};

export default Filter;
