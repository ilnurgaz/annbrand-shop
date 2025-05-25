/* eslint-disable indent */
'use client'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/types/catalog'
import { basePropsForMotion } from '@/constants/motion'
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import { useLang } from '@/hooks/useLang'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import { setCatalogCategoryOptions } from '@/context/catalog'
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFilters'
import { useWatchedProducts } from '@/hooks/useWatchedProducts'
import WatchedProducts from '@/components/modules/WatchedProducts/WatchedProducts'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const { lang, translations } = useLang()
  const {
    products,
    productsSpinner,
    paginationProps,
    handlePageChange,
    handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithSizes,
    handleApplyFiltersWithColors,
    handleApplyFiltersBySort,
  } = useProductFilters(searchParams, pageName, pageName === 'catalog')
  const { watchedProducts } = useWatchedProducts()

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
          rootCategoryOptions: [
            {
              id: 2,
              title: translations[lang].comparison.dresses,
              href: '/catalog/cloth?offset=0&type343=dresses/',
            },
            {
              id: 3,
              title: translations[lang].comparison['t-shirts'],
              href: '/catalog/cloth?offset=0&type=t-shirts/',
            },
            {
              id: 4,
              title: translations[lang].comparison.jaket,
              href: '/catalog/cloth?offset=0&type=jaket/',
            },
            {
              id: 5,
              title: translations[lang].comparison.summer,
              href: '/catalog/cloth?offset=0&type=summer/',
            },
            {
              id: 6,
              title: translations[lang].comparison.belts,
              href: '/catalog/cloth?offset=0&type=belts/',
            },
            {
              id: 7,
              title: translations[lang].comparison.bags,
              href: '/catalog/cloth?offset=0&type=bags/',
            },
            {
              id: 8,
              title: translations[lang].comparison.glasses,
              href: '/catalog/cloth?offset=0&type=glasses/',
            },
          ],
        })
        break
      case 'accessories':
        setCatalogCategoryOptions({
          accessoryCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison.bags,
              filterHandler: () => handleApplyFiltersWithCategory('bags'),
            },
            {
              id: 2,
              title: translations[lang].comparison.belts,
              filterHandler: () => handleApplyFiltersWithCategory('belts'),
            },
            {
              id: 3,
              title: translations[lang].comparison.glasses,
              filterHandler: () => handleApplyFiltersWithCategory('glasses'),
            },
          ],
        })
        break
      case 'cloth':
        setCatalogCategoryOptions({
          clothCategoryOptions: [
            {
              id: 1,
              title: translations[lang].comparison['dresses'],
              filterHandler: () => handleApplyFiltersWithCategory('dresses'),
            },
            {
              id: 2,
              title: translations[lang].comparison['t-shirts'],
              filterHandler: () =>
                handleApplyFiltersWithCategory('t-shirts'),
            },
            {
              id: 3,
              title: translations[lang].comparison.jaket,
              filterHandler: () => handleApplyFiltersWithCategory('jaket'),
            },
            {
              id: 4,
              title: translations[lang].comparison.summer,
              filterHandler: () => handleApplyFiltersWithCategory('summer'),
            },
            {
              id: 5,
              title: translations[lang].comparison.bags,
              filterHandler: () => handleApplyFiltersWithCategory('bags'),
            },
            {
              id: 6,
              title: translations[lang].comparison.belts,
              filterHandler: () => handleApplyFiltersWithCategory('belts'),
            },
            {
              id: 8,
              title: translations[lang].comparison.glasses,
              filterHandler: () => handleApplyFiltersWithCategory('glasses'),
            },
          ],
        })
        break
      default:
        break
    }
  }, [lang])

  return (
    <>
      <HeadingWithCount
        count={products.count}
        title={
          (translations[lang].breadcrumbs as { [index: string]: string })[
            pageName
          ]
        }
        spinner={productsSpinner}
      />
      <CatalogFilters
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        handleApplyFiltersWithColors={handleApplyFiltersWithColors}
        handleApplyFiltersBySort={handleApplyFiltersBySort}
      />
      {productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(12)).map((_, i) => (
            <li key={i} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}
      {!productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={`list-reset ${styles.catalog__list}`}
        >
          {(products.items || []).map((item) => (
            <ProductsListItem key={item._id} item={item} />
          ))}
        </motion.ul>
      )}
      {!products.items?.length && !productsSpinner && (
        <div className={styles.catalog__list__empty}>
          {translations[lang].common.nothing_is_found}
        </div>
      )}
      <div className={styles.catalog__bottom}>
        <ReactPaginate
          {...paginationProps}
          nextLabel={<span>{translations[lang].catalog.next_page}</span>}
          previousLabel={
            <span>{translations[lang].catalog.previous_page}</span>
          }
          onPageChange={handlePageChange}
        />
      </div>
      {!!watchedProducts.items?.length && (
        <WatchedProducts watchedProducts={watchedProducts} />
      )}
    </>
  )
}

export default ProductsPage
