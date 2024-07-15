import React from 'react';
import { Carousel, Image } from 'antd'; // Import Image from 'antd' package
import style from './BannerProduct.module.scss';
import useCategoryStore from '@/_app/store/category';
import useTheme from '@/shared/hook/useTheme';


export default function BannerProduct() {

  const currentCategoryBanner = useCategoryStore((store)=>store.categoryBanner)

  const { isDarkTheme } = useTheme()

  return (
    <>
      {
        currentCategoryBanner && <div className={style.container}>
          <Carousel
            arrows
            infinite={true}
            adaptiveHeight={true}
            autoplay
            autoplaySpeed={1500}
            dotPosition={'bottom'}
            dots={true}
            fade={true}
          >
            {currentCategoryBanner?.map((image,index) => (
              <div key={index}>
                <div
                  className={style.slideStyle}
                  style={isDarkTheme}
                >
                  <Image src={image} alt="banner"/>
                </div>
              </div>
            ))}
          </Carousel>
      </div>
      }
    </>
  )
}
