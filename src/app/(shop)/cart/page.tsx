"use client"
import { usePathname, useRouter } from "next/navigation";
import { useCart, useCartActions } from "@/components/cart/provider";
import CartItemCard from "@/components/cart/cartItemCard"
import { toast } from "sonner";
import { LucideTicketX, LucideBadgeIndianRupee } from "lucide-react"
import { buyAction } from "@/app/actions";
import { CartActions } from "@/lib/types";

export default function Cart() {
    const pathname = usePathname()
    const router = useRouter()
    const { items, total } = useCart()
    const dispatch = useCartActions()

    async function handleSubmit(formdata: FormData) {
        formdata.set("total", String(total))
        const res = await buyAction(formdata)
        if (res.valid) {
            toast(`Payment Completed: INR${res.finalTotal}`, {
                icon: <LucideBadgeIndianRupee size={24} color="#ff7900" className="mr-4" />,
                style: {
                    background: "#ffe66d",
                    fontSize: "large"
                }
            })
            // TODO: reset the cart.
            dispatch({
                type: CartActions.EMPTY_CART,
                // this is a dummy payload. we just got to pass it. not even using it anywhere.
                // TODO: make the CartActions design not require it.
                payload: { quantity: 0, desc: "", id: "", name: "", price: 0, src: "" }
            })

            router.push("/")
        } else {
            toast("Incorrect Discount Code", {
                icon: <LucideTicketX size={24} color="#ef233c" />,
                style: {
                    background: "#f1faee",
                    fontSize: "large"
                }
            })
        }
    }

    return (
        <div className="relative">
            <div className="p-2 gap-2 flex flex-col overflow-y-auto">
                {total > 0 ? items.map((item) => <CartItemCard key={item.id} {...item} />) : <div className="text-lg text-muted text-center mt-24">No item added in you Cart</div>}
            </div>
            {
                total > 0 &&
                // TODO: add a input for discount.
                <div className="flex flex-col bg-gray-200 border-t border-gray-400">
                    <footer className="sm:p-2 sticky bottom-0 font-bold text-lg p-2">
                        <form action={handleSubmit} className="flex w-full justify-around sm:justify-between items-center gap-2">
                            {`Total: ${total}`}
                            <input type="text" name="discountCode" id="discountField" placeholder="Discount code" className="py-2 px-4 text-gray-900 rounded-md w-1/2" defaultValue={""} />
                            <button type="submit" className="buy-btn rounded-md">Buy</button>
                        </form>
                    </footer>
                </div>
            }
        </div>
    )
}