import style from './Consultation.module.scss'
import { Divider, Image, Typography } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'
import { useTranslations } from 'next-intl'

const { Text, Link } = Typography

export default function Consultation() {
  const t = useTranslations()
  return (
    <div className={style.ConsultationContainer}>
    <div className={style.Consultation}>
      <PhoneOutlined />
      <Text>{t('nuzhna-konsultaciya')}</Text>
      <Link>0000</Link>
    </div>
    <Divider style={{ margin: '5px 0' }} />
    <div className={style.Consultation}>
      <Image src='/instagram.png' preview={false} width={24} height={24} alt='instagram'/>
      <Image src='/telegram.png' preview={false} width={24} height={24} alt='telegram'/>
      <Image src='/whatsapp.png' preview={false} width={24} height={24} alt='whatsapp'/>
    </div>
  </div>
  )
}
