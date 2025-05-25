import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { corsHeaders } from '@/constants/corsHeaders'
import { sendMail } from '@/service/mailService'

function parseMessage(message: string) {
  const [addressLine, rest] = message.split('\n\n').map(line => line.trim())

  const address = addressLine.replace('Адрес получения товара:', '').trim()
  const restData = rest.replace('Данные получателя:', '').trim()

  const firstBracket = restData.indexOf('[')
  const lastBracket = restData.lastIndexOf(']')

  const productsJson = restData.substring(firstBracket, lastBracket + 1)

  let products = []
  try {
    products = JSON.parse(productsJson)
  } catch (err) {
    products = []
  }

  const restWithoutProducts = restData.replace(productsJson, '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const recipientId = restWithoutProducts[0] || null
  const email = restWithoutProducts[1] || null
  const emailConfirmed = restWithoutProducts[2] === 'true'

  return {
    address,
    recipientId,
    products,
    email,
    emailConfirmed,
  }
}

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

    const parsedData = parseMessage(reqBody.message)

    const newOrder = {
      address: parsedData.address,
      recipientId: parsedData.recipientId,
      products: parsedData.products,
      email: parsedData.email,
      emailConfirmed: parsedData.emailConfirmed,
      createdAt: new Date(),
      status: 'new',
    }

    const { insertedId } = await db.collection('orders').insertOne(newOrder)

    const message = `<p>Спасибо за заказ</p><p>Номер вашего заказа ${parsedData.recipientId}</p><p>Адрес получения заказа ${parsedData.address}</p>`
    
    await sendMail('Annbrand', reqBody.email, message)

    return NextResponse.json(
      {
        status: 201,
        insertedId,
        order: newOrder,
      },
      corsHeaders
    )
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: (error as Error).message },
      corsHeaders
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { ...corsHeaders, status: 200 })
}
