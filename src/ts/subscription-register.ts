import { getDomElement, isBillingCycle } from "./module/dom";
import { validateSubscriptionInput } from "./module/validation";
import type { SubscriptionInput, BillingCycle } from "./types/subscription";
import { calculateBillingCycle } from "./module/util";
//####################################################
// DOM読み込み処理
//####################################################
document.addEventListener("DOMContentLoaded", () => {
    //==========================================
    // 契約開始日クリック処理
    //==========================================
    const startDateElement = getDomElement<HTMLInputElement>("startDate");
    startDateElement.addEventListener("change", () => {
        // TODO:
        const startDate = new Date(startDateElement.value);
        const cycle = getDomElement<HTMLSelectElement>("cycle").value;
        if (!isBillingCycle(cycle)) {
            return false;
        }
        const nextBillingDate = calculateBillingCycle(cycle, startDate);
        getDomElement<HTMLInputElement>("nextBillingDate").value = nextBillingDate;
    });
    //==========================================
    // 登録ボタンクリック処理
    //==========================================
    const searchButton = getDomElement<HTMLButtonElement>("submitButton");
    searchButton.addEventListener("click", () => {
        // TODO:
        const formData = getFormData();
        //バリデーション
        const errors = validateSubscriptionInput(formData);
        // 存在チェックに引っかかったとき、早期リターン
        if (!errors.success) {
            const errorMessages = errors.errors?.map(error => error.message);
            const messageText = errorMessages?.join("<br>");
            const errorMessageElement = getDomElement<HTMLInputElement>("errorMessage");
            if (messageText) {
                errorMessageElement.innerHTML = messageText;
                errorMessageElement.classList.remove("hidden");
            }
        }
        //登録
        //遷移
    });
});
//####################################################
// フォームデータの取得
//####################################################
function getFormData(): Partial<SubscriptionInput> {
    const serviceName = getDomElement<HTMLInputElement>("serviceName").value;
    const amount = parseFloat(getDomElement<HTMLInputElement>("amount").value);
    const cycle = getDomElement<HTMLSelectElement>("cycle").value;
    const category = getDomElement<HTMLSelectElement>("category").value;
    const startDate = new Date(getDomElement<HTMLInputElement>("startDate").value);
    const nextBillingDate = new Date(getDomElement<HTMLInputElement>("nextBillingDate").value);
    // const hasTrial = getDomElement<HTMLInputElement>("hasTrial").value;
    const memo = getDomElement<HTMLInputElement>("memo").value;

    const formData: Partial<SubscriptionInput> = {
        serviceName,
        amount,
        cycle: cycle as any, // バリデーションで型チェックするため一旦any
        category: category as any,
        startDate,
        nextBillingDate,
        memo: memo || undefined,
    };
    return formData;
}
//####################################################
// エラーメッセージの表示
//####################################################
function showErrorMessage(errorMessage: string[]) {}
