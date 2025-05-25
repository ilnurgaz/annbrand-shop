'use client'
import Image from 'next/image'
import Link from 'next/link'
import AllLink from '@/components/elements/AllLink/AllLink'
import useImagePreloader from '@/hooks/useImagePreloader'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import img1 from '@/public/img/dresses-cat.png'
import img2 from '@/public/img/t-shirt-cat.png'
import img3 from '@/public/img/jacet-cat.png'
import img4 from '@/public/img/remen-cat.png'
import styles from '@/styles/main-page/index.module.scss'
import MainSlider from '../MainSlider'

const Categories = () => {
  const { lang, translations } = useLang()
  const isMedia490 = useMediaQuery(490)
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

  const images = [
    { src: img1, id: 1, title: translations[lang].comparison.dresses },
    {
      src: img2,
      id: 2,
      title: translations[lang].comparison['t-shirts'],
    },
    {
      src: img3,
      id: 3,
      title: translations[lang].comparison.jaket,
    },
    { src: img4, id: 4, title: translations[lang].comparison.belts },
  ]

  return (
    <section className={styles.categories}>
      <div className={`container ${styles.categories__container}`}>
        <h2 className={`site-title ${styles.categories__title}`}>
          {translations[lang].main_page.category_title}
        </h2>
        <div className={styles.categories__inner}>
          <AllLink />
          {!isMedia490 && (
            <>
              <Link
                href='/catalog/cloth?offset=0&type=dresses'
                className={`${styles.categories__right} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={img1}
                  alt='Dresses'
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                />
                <span>{translations[lang].comparison.dresses}</span>
              </Link>
              <div className={styles.categories__left}>
                <div className={styles.categories__left__top}>
                  <Link
                    href='/catalog/cloth?offset=0&type=t-shirts'
                    className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img2}
                      alt='T-shirts'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>
                      {translations[lang].comparison['t-shirts']}
                    </span>
                  </Link>
                  <Link
                    href='/catalog/cloth?offset=0&type=jaket'
                    className={`${styles.categories__left__top__left} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img3}
                      alt='Jaket'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>
                      {translations[lang].comparison.jaket}
                    </span>
                  </Link>
                </div>
                <Link
                  href='/catalog/cloth?offset=0&type=belts'
                  className={`${styles.categories__left__bottom} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={img4}
                    alt='Belts'
                    className='transition-opacity opacity-0 duration'
                    onLoad={handleLoadingImageComplete}
                  />
                  <span>{translations[lang].comparison.belts}</span>
                </Link>
              </div>
            </>
          )}
          {isMedia490 && <MainSlider images={images} />}
        </div>
      </div>
    </section>
  )
}

export default Categories
