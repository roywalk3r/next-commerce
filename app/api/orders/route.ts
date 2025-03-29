import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const { userId } = await auth()

    const orders = await prisma.order.findMany({
        where: { userId },
        include: { orderItems: true },
      })
  return NextResponse.json(orders)
}

export async function POST(req: Request) {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) return redirectToSignIn()
  
  const { totalAmount, orderItems } = await req.json()

  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      orderItems: { create: orderItems },
    },
  })

  return NextResponse.json(order, { status: 201 })
}
