import { CartActions, CartItem } from "@/lib/types";
import { LucideBadgeCheck, MinusIcon, PlusIcon, Trash2Icon, LucideBadgeX } from "lucide-react"
import Image from "next/image";
import { useCartActions } from "@/components/cart/provider";
import { toast } from "sonner";

export default function CartItemCard(cartItem: CartItem) {

    const dispatch = useCartActions()

    function add(cartItem: CartItem) {
        dispatch({
            type: CartActions.ADD_TO_CART,
            payload: cartItem
        })
        toast(`Added 1 ${cartItem.name} to your cart`, {
            icon: <LucideBadgeCheck size={24} color="#588157" />,
            style: {
                "background": "#ccd5ae",
                "fontSize": "small"
            }
        })
    }

    function remove(cartItem: CartItem) {
        dispatch({
            type: CartActions.REMOVE_FROM_CART,
            payload: cartItem
        })
        toast(`Removed ${cartItem.quantity > 0 ? 1 : ""} ${cartItem.name} from your cart`, {
            icon: <LucideBadgeX size={24} color="#ef476f" />,
            style: {
                "background": "#f77976",
                "fontSize": "small"
            }
        })
    }

    return (
        <div className="flex flex-col">
            <div className="flex gap-2 items-start">
                <Image src={cartItem.src} alt={cartItem.desc} width={64} height={64} className="w-1/5 rounded-l-md"/>
                <div className="text-lg">
                    <h4 className="font-bold">{cartItem.name}</h4>
                    <p className="text-xs sm:text-sm">{cartItem.desc}</p>
                </div>
            </div>
            <div className="flex items-end justify-between">
                <span className="font-bold text-2xl ">INR {cartItem.price}</span>
                <div className="flex gap-2">
                    <div className="flex items-center bg-transparent/45 p-2 gap-4 rounded-md">
                        <button onClick={() => add({ ...cartItem, quantity: 1 })} className="border-r">
                            <PlusIcon size={24} />
                        </button>
                        <p className="">{cartItem.quantity}</p>
                        <button onClick={() => remove({ ...cartItem, quantity: 1 })} className="border-l">
                            <MinusIcon size={24} />
                        </button>
                    </div>
                    <button onClick={() => remove({ ...cartItem, quantity: 0 })} className="px-2">
                        <Trash2Icon size={24} color="red" />
                    </button>
                </div>
            </div>
        </div>
    )
}