import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const ContactsListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
      <li className='nav-menu__accordion__item'>
        <a
          href='tel:+79199109645'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          +7 (919) 910 96 45
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <a
          href='mailto:annbrand@gmail.com'
          className='nav-menu__accordion__item__link'
        >
          annbrand@gmail.com
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://t.me/'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.tg}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link href='https://vk.com' className='nav-menu__accordion__item__link'>
          {translations[lang].main_menu.vk}
        </Link>
      </li>
    </>
  )
}

export default ContactsListItems
