import style from './CardParameters.module.scss'
import { Typography, Button, Image  } from 'antd'
import { useTranslations } from "next-intl"
import { ProductsDetail } from '@/shared/types/productsDetail'

const { Text, Title} = Typography

const CardParameters = ({ product }: { product: ProductsDetail | null }) => {
  
  const t = useTranslations();

  return (<>
    <div className={style.Container}>
      <div className={style.Blur}/>
      <div  className={style.Params}>
        <div className={style.ColorHeader}>
          <Text strong>{t('cvet')}</Text>
          <Text type="secondary">{t('chyornyi')}</Text>
        </div>
        <div className={style.ColorImageContainer}>
          <div className={style.ColorImage}>
            <Image src='/cat404.svg' />
          </div>
          <div className={style.ColorImage}>
            <Image src='/cat404.svg' />
          </div>
        </div>

        {/* Параметры товара */}
        <Title level={5}>{t('parametry-tovara')}</Title>
        <div className={style.Param}>
          {
            ['65" (165 см)', '65" (165 см)', '65" (165 см)', '65" (165 см)'].map((item, index) =>
              <Button key={index} size='small' shape="round" className={style.ParamButton}>
                {item}
              </Button>
            )}
        </div>
      </div>
  </div>
  </>
  )
}

export default CardParameters