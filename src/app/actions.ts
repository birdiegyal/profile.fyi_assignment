"use server"
import { DiscountCodes as VaildDiscountCodes, TBuyActionResponse } from "@/lib/types"

export async function buyAction(formdata: FormData): Promise<TBuyActionResponse> {

    const code = formdata.get("discountCode")?.toString()
    const total = parseInt(formdata.get("total")?.toString() || "0")

    // FIRSTBUY is the only valid discount code.
    let discount = code === "FIRSTBUY" ? 10 : 0,
        valid = false,
        finalTotal = 0,
        errorMessage = "Invalid Discount Code"

    // TODO: what happens if some wrote his own custom client for buyAction. he can make his own formdata obj and add whatever he wants. intresting thing would be how to imitate the request made by the client component in order to invoke this server action.

    // let go code = "" | "FIRSTBUY" only.
    // TODO: find a generalized way of doing this. What if you will have multiple discount code. What if we have 1M Discount Codes for users all over the world.
    if ((code === VaildDiscountCodes.DEFAULT || code === VaildDiscountCodes.FIRST_BUY) && total) {
        valid = true
        finalTotal = total - ((total * discount) / 100)
        errorMessage = ""
    }

    return {
        valid,
        errorMessage,
        finalTotal
    }
}