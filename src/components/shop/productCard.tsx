"use client"
import Image from "next/image";
import { CartActions, CartItem, Product } from "@/lib/types";
import { useCartActions } from "../cart/provider";
import { toast } from "sonner";
import { LucideBadgeCheck, LucideBadgeIndianRupee } from "lucide-react";
import { buyAction } from "@/app/actions";

export default function ProductCard(product: Product) {
    const dispatch = useCartActions()
    
    function addToCart(cartItem: CartItem) {
        dispatch({
            type: CartActions.ADD_TO_CART,
            payload: cartItem
        })
        toast("Product added to your cart.", {
            icon: <LucideBadgeCheck size={24} color="#588157" />,
            style: {
                "background": "#ccd5ae",
                "fontSize": "large"
            }
        })
    }

    async function buyNow() {
        const formdata = new FormData()
        formdata.set("discountCode", "")
        formdata.set("total", String(product.price))
        const res = await buyAction(formdata)
        if (res.valid) {
            toast(`Payment Completed: INR${res.finalTotal}`, {
                icon: <LucideBadgeIndianRupee size={24} color="#ff7900" className="mr-4" />,
                style: {
                    background: "#ffe66d",
                    fontSize: "large"
                }
            })
        }
    }

    return (
        <div>
            <Image src={product.src} alt={product.desc} className="overflow-hidden object-fill w-full rounded-t-md" width={100} height={100} />
            <div className="flex justify-between">
                <h4 className="text-ellipsis overflow-hidden text-nowrap" >{product.name}</h4>
                <p className=" font-bold">INR{product.price}</p>
            </div>
            <div className="flex items-center w-full flex-1">
                <button className="buy-btn basis-1/2" onClick={buyNow}>
                    Buy
                </button>
                <button onClick={() => addToCart({
                    quantity: 1,
                    ...product
                })} className="addtocart-btn basis-1/2">
                    To Cart
                </button>
            </div>
        </div>
    )
}