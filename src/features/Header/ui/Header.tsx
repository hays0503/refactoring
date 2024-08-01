"use client";

import { useLocale, useTranslations } from 'next-intl';
import styles from './Header.module.scss';
import Link from 'next/link'
import Image from 'next/image';
import { LangSwitcher } from '@/entities/LangSwitcher';
import { SelectCity } from '@/entities/SelectCity';

 import type { MenuProps } from 'antd';
 import { Menu } from 'antd';

import { Dropdown, Space, Flex, Modal,Typography } from 'antd';
import { ModalLeaveRequest } from '@/entities/ModalLeaveRequest';
import { ThemeSwitcher } from '@/entities/ThemeSwitcher';
import { DownOutlined } from '@ant-design/icons';
import useTheme from '@/shared/hook/useTheme';

type MenuItem = Required<MenuProps>['items'][number];

export default function Header({params,currentCity,Cities}:any) {

  const t = useTranslations();
  
  const localActive = useLocale();

  const [ModalTogle,ModalLeaveRequestComponent] = ModalLeaveRequest()

  const {isDarkTheme} = useTheme();

  const items: MenuItem[] = [
  { label: <Link href={`/${localActive}/${params.city}/rewiews`}>{t('otzyvy')}</Link>, key: 'rewiews' },
  { label: <Link href={`/${localActive}/${params.city}/about`}>{t('o-nas-0')}</Link>, key: 'about' },
  { label: <Link href={`/${localActive}/${params.city}/delivery`}>{t('dostavka')}</Link>, key: 'delivery' },
  { label: <Link href={`/${localActive}/${params.city}/about-pays`}>{t('oplata')}</Link>, key: 'payment' },
  { label: <Link href={`/${localActive}/${params.city}/about-our-guarantees`}>{t('nashi-garantii')}</Link>, key: 'our-guarantees' },
  { label: <Link href={`/${localActive}/${params.city}/about-why-we`}>{t('pochemu-my')}</Link>, key: 'why-we' },
  { label: <Link href={`/${localActive}/${params.city}/contact`}>{t('kontakty-0')}</Link>, key: 'contacts' },
  { label: <a onClick={() => ModalTogle()}>{t('ostavit-obrashenie')}</a>, key: 'leave-request' },
  ]

  const accountItems: MenuProps['items'] = [
    {key: '0', label: <Link href="/account">{t('akkaunt')}</Link>},
    {key: '1',label: (<Flex gap={'10px'}><span>{t('vybrat-temu')}</span><ThemeSwitcher/></Flex>)},
    {key: '2',label: (<LangSwitcher />)}
  ];

  return (
    <>
       {ModalLeaveRequestComponent()}
       <div className={styles.HeaderContainer} style={isDarkTheme} >
         <div className={styles.HeaderSelectCity}>
           <SelectCity param={params} currentCity={currentCity} Cities={Cities}/>
         </div>

         <div className={styles.HeaderMenuContainer}>
          <Menu id={styles.mobile} className={styles.HeaderMenu} items={items} />
          <Menu id={styles.desktop} className={styles.HeaderMenu} mode="horizontal" items={items} />
         </div>

         <div className={styles.HeaderAccountUser}>
           <Dropdown menu={{ items: accountItems }}>
             <div className={styles.HeaderAccountUserInfo}>
               <Space>
                 <Image src='/login.svg' alt='kabinet' width={32} height={32} />
                 {t('lichnyi-kabinet')}
                 <DownOutlined />
               </Space>
             </div>
           </Dropdown>
         </div>
       </div>
    </>
  )
}
