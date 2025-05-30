'use client'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { closeCatalogMenu } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useMenuAnimation } from '@/hooks/useMenuAnimation'
import Header from './Header'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogMenuButton from './CatalogMenuButton'
import CatalogMenuList from './CatalogMenuList'
import Accordion from '../Accordion/Accordion'
import { $catalogMenuIsOpen } from '@/context/modals/state'

const CatalogMenu = () => {
  const catalogMenuIsOpen = useUnit($catalogMenuIsOpen)
  const [activeListId, setActiveListId] = useState(0)
  const { lang, translations } = useLang()
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
    2,
    catalogMenuIsOpen
  )
  const isMedia450 = useMediaQuery(450)

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeCatalogMenu()
    setActiveListId(0)
  }

  const isActiveList = (id: number) => activeListId === id

  const items = [
    {
      name: translations[lang].main_menu.cloth,
      id: 1,
      items: [
        {
          title: translations[lang].comparison['dresses'],
          href: '/catalog/cloth?offset=0&type=dresses',
          handleCloseMenu
        },
        {
          title: translations[lang].comparison['t-shirts'],
          href: '/catalog/cloth?offset=0&type=t-shirts',

        },
        {
          title: translations[lang].comparison.jaket,
          href: '/catalog/cloth?offset=0&type=jaket',
          handleCloseMenu
        },
        {
          title: translations[lang].comparison.bags,
          href: '/catalog/cloth?offset=0&type=bags',
          handleCloseMenu
        },
        {
          title: translations[lang].comparison.belts,
          href: '/catalog/cloth?offset=0&type=belts',
          handleCloseMenu
        },
        {
          title: translations[lang].comparison.glasses,
          href: '/catalog/cloth?offset=0&type=glasses',
          handleCloseMenu
        },
      ],
      handler: () => setActiveListId(1),
    },
    {
      name: translations[lang].main_menu.accessories,
      id: 2,
      items: [
        {
          title: translations[lang].comparison.belts,
          href: '/catalog/cloth?offset=0&type=belts',
          handleCloseMenu
        },
        {
          title: translations[lang].comparison.bags,
          href: '/catalog/cloth?offset=0&type=bags',
          handleCloseMenu
        },
        {
          title: translations[lang].comparison.glasses,
          href: '/catalog/cloth?offset=0&type=glasses',
          handleCloseMenu
        },
      ],
      handler: () => setActiveListId(2),
    },
  ]
  return (
    <div className='catalog-menu' style={{ zIndex: popupZIndex }}>
      <AnimatePresence>
        {catalogMenuIsOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className='catalog-menu__aside'
          >
            <div className='catalog-menu__header'>
              <Header />
            </div>
            <motion.div
              className='catalog-menu__inner'
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <motion.button
                className='btn-reset catalog-menu__close'
                variants={itemVariants}
                onClick={handleCloseMenu}
              />
              <motion.h2
                variants={itemVariants}
                className='catalog-menu__title'
              >
                {translations[lang].main_menu.catalog}
              </motion.h2>
              <ul className='list-reset catalog-menu__list'>
                {items.map(({ id, name, items, handler }) => {
                  const buttonProps = (isActive: boolean) => ({
                    handler: handler as VoidFunction,
                    name,
                    isActive,
                  })

                  const isCurrentList = (
                    showList: boolean,
                    currentId: number
                  ) => showList && id === currentId

                  return (
                    <motion.li
                      key={id}
                      variants={itemVariants}
                      className='catalog-menu__list__item'
                    >
                      {!isMedia450 && (
                        <>
                          {id === 1 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(1))}
                            />
                          )}
                          {id === 2 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(2))}
                            />
                          )}
                          {id === 3 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(3))}
                            />
                          )}
                          {id === 4 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(4))}
                            />
                          )}
                        </>
                      )}
                      {isMedia450 && (
                        <Accordion
                          title={name}
                          titleClass='btn-reset nav-menu__accordion__item__title'
                        >
                          <ul className='list-reset catalog__accordion__list'>
                            {items.map((item, i) => (
                              <li
                                key={i}
                                className='catalog__accordion__list__item'
                              >
                                <Link
                                  href={item.href}
                                  className='nav-menu__accordion__item__list__item__link'
                                  onClick={item.handleCloseMenu}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion>
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CatalogMenu
