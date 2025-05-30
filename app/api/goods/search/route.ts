import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

    const getFilteredGoods = async (field: string, collection: string) => {
      const goods = await db
        .collection(collection)
        .find({
          ...(reqBody.search && {
            [field]: {
              $regex: `(s+${reqBody.search}|^${reqBody.search})`,
              $options: 'i',
            },
          }),
        })
        .toArray()

      return goods
    }

    const getGoodsByCollection = async (collection: string) => {
      const [goodsByType, goodsByCategory, goodsByName] =
        await Promise.allSettled([
          getFilteredGoods('type', collection),
          getFilteredGoods('category', collection),
          getFilteredGoods('name', collection),
        ])

      if (
        goodsByType.status !== 'fulfilled' ||
        goodsByCategory.status !== 'fulfilled' ||
        goodsByName.status !== 'fulfilled'
      ) {
        return []
      }

      return [
        ...goodsByType.value,
        ...goodsByCategory.value,
        ...goodsByName.value,
      ]
    }

    const [cloth, accessories] = await Promise.allSettled([
      getGoodsByCollection('cloth'),
      getGoodsByCollection('accessories'),
    ])

    if (
      cloth.status !== 'fulfilled' ||
      accessories.status !== 'fulfilled'
    ) {
      return NextResponse.json({
        count: 0,
        items: [],
      })
    }

    const allGoods = [
      ...cloth.value,
      ...accessories.value,
     
    ]

    return NextResponse.json({
      count: allGoods.length,
      items: allGoods,
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
