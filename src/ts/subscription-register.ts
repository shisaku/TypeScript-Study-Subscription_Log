import { checkDomElement } from "./module/dom";
import type { ValidationError } from "./types/subscription";
//####################################################
// DOM読み込み処理
//####################################################
document.addEventListener("DOMContentLoaded", () => {
    //==========================================
    // 登録ボタンクリック処理
    //==========================================
    const searchButton = checkDomElement<HTMLButtonElement>("submitButton");
    searchButton.addEventListener("click", () => {
        // TODO:
        //バリデーション
        //登録
        //遷移
    });
});
//####################################################
// 入力値バリデーション
//####################################################
function validateInput() {}
//####################################################
// サービス名のバリデーション
//####################################################
function validateServiceName(serviceName: string): ValidationError | null {
    if (!serviceName || serviceName.trim() === "") {
        return { field: "serviceName", message: "サービス名を入力してください" };
    }

    if (serviceName.length > 50) {
        return { field: "serviceName", message: "サービス名は50文字以内で入力してください" };
    }

    return null;
}
//####################################################
// 料金のバリデーション
//####################################################
function validateAmount(amount: number): ValidationError | null {
    if (isNaN(amount)) {
        return { field: "amount", message: "料金は数字を入力してください" };
    }
    if (amount < 0) {
        return { field: "amount", message: "料金は０以上入力してください" };
    }
    if (amount < 100000) {
        return { field: "amount", message: "料金は１０００００以下入力してください" };
    }
    // 小数点チェック
    if (!Number.isInteger(amount)) {
        return { field: "amount", message: "料金は整数で入力してください" };
    }
    return null;
}
