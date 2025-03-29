"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CreditCard, LogOut, Package, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=64&width=64" alt="Profile picture" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
            <Separator />
            <nav className="flex flex-col space-y-1">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "payment" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Separator />
              <Button variant="ghost" className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" defaultValue="(123) 456-7890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Main St" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="New York" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="NY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" defaultValue="10001" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="rounded-lg border p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">Order #{order.id}</h3>
                              <Badge variant={getOrderStatusVariant(order.status)}>{order.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on {order.date} • {order.items} items • ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/account/orders/${order.id}`}>View Order</Link>
                            </Button>
                            {order.status === "Delivered" && (
                              <Button variant="outline" size="sm">
                                Buy Again
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                          {order.products.map((product, index) => (
                            <div key={index} className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-muted p-2">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Default</Badge>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account Settings</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="jpy">JPY (¥)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Change Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order updates</p>
                        <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="order-email" className="text-sm">
                          Email
                        </Label>
                        <input
                          type="checkbox"
                          id="order-email"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <Label htmlFor="order-sms" className="text-sm">
                          SMS
                        </Label>
                        <input
                          type="checkbox"
                          id="order-sms"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotions and deals</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about promotions and deals
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="promo-email" className="text-sm">
                          Email
                        </Label>
                        <input
                          type="checkbox"
                          id="promo-email"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <Label htmlFor="promo-sms" className="text-sm">
                          SMS
                        </Label>
                        <input
                          type="checkbox"
                          id="promo-sms"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Account activity</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about your account activity
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="account-email" className="text-sm">
                          Email
                        </Label>
                        <input
                          type="checkbox"
                          id="account-email"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <Label htmlFor="account-sms" className="text-sm">
                          SMS
                        </Label>
                        <input
                          type="checkbox"
                          id="account-sms"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function to get badge variant based on order status
function getOrderStatusVariant(status: string) {
  switch (status) {
    case "Processing":
      return "secondary"
    case "Shipped":
      return "default"
    case "Delivered":
      return "outline"
    case "Cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

// Sample data
const orders = [
  {
    id: "ORD-12345",
    date: "March 15, 2023",
    status: "Delivered",
    items: 3,
    total: 204.97,
    products: [
      {
        name: "Wireless Headphones",
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "Cotton T-Shirt",
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "Smart Watch",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    id: "ORD-67890",
    date: "February 28, 2023",
    status: "Shipped",
    items: 2,
    total: 129.98,
    products: [
      {
        name: "Bluetooth Speaker",
        image: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "Fitness Tracker",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    id: "ORD-54321",
    date: "January 15, 2023",
    status: "Processing",
    items: 1,
    total: 49.99,
    products: [
      {
        name: "Coffee Maker",
        image: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
]

