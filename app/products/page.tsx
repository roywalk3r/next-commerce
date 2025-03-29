"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter, Search, ShoppingBag, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Filter products based on search query, categories, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "rating":
        return b.rating - a.rating
      default:
        return a.id.localeCompare(b.id) // featured/default
    }
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-muted-foreground">Browse our collection of premium products</p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>Narrow down products by category, price, and more.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="grid gap-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceRange([0, 1000])
                    }}
                  >
                    Reset
                  </Button>
                  <Button>Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Sort: {getSortLabel(sortOption)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption("featured")}>Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-low")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-high")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest Arrivals</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("rating")}>Highest Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
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
                    <p className="text-sm text-muted-foreground">{product.category}</p>
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
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategories([])
                setPriceRange([0, 1000])
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function getSortLabel(option: string) {
  switch (option) {
    case "price-low":
      return "Price: Low to High"
    case "price-high":
      return "Price: High to Low"
    case "newest":
      return "Newest"
    case "rating":
      return "Rating"
    default:
      return "Featured"
  }
}

// Sample data
const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Sports", "Books", "Toys", "Jewelry"]

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    rating: 4,
    reviews: 42,
    category: "Electronics",
    date: "2023-05-15",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    rating: 5,
    reviews: 87,
    category: "Electronics",
    date: "2023-06-20",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Fitness Tracker",
    price: 89.99,
    rating: 4,
    reviews: 36,
    category: "Electronics",
    date: "2023-04-10",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 79.99,
    rating: 4,
    reviews: 28,
    category: "Electronics",
    date: "2023-07-05",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Cotton T-Shirt",
    price: 24.99,
    rating: 4,
    reviews: 56,
    category: "Clothing",
    date: "2023-03-15",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Slim Fit Jeans",
    price: 49.99,
    rating: 4,
    reviews: 42,
    category: "Clothing",
    date: "2023-02-28",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "7",
    name: "Kitchen Mixer",
    price: 149.99,
    rating: 5,
    reviews: 31,
    category: "Home & Kitchen",
    date: "2023-01-10",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "8",
    name: "Coffee Maker",
    price: 89.99,
    rating: 4,
    reviews: 47,
    category: "Home & Kitchen",
    date: "2023-04-22",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "9",
    name: "Face Moisturizer",
    price: 34.99,
    rating: 4,
    reviews: 38,
    category: "Beauty",
    date: "2023-05-30",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "10",
    name: "Yoga Mat",
    price: 29.99,
    rating: 4,
    reviews: 25,
    category: "Sports",
    date: "2023-06-15",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "11",
    name: "Bestselling Novel",
    price: 19.99,
    rating: 5,
    reviews: 64,
    category: "Books",
    date: "2023-07-01",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "12",
    name: "Building Blocks Set",
    price: 39.99,
    rating: 4,
    reviews: 29,
    category: "Toys",
    date: "2023-03-10",
    image: "/placeholder.svg?height=300&width=300",
  },
]

