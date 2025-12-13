import { getDomElement } from "./module/dom";
import { validateSubscriptionInput } from "./module/validation";
import type { SubscriptionInput } from "./types/subscription";
//####################################################
// DOM読み込み処理
//####################################################
document.addEventListener("DOMContentLoaded", () => {
    //==========================================
    // 登録ボタンクリック処理
    //==========================================
    const searchButton = getDomElement<HTMLButtonElement>("submitButton");
    searchButton.addEventListener("click", () => {
        // TODO:
        const formData = getFormData();
        //バリデーション
        validateSubscriptionInput;
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
