import Link from 'next/link'
import Logo from '@/components/elements/Logo/Logo'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import FooterLinks from './FooterLinks'

const Footer = () => {
  const { lang, translations } = useLang()
  const isMedia950 = useMediaQuery(950)
  const isMedia640 = useMediaQuery(640)

  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='container footer__top__container'>
          <div className='footer__logo'>
            <Logo />
          </div>
          <div className='footer__contacts'>
            <span>
              <a href='tel:+79199109645'>+7 (919) 910-96-45</a>
            </span>
            <span>
              <a href='mailto:annbrand@mail.com'>annbrand@mail.com</a>
            </span>
            {isMedia950 && <FooterLinks />}
          </div>
          {!isMedia950 && <FooterLinks />}
          <ul className='list-reset footer__socials'>
            <li className='footer__socials__item'>
              <a
                href='https://t.me'
                className='footer__socials__item__link'
              />
            </li>
            <li className='footer__socials__item'>
              <a
                href='https://vk.com'
                className='footer__socials__item__link'
              />
            </li>
            <li className='footer__socials__item'>
              <a
                href='https://youtube.com'
                className='footer__socials__item__link'
              />
            </li>
          </ul>
        </div>
      </div>
      <div className='footer__bottom'>
        <div className='container footer__bottom__container'>
          <div className='footer__copyright'>
            © 2023 ПАО {translations[lang].footer.copyright}
            <br />
            (18+)
          </div>
          <div className='footer__policy'>
            <div className='footer__policy__inner'>
              <Link href='/personal-data-policy'>
                {translations[lang].footer.policy}
              </Link>
              <Link href='/privacy-policy'>
                {translations[lang].footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
