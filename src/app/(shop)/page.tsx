"use client"
import ProductCard from "@/components/shop/productCard"
import products from "@api/products"
import { usePathname } from "next/navigation"
import { useCart } from "@/components/cart/provider"

export default function Shop() {
    const pathname = usePathname()
    const { items } = useCart()
    const itemsInCart = items.length

    return (
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 m-1">{
            products.map((product) => <ProductCard key={product.id} {...product} />)
        }</div >
    )
}
