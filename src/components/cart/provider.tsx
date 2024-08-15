"use client"
import { createContext, useContext, useReducer } from "react";
import type { Dispatch } from "react";
import { Cart, CartItem, CartActions, TDispatchAction } from "@/lib/types";

const initCartState: Cart = {
    items: [],
    total: 0
}

const CartContext = createContext<Cart>(initCartState)
const CartActionContext = createContext<Dispatch<TDispatchAction>>(() => { })

const cartReducer = (state: typeof initCartState, action: TDispatchAction) => {
    let multiple: number
    switch (action.type) {
        case CartActions.ADD_TO_CART:
            multiple = state.items.findIndex(item => item.id === action.payload.id)

            // if items exist already, increase the quantity
            if (multiple !== -1) {
                return {
                    ...state,
                    items: state.items.with(multiple, { ...action.payload, quantity: state.items[multiple].quantity + 1 }),
                    total: state.total + (action.payload.price * action.payload.quantity)
                }
            } else {
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    total: state.total + (action.payload.price * action.payload.quantity)
                }
            };
        case CartActions.REMOVE_FROM_CART:

            multiple = state.items.findIndex(item => item.id === action.payload.id)
            // if quantity if 0, then we have to remove the item completely from the items.
            const itemQuantity = action.payload.quantity && state.items[multiple].quantity

            // if items with quantity > 1 exist, substract the quantity
            if (multiple !== -1 && itemQuantity > 1) {
                return {
                    ...state,
                    items: state.items.with(multiple, { ...action.payload, quantity: itemQuantity - 1 }),
                    total: state.total - (action.payload.price)
                }
            } else {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id),
                    total: state.total - (action.payload.price * state.items[multiple].quantity)
                }
            };

        case CartActions.EMPTY_CART:
            return {
                items: [],
                total: 0
            }

        default:
            return state;
    }
};

export default function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [cartState, dispatch] = useReducer(cartReducer, initCartState);

    return (
        <CartContext.Provider value={cartState}>
            <CartActionContext.Provider value={dispatch}>
                {children}
            </CartActionContext.Provider>
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}

export function useCartActions() {
    return useContext(CartActionContext)
}