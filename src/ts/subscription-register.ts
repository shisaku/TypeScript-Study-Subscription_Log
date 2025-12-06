import { checkDomElement } from "./module/dom";
import type { SubscriptionInput, SubscriptionCategory, BillingCycle, ValidationError } from "./types/subscription";
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
function validateInput(input: Partial<SubscriptionInput>) {
    const errors: ValidationError[] = [];
    //==========================================
    // 必須フィールドの存在チェック
    //==========================================
    if (!input.serviceName) {
        errors.push({ field: "serviceName", message: "サービス名を入力してください" });
    }
    if (input.cycle === undefined) {
        errors.push({ field: "amount", message: "支払いサイクルを入力してください" });
    }
    if (!input.category) {
        errors.push({ field: "category", message: "カテゴリを選択してください" });
    }
    if (!input.startDate) {
        errors.push({ field: "startDate", message: "契約開始日を入力してください" });
    }
    if (!input.nextBillingDate) {
        errors.push({ field: "nextBillingDate", message: "次回更新日を入力してください" });
    }
    if (input.notifyDays === undefined) {
        errors.push({ field: "notifyDays", message: "通知設定を選択してください" });
    }
    // 存在チェックに引っかかったとき、早期リターン
    if (errors.length > 0) {
        return { success: false, errors };
    }
    //==========================================
    // 必須フィールドの各種チェック
    //==========================================
    const serviceNameError = validateServiceName(input.serviceName);
    if (serviceNameError) {
        errors.push(serviceNameError);
    }
    const amountError = validateAmount(input.amount);
    if (amountError) {
        errors.push(amountError);
    }
    const cycleError = validateCycle(input.cycle);
    if (cycleError) {
        errors.push(cycleError);
    }
    const categoryError = validateCategory(input.category);
    if (categoryError) {
        errors.push(categoryError);
    }
    const startDateError = validateStartDate(input.startDate);
    if (startDateError) {
        errors.push(startDateError);
    }
}
//####################################################
// サービス名のバリデーション
//####################################################
function validateServiceName(serviceName: string | undefined): ValidationError | null {
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
function validateAmount(amount: number | undefined): ValidationError | null {
    if (amount === undefined) {
        return { field: "amount", message: "料金を入力してください" };
    }

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
//####################################################
// 支払いサイクルのバリデーション
//####################################################
function validateCycle(cycle: string | undefined): ValidationError | null {
    if (!cycle) {
        return { field: "cycle", message: "支払いサイクルを選択してください" };
    }
    if (!isCycle(cycle)) {
        return { field: "cycle", message: "不正な支払いサイクルです" };
    }
    return null;
}
//####################################################
// カテゴリのバリデーション
//####################################################
function validateCategory(category: string | undefined): ValidationError | null {
    if (!category) {
        return { field: "category", message: "カテゴリを選択してください" };
    }

    if (!isSubscriptionCategory(category)) {
        return { field: "category", message: "無効なカテゴリです" };
    }

    return null;
}
//####################################################
// 支払いサイクル型チェック
//####################################################
function isCycle(args: string): args is BillingCycle {
    return args === "weekly" || args === "monthly" || args === "annual";
}
//####################################################
// カテゴリー型チェック
//####################################################
function isSubscriptionCategory(args: string): args is SubscriptionCategory {
    const validCategories: SubscriptionCategory[] = ["video", "music", "cloud", "software", "news", "fitness", "education", "other"];
    return validCategories.includes(args as SubscriptionCategory);
}
//####################################################
// 日付のバリデーション
//####################################################
function validateDate(date: Date | undefined): boolean {
    if (!date) {
        return false;
    }
    if (isNaN(date.getTime())) {
        return false;
    }
    return true;
}
//####################################################
// 契約開始日のバリデーション
//####################################################
function validateStartDate(startDate: Date | undefined): ValidationError | null {
    const error = validateDate(startDate);
    if (!error) {
        return { field: "startDate", message: "契約開始日を入力してください" };
    }
    return null;
}
//####################################################
// 契約終了日のバリデーション
//####################################################
function validatEndDate(startDate: Date | undefined): ValidationError | null {
    const error = validateDate(startDate);
    if (!error) {
        return { field: "startDate", message: "契約終了日を入力してください" };
    }
    return null;
}
