import { useMemo } from 'react'
import { idGenerator } from '@/lib/utils/common'
import { IProduct } from '@/types/common'

export const useProductImages = (product: IProduct) => {
  const images = useMemo(() => {
    const makeImagesObjects = (imagesArray: string[]) =>
      imagesArray.map((item) => ({
        src: item,
        alt: product.name,
        id: idGenerator(),
      }))

    if (product.images.length < 4) {
      const images: string[] = []

      for (let i = 0; i < 4; i++) {
        images.push(product.images[0].url) 
      }

      return makeImagesObjects(images)
    }

    return makeImagesObjects(product.images.map(image => image.url))
  }, [product.images, product.name])

  return images
}
