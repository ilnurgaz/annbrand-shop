import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'
import {
  getAnnbrandOfficesByCityFx,
  setChosenPickupAddressData,
  setShouldLoadAnnbrandData,
  setShouldShowCourierAddressData,
} from '@/context/order'
import {
  $chosenPickupAddressData,
  $annbrandDataByCity,
  $shouldLoadAnnbrandData,
} from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import { useTTMap } from '@/hooks/useTTMap'
import { IAddressesListProps, IAnnbrandAddressData } from '@/types/order'
import PickupAddressItem from './PickupAddressItem'
import styles from '@/styles/order/index.module.scss'

const AddressesList = ({
  listClassName,
  handleSelectAddressByMarkers,
}: IAddressesListProps) => {
  const { lang, translations } = useLang()
  const annbrandDataByCity = useUnit($annbrandDataByCity)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const shouldLoadAnnbrandData = useUnit($shouldLoadAnnbrandData)
  const { handleSelectAddress } = useTTMap()
  const loadAnnbrandDataSpinner = useUnit(
    getAnnbrandOfficesByCityFx.pending
  )

  const handleChosenAddressData = (data: Partial<IAnnbrandAddressData>) => {
    setShouldLoadAnnbrandData(false)
    setChosenPickupAddressData(data)
    setShouldShowCourierAddressData(false)
  }

  return (
    <>
      {shouldLoadAnnbrandData && (
        <>
          {loadAnnbrandDataSpinner && (
            <span
              className={styles.order__list__item__delivery__inner__spinner}
            >
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
            </span>
          )}
          {!loadAnnbrandDataSpinner && (
            <ul className={`list-reset ${listClassName}`}>
              {annbrandDataByCity?.length ? (
                annbrandDataByCity.map((item) => (
                  <PickupAddressItem
                    key={item.place_id}
                    addressItem={item}
                    handleChosenAddressData={handleChosenAddressData}
                    handleSelectAddress={
                      handleSelectAddressByMarkers || handleSelectAddress
                    }
                  />
                ))
              ) : (
                <span>{translations[lang].common.nothing_is_found}</span>
              )}
            </ul>
          )}
        </>
      )}
      {!!chosenPickupAddressData.address_line1 && !shouldLoadAnnbrandData && (
        <div className={styles.order__list__item__delivery__pickup__choose}>
          <span>{chosenPickupAddressData.address_line1}</span>
          <span>
            {chosenPickupAddressData.address_line2},{' '}
            {chosenPickupAddressData.city}
          </span>
        </div>
      )}
    </>
  )
}

export default AddressesList
