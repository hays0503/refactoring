import { useLocale } from 'next-intl';
import styles from './Logo.module.scss'
import Image from 'next/image';

export default function Logo() {
  const localActive = useLocale();
  return (
    <div className={styles.Logo}>
      <a href={`/${localActive}/`}>
        <Image priority={true} src="/logo.svg" alt="logo" height={60} width={95} />
      </a>
    </div>
  );
}
