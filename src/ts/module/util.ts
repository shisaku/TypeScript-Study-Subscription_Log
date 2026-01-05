import type { SubscriptionInput, BillingCycle } from "../types/subscription";
import { StorageKeys } from "../module/Constants";
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
export function calculateBillingCycle(billingCycle: BillingCycle, startDate: Date) {
    const nextBillingDate = new Date(startDate);
    if (billingCycle == "weekly") {
        nextBillingDate.setDate(nextBillingDate.getDate() + 7);
    } else if (billingCycle == "monthly") {
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    } else if (billingCycle == "annual") {
        nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    }

    return nextBillingDate.toISOString().split("T")[0];
}
//==========================================
// 指定したhtmlへ遷移
// @param htmlName - html名
//==========================================
export function redirectTo(htmlName: string, parameters: string = "") {
    window.location.href = `${htmlName}${parameters}`;
}

//==========================================
// 既に登録されているデータを取得
//==========================================
export function getSubscriptions(): SubscriptionInput[] {
    const data = localStorage.getItem(StorageKeys.SUBSCRIPTION);
    if (!data) {
        return [];
    }
    const parsed: SubscriptionInput[] = JSON.parse(data);
    return parsed;
}
//==========================================
// サブスクリプションの月間支払金額を計算（少数部は切り捨て）
//==========================================
export function getMonthlyAmount(subscription: SubscriptionInput): number {
    return subscription.cycle === "monthly" ? subscription.amount : Math.trunc(subscription.amount / 12);
}
//==========================================
// サブスクリプションの年間支払金額を計算
//==========================================
export function getAnnualAmount(subscription: SubscriptionInput): number {
    return subscription.cycle === "monthly" ? subscription.amount * 12 : subscription.amount;
}
