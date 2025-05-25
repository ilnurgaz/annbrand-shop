import { useColorsFilter } from '@/hooks/useColorsFilter'
import { useLang } from '@/hooks/useLang'
import CheckboxSelectItem from '../CheckboxSelectItem'
import styles from '@/styles/catalog/index.module.scss'

const ColorsFilter = ({
  handleApplyFiltersWithColors,
}: {
  handleApplyFiltersWithColors: (sizes: string[]) => void
}) => {
  const { lang, translations } = useLang()
  const { handleSelectColor, colorsOptions } = useColorsFilter(
    handleApplyFiltersWithColors
  )

  return (
    <>
    </>
  )
}

export default ColorsFilter
