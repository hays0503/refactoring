import { useLocale } from 'next-intl';
import styles from './Logo.module.scss'
import Image from 'next/image';

export default function Logo( {urlCity,height=65,width=90}:{urlCity:string,height?:number,width?:number}) {
  const localActive = useLocale();
  return (
    <div className={styles.Logo}>
      <a href={`/${localActive}/${urlCity}/`}>
        <Image priority={true} src="/logo.svg" alt="logo" height={height} width={width} />
      </a>
    </div>
  );
}
