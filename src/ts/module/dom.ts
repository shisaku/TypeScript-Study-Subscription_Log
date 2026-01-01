import type { BillingCycle } from "../types/subscription";

//####################################################
// 渡されたid属性のHTML要素と型が一致しているか確認し、一致していた時HTML属性に型情報を付与し、返却する
// @template T - 取得する要素の型（HTMLElement を継承した型）
// @param elementId - 取得する要素のid属性
// @returns 指定された型にキャストされたHTML要素
// @throws {Error} 指定されたIDの要素が見つからない場合
//#####################################################
export function getDomElement<T extends HTMLElement>(elementId: string): T {
    const htmlElement = document.getElementById(elementId);
    if (!htmlElement) {
        throw new Error(`${elementId} not found in HTML`);
    }
    return htmlElement as T;
}
//==========================================
// BillingCycle型かどうかを判定する関数
//==========================================
export function isBillingCycle(cycle: unknown): cycle is BillingCycle {
    return cycle === "weekly" || cycle === "monthly" || cycle === "annual";
}
