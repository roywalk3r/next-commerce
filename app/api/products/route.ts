import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true , eviews: true},
  })
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const { name, description, price, stock, categoryId, images } = await req.json()

  const product = await prisma.product.create({
    data: { name, description, price, stock, categoryId, images },
  })

  return NextResponse.json(product, { status: 201 })
}
