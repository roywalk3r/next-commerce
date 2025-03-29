import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

export default function Footer() {
    return (
      <footer className="border-t bg-muted/40">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6" />
                <span className="font-bold">ACME Store</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Your one-stop shop for premium products. Quality, style, and convenience all in one place.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
              <div>
                <h3 className="text-lg font-medium">Shop</h3>
                <nav className="mt-4 flex flex-col space-y-2 text-sm">
                  <Link href="/products" className="text-muted-foreground hover:text-foreground">
                    All Products
                  </Link>
                  <Link href="/categories/electronics" className="text-muted-foreground hover:text-foreground">
                    Electronics
                  </Link>
                  <Link href="/categories/clothing" className="text-muted-foreground hover:text-foreground">
                    Clothing
                  </Link>
                  <Link href="/categories/home-kitchen" className="text-muted-foreground hover:text-foreground">
                    Home & Kitchen
                  </Link>
                  <Link href="/categories/beauty" className="text-muted-foreground hover:text-foreground">
                    Beauty
                  </Link>
                </nav>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
              <div>
                <h3 className="text-lg font-medium">Company</h3>
                <nav className="mt-4 flex flex-col space-y-2 text-sm">
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                  <Link href="/press" className="text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </nav>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Stay Updated</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Subscribe to our newsletter for the latest products, deals, and more.
              </p>
              <form className="mt-4 flex flex-col sm:flex-row gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button type="submit">Subscribe</Button>
              </form>
              <div className="mt-4 flex space-x-4">
                <Button variant="ghost" size="icon">
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon">
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon">
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
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ACME Store. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/shipping" className="hover:text-foreground">
                Shipping Policy
              </Link>
              <Link href="/returns" className="hover:text-foreground">
                Returns Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }