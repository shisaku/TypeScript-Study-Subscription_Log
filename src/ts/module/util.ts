import type { BillingCycle } from "../types/subscription";
//==========================================
// カテゴリの型定義
// @param earlier - 早い方の日付
// @param later - 遅い方の日付
// @returns 早い方が先なら true、そうでなければ false
//==========================================
export function compareDate(earlier: Date, later: Date) {
    if (earlier < later) {
        return true;
    } else {
        return false;
    }
}
//==========================================
// 支払いサイクルより次回請求日を算出
// @param earlier - 早い方の日付
// @param later - 遅い方の日付
// @returns 早い方が先なら true、そうでなければ false
//==========================================
export function calcrateBillingCycle(billingCycle: BillingCycle, startDate: Date) {
    let nextBillingDate = new Date();
    if (billingCycle == "weekly") {
        nextBillingDate.setDate(startDate.getDate() + 7);
    } else if (billingCycle == "monthly") {
        nextBillingDate.setMonth(startDate.getMonth() + 1);
    } else if (billingCycle == "annual") {
        nextBillingDate.setFullYear(startDate.getFullYear() + 1);
    }
    return nextBillingDate.toISOString().split("T")[0];
}
