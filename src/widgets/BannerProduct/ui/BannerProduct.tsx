import React from "react";
import { Carousel } from "antd";
import style from "./BannerProduct.module.scss";
import useCategoryStore from "@/_app/store/category";
import useTheme from "@/shared/hook/useTheme";
import Image from "next/image";

export default function BannerProduct() {
  const currentCategoryBanner = useCategoryStore(
    (store) => store.categoryBanner
  );

  const { isDarkTheme } = useTheme();

  return (
    <>
      {currentCategoryBanner && (
        <div className={style.container}>
          <Carousel
            arrows
            infinite={true}
            adaptiveHeight={true}
            autoplay
            autoplaySpeed={1500}
            dotPosition={"bottom"}
            dots={true}
            fade={true}
          >
            {currentCategoryBanner?.map((image, index) => (
              <div key={index}>
                <div className={style.slideStyle} style={isDarkTheme}>
                  <Image
                    src={image}
                    alt="banner"
                    width={320}
                    height={0}
                    style={{
                      objectFit:'scale-down',
                      width:'100%',
                      height:'auto'
                    }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}
