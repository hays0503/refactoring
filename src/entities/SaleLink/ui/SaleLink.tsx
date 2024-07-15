import style from './SaleLink.module.scss'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function SaleLink() {
  const t = useTranslations();
  return  <div className={style.Link}>
            {/* распродажа */}
            <Link href="/sale"> {t("rasprodazha")}</Link>
  </div>
}
