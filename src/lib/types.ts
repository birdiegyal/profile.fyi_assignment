export type Product = {
    id: string
    src: string
    desc: string
    name: string
    price: number
}

export type CartItem = {
    quantity: number
} & Product

export type Cart = {
    items: CartItem[]
    total: number
}

export enum CartActions {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    EMPTY_CART = "EMPTY_CART"
}

export type TDispatchAction = {
    type: CartActions,
    payload: CartItem
}

export enum DiscountCodes {
    DEFAULT = "",
    FIRST_BUY = "FIRSTBUY",
}

export type TBuyActionResponse = {
    valid: boolean,
    finalTotal: number, //after applying discount code.
    errorMessage?: string
}
