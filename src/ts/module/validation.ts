import type { SubscriptionInput, SubscriptionCategory, BillingCycle, ValidationError } from "../types/subscription";
import { compareDate } from "./util";
//####################################################
// 入力値バリデーション
// @param input 入力値
// @return バリデーション結果
//####################################################
export function validateSubscriptionInput(input: Partial<SubscriptionInput>) {
    const errors: ValidationError[] = [];
    //==========================================
    // 必須フィールドの存在チェック
    //==========================================
    if (!input.serviceName) {
        errors.push({ field: "serviceName", message: "サービス名を入力してください" });
    }
    if (!input.amount) {
        errors.push({ field: "amount", message: "料金を入力してください" });
    }
    if (input.cycle === undefined) {
        errors.push({ field: "amount", message: "支払いサイクルを入力してください" });
    }
    if (!input.category) {
        errors.push({ field: "category", message: "カテゴリを選択してください" });
    }
    if (!input.startDate || isNaN(input.startDate.getTime())) {
        errors.push({ field: "startDate", message: "契約開始日を入力してください" });
    }
    if (!input.nextBillingDate || isNaN(input.nextBillingDate.getTime())) {
        errors.push({ field: "nextBillingDate", message: "次回更新日を入力してください" });
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
    const startDateError = validateStartDateEndDate(input.startDate, input.nextBillingDate);
    if (startDateError) {
        errors.push(startDateError);
    }
    const memoError = validateMemo(input.memo);
    if (memoError) {
        errors.push(memoError);
    }
    // エラーがある場合
    if (errors.length > 0) {
        return { success: false, errors };
    }

    // 成功したとき
    return {
        success: true,
        data: input as SubscriptionInput,
    };
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
    if (amount > 100000) {
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
function validateDate(date: Date | undefined): date is Date {
    if (!date) {
        return false;
    }
    if (isNaN(date.getTime())) {
        return false;
    }
    return true;
}
//####################################################
// 契約開始日・次回更新日のバリデーション
// @param startDate 契約開始日
// @param endDate 契約終了日
//####################################################
function validateStartDateEndDate(startDate: Date | undefined, endDate: Date | undefined): ValidationError | null {
    const errorStartDate = validateDate(startDate);
    if (!errorStartDate) {
        return { field: "startDate", message: "契約開始日を入力してください" };
    }
    const errorEndDate = validateDate(endDate);
    if (!errorEndDate) {
        return { field: "endDate", message: "契約終了日を入力してください" };
    }
    const errorStartDateEndDate = compareDate(startDate, endDate);
    if (!errorStartDateEndDate) {
        return { field: "endDate", message: "次回更新日は契約開始日以降の日付を指定してください" };
    }
    return null;
}
//####################################################
// メモのバリデーション
//####################################################
function validateMemo(memo: string | undefined): ValidationError | null {
    if (!memo) return null;

    if (memo.length > 500) {
        return { field: "memo", message: "メモは500文字以内で入力してください" };
    }

    return null;
}
