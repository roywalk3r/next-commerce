import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const config = { runtime: 'edge' }

export async function POST(req: Request) {
    const { userId, redirectToSignIn } = await auth()

    if (!userId) return redirectToSignIn()
  const { productId } = await req.json()

  const wishlist = await prisma.wishlist.upsert({
    where: { userId },
    create: { userId, items: { create: { productId } } },
    update: { items: { create: { productId } } },
  })

  return NextResponse.json(wishlist, { status: 201 })
}
