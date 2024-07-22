import { Image} from 'antd';
import style from './CustomCarousel.module.scss';
import { useState } from 'react';
const CustomCarousel = ({ images }: { images: string[] | null }) => {

  const [SelectImage, setSelectImage] = useState(0);

  return (
    <div className={style.CustomCarousel}>
      <div className={style.ImgPrevContainer}>
        <div className={style.ImgPrev}>
          {images?.map((image, index) => (
          <Image 
          key={index}
          src={image} 
          alt="product"
          // width={'7.5dvw'}
          // height={'7.5dvw'}
          className={style.Img}
          onClick={() => setSelectImage(index)}
          preview={false}
          />
          ))}
        </div>
      </div>
      <div className={style.MainImgContainer}>
        {images && <Image 
        className={style.MainImg}
        src={images[SelectImage]}
        alt='product'
        preview={true} 
        // width={'20rem'}
        // height={'auto'} 
        // style={{
        //   borderRadius: '10px',
        // }} 
        />}
      </div>
    </div>
  );
};

export default CustomCarousel;