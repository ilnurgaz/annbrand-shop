import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { corsHeaders } from '@/constants/corsHeaders'
import { ObjectId } from 'mongodb'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

    const isValidId = ObjectId.isValid(reqBody.id as string)
    if (!isValidId) {
      return NextResponse.json(
        {
          message: 'Wrong order id',
          status: 400,
        },
        corsHeaders
      )
    }

    const order = await db.collection('orders').findOne({ _id: new ObjectId(reqBody.id) })

    if (!order) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Заказ не найден',
        },
        corsHeaders
      )
    }

    await db.collection('orders').updateOne(
      { _id: new ObjectId(reqBody.id) },
      {
        $set: {
          status: reqBody.status,
        },
      }
    )

    const updatedOrder = await db.collection('orders').findOne({ _id: new ObjectId(reqBody.id) })

    return NextResponse.json(
        {
          status: 200,
          updatedOrder,
        },
        corsHeaders
      )
    
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        message: (error as Error).message,
      },
      corsHeaders
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { ...corsHeaders, status: 200 })
}
