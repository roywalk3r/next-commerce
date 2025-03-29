import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Quality Products for Your Lifestyle
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Shop our curated collection of premium products. Free shipping on orders over $50.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/hero.jpg"
              width={550}
              height={550}
              alt="Hero Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most popular items loved by customers worldwide.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {featuredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover transition-transform group-hover:scale-105"
                      fill
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg group-hover:underline">{product.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="font-bold">${product.price.toFixed(2)}</div>
                    <Button size="sm" variant="ghost">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Shop by Category</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse our wide selection of products by category.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {categories.map((category) => (
              <Link
                href={`/categories/${category.slug}`}
                key={category.name}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors z-10" />
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-white font-bold text-xl md:text-2xl">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to our newsletter for exclusive deals, new arrivals, and more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button>Subscribe</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                  <h3 className="font-medium">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground text-center">On orders over $50</p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <h3 className="font-medium">Satisfaction</h3>
                  <p className="text-sm text-muted-foreground text-center">100% guarantee</p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  <h3 className="font-medium">Secure Payment</h3>
                  <p className="text-sm text-muted-foreground text-center">Protected checkout</p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-primary"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m8 17 4 4 4-4" />
                  </svg>
                  <h3 className="font-medium">Easy Returns</h3>
                  <p className="text-sm text-muted-foreground text-center">30 day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const featuredProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    rating: 4,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    rating: 5,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Fitness Tracker",
    price: 89.99,
    rating: 4,
    reviews: 36,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 79.99,
    rating: 4,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300",
  },
]

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Clothing",
    slug: "clothing",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Beauty",
    slug: "beauty",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Sports",
    slug: "sports",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Books",
    slug: "books",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Toys",
    slug: "toys",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    name: "Jewelry",
    slug: "jewelry",
    image: "/placeholder.svg?height=200&width=300",
  },
]

