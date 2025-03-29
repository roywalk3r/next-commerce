"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [sameAddress, setSameAddress] = useState(true)

  const subtotal = 179.97
  const shipping = 0
  const tax = 12.6
  const total = subtotal + shipping + tax

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link
          href="/cart"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to cart
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-muted-foreground mt-1">
                Complete your order by providing your shipping and payment details.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Street address</Label>
                  <Input id="address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="postal-code">Postal code</Label>
                    <Input id="postal-code" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Billing Address</h2>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="same-address"
                    checked={sameAddress}
                    onCheckedChange={(checked) => setSameAddress(checked as boolean)}
                  />
                  <Label htmlFor="same-address" className="text-sm font-normal">
                    Same as shipping address
                  </Label>
                </div>
              </div>

              {!sameAddress && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="billing-first-name">First name</Label>
                      <Input id="billing-first-name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-last-name">Last name</Label>
                      <Input id="billing-last-name" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="billing-address">Street address</Label>
                    <Input id="billing-address" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="billing-apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="billing-apartment" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="grid gap-2">
                      <Label htmlFor="billing-city">City</Label>
                      <Input id="billing-city" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-state">State / Province</Label>
                      <Input id="billing-state" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-postal-code">Postal code</Label>
                      <Input id="billing-postal-code" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="billing-country">Country</Label>
                    <Input id="billing-country" defaultValue="United States" />
                  </div>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <Tabs defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  <TabsTrigger value="apple-pay">Apple Pay</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card" className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Card number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiration">Expiration date</Label>
                        <Input id="expiration" placeholder="MM / YY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name-on-card">Name on card</Label>
                      <Input id="name-on-card" placeholder="John Doe" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="pt-4">
                  <div className="flex flex-col items-center justify-center space-y-4 py-4">
                    <div className="rounded-full bg-muted p-6">
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
                        className="h-6 w-6 text-primary"
                      >
                        <path d="M17.5 7H17a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v.5" />
                        <path d="M3 7v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7Z" />
                        <path d="M7 15a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2Z" />
                      </svg>
                    </div>
                    <p className="text-center text-muted-foreground">
                      You will be redirected to PayPal to complete your purchase securely.
                    </p>
                    <Button className="w-full">Continue with PayPal</Button>
                  </div>
                </TabsContent>
                <TabsContent value="apple-pay" className="pt-4">
                  <div className="flex flex-col items-center justify-center space-y-4 py-4">
                    <div className="rounded-full bg-muted p-6">
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
                        className="h-6 w-6 text-primary"
                      >
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                        <path d="M10 2c1 .5 2 2 2 5" />
                      </svg>
                    </div>
                    <p className="text-center text-muted-foreground">
                      You will be redirected to Apple Pay to complete your purchase securely.
                    </p>
                    <Button className="w-full">Continue with Apple Pay</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Premium Wireless Headphones × 1</span>
                  <span>$129.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Cotton T-Shirt × 2</span>
                  <span>$49.98</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Place Order
              </Button>
              <div className="flex items-center justify-center text-xs text-muted-foreground">
                <ShieldCheck className="mr-1 h-4 w-4" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

