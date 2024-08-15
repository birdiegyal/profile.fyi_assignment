"use client"

import { ShoppingCartIcon, StoreIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/components/cart/provider"

export default function Navbar() {

    const { items } = useCart()
    const itemsInCart = items.length
    const pathname = usePathname()
    let path: string = "", redirectTo: string = ""

    switch (pathname) {
        case "/":
            path = "Shop"
            redirectTo = "/cart"
            break
        case "/cart":
            path = "Cart"
            redirectTo = "/"
            break
        case "/checkout":
            path = "Checkout"
            redirectTo = "/"
            break
        default:
            break
    }

    return (
        <nav className="flex justify-between items-center p-4 font-bold text-3xl bg-gray-200 sticky top-0  border-b border-gray-400">
            {/* TODO: add a brand logo here when everything's done. */}
            <h1>{path}</h1>
            <Link href={redirectTo} className="relative">
                {redirectTo === "/" ? <StoreIcon size={48} className="mr-2" /> : (
                    <>
                        <ShoppingCartIcon size={48} className="mr-2" />
                        {itemsInCart !== 0 && <span className="bg-blue-600 rounded-full absolute top-0 right-0 text-xs text-white px-2 py-1">{itemsInCart}</span>}
                    </>
                )}
            </Link>
        </nav>
    )
}