"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id) || products[0]
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [mainImage, setMainImage] = useState(product.images[0])

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>{product.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Product Images */}
        <div className="space-y-4 lg:col-span-2">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-md border ${
                  mainImage === image ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setMainImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              {product.inStock ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <Separator />

          {/* Color Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Color: {selectedColor}</span>
            </div>
            <RadioGroup
              defaultValue={product.colors[0]}
              value={selectedColor}
              onValueChange={setSelectedColor}
              className="flex gap-2"
            >
              {product.colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${color}`}
                    className={`h-8 w-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Size: {selectedSize}</span>
              <Button variant="link" className="p-0 h-auto text-sm">
                Size Guide
              </Button>
            </div>
            <RadioGroup
              defaultValue={product.sizes[0]}
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="grid grid-cols-4 gap-2"
            >
              {product.sizes.map((size) => (
                <div key={size}>
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-md border text-sm font-medium ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background"
                    }`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <span className="font-medium">Quantity</span>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart & Wishlist */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" size="lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Free shipping</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Free standard shipping on orders over $50. Delivery time: 3-5 business days.
            </p>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Share:</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                className="h-4 w-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                className="h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b pb-2">
                  <span className="w-1/2 font-medium">{key}</span>
                  <span className="w-1/2">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-6">
              {product.customerReviews.map((review, index) => (
                <div key={index} className="border-b pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group">
              <div className="overflow-hidden rounded-lg border transition-all hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:underline">{product.name}</h3>
                  <div className="mt-1 flex items-center">
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
                  </div>
                  <div className="mt-2 font-bold">${product.price.toFixed(2)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to get color hex codes
function getColorHex(color: string) {
  const colorMap: Record<string, string> = {
    Black: "#000000",
    White: "#FFFFFF",
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Yellow: "#FFFF00",
    Purple: "#800080",
    Gray: "#808080",
  }
  return colorMap[color] || "#CCCCCC"
}

// Sample data
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 129.99,
    rating: 4,
    reviews: 42,
    category: "Electronics",
    colors: ["Black", "White", "Blue", "Red"],
    sizes: ["One Size"],
    inStock: true,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "Experience premium sound quality with our wireless headphones. These headphones feature active noise cancellation, long battery life, and a comfortable over-ear design for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Foldable design for easy storage",
      "Premium memory foam ear cushions",
    ],
    specifications: {
      "Battery Life": "40 hours",
      "Bluetooth Version": "5.0",
      "Charging Time": "2 hours",
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Weight: "250g",
      Warranty: "1 year",
    },
    customerReviews: [
      {
        name: "John D.",
        rating: 5,
        date: "March 15, 2023",
        comment:
          "These headphones are amazing! The sound quality is excellent and the noise cancellation works really well. Battery life is impressive too.",
      },
      {
        name: "Sarah M.",
        rating: 4,
        date: "February 28, 2023",
        comment:
          "Very comfortable to wear for long periods. Sound is great but bass could be a bit stronger. Overall very satisfied with my purchase.",
      },
      {
        name: "Michael T.",
        rating: 3,
        date: "January 10, 2023",
        comment:
          "Good headphones but the ear cups started to wear after a few months of use. Sound quality is good though.",
      },
    ],
  },
]

const relatedProducts = [
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    rating: 5,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Fitness Tracker",
    price: 89.99,
    rating: 4,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 79.99,
    rating: 4,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 149.99,
    rating: 4,
    image: "/placeholder.svg?height=300&width=300",
  },
]

