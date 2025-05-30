'use client'
import { useUnit } from 'effector-react'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { checkPaymentFx, paymentNotifyFx } from '@/context/order'
import { useLang } from '@/hooks/useLang'
import { handleDeleteAllFromCart } from '@/lib/utils/cart'
import { formatPrice, isUserAuth } from '@/lib/utils/common'
import { IPaymentData } from '@/types/order'
import WatchedProducts from '@/components/modules/WatchedProducts/WatchedProducts'
import { useWatchedProducts } from '@/hooks/useWatchedProducts'
import styles from '@/styles/payment-success/index.module.scss'
import { $user } from '@/context/user/state'

export default function Favorites() {
  const { lang, translations } = useLang()
  const spinner = useUnit(checkPaymentFx.pending)
  const [paymentData, setPaymentData] = useState<IPaymentData>(
    {} as IPaymentData
  )
  const [pageSpinner, setPageSpinner] = useState(true)
  const { watchedProducts } = useWatchedProducts()
  const user = useUnit($user)


  useEffect(() => {
    if (!localStorage.getItem('paymentId')) {
      setPageSpinner(false)
      notFound()
    }

    

    getPaymentData()
  }, [])

  useEffect(() => {

    if (paymentData.status === 'succeeded' && user.email) {
      let description = paymentData.description || 'Успешный платёж'
      let productDetails = ''
      let totalAmount = paymentData.amount?.value || '0.00'
  
      if (paymentData.metadata?.products && Array.isArray(paymentData.metadata.products)) {
        const products = paymentData.metadata.products as Array<{
          name: string
          size?: string
          price: string
        }>
  
        productDetails = products
          .map((product, index) => {
            return `${index + 1}) ${product.name}${product.size ? `, размер: ${product.size}` : ''}, цена: ${product.price}₽`
          })
          .join('\n')
  
        description += `\n\nСписок товаров:\n${productDetails}`
        description += `\n\nОбщая сумма: ${totalAmount}₽`
      }
  
      if (paymentData.metadata && Object.values(paymentData.metadata).some(item => typeof item === 'string')) {
        const recipientData = Object.values(paymentData.metadata)
          .filter((item) => typeof item === 'string' && !['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(item)))
          .join(', ')
        description += `\n\nДанные получателя: ${recipientData}`
      }
  
      paymentNotifyFx({ email: user.email, message: description })
    }
  }, [paymentData.description, user.email])

  const getPaymentData = async () => {
    const paymentId = JSON.parse(localStorage.getItem('paymentId') as string)

    if (!paymentData || !isUserAuth()) {
      window.location.href = '/'
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const data = await checkPaymentFx({ paymentId })

    if (data) {
      if (data.result.status === 'succeeded') {
        handleDeleteAllFromCart(auth.accessToken)
        setPaymentData(data.result)
        setPageSpinner(false)
        localStorage.removeItem('paymentId')
      }
    }
  }


  return (
    <main>
      {pageSpinner ? (
        <span className={styles.payment_success__spinner}>
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='4x' />
        </span>
      ) : (
        <>
          <section className={styles.payment_success}>
            <div className={`container ${styles.payment_success__container}`}>
              <span className={styles.payment_success__bg}>
                {translations[lang].payment_success.thanks}
              </span>
              <div className={styles.payment_success__inner}>
                <h1 className={styles.payment_success__heading}>
                  {translations[lang].payment_success.thanks_text}
                </h1>
                <p
                  className={styles.payment_success__info}
                  dangerouslySetInnerHTML={{
                    __html: spinner
                      ? translations[lang].common.loading
                      : `${translations[lang].payment_success.order_info
                        .replace(
                          '1-info',
                          `<span className=${styles.payment_success__num}>№${paymentData.id}</span>`
                        )
                        .replace(
                          '2-info',
                          `<span className=${styles.payment_success__price}>
                      ${formatPrice(+(paymentData.amount?.value || 0)).replace(
          /\s/g,
          '\u00A0'
        )}\u00A0₽
                    </span>`
                        )}`,
                  }}
                />
                <p
                  className={styles.payment_success__description}
                  dangerouslySetInnerHTML={{
                    __html:
                      translations[lang].payment_success.order_description,
                  }}
                />
                <div className={styles.payment_success__actions}>
                  <Link
                    href='/catalog/cloth'
                    className={styles.payment_success__actions__link}
                  >
                    {translations[lang].payment_success.continue_shopping}
                  </Link>
                  <Link
                    href='/'
                    className={styles.payment_success__actions__link}
                  >
                    {translations[lang].payment_success.go_main}
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className='container'>
              {!!watchedProducts.items?.length && (
                <WatchedProducts watchedProducts={watchedProducts} />
              )}
            </div>
          </section>
        </>
      )}
    </main>
  )
}
