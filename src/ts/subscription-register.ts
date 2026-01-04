import { getDomElement, isBillingCycle } from "./module/dom";
import { validateSubscriptionInput } from "./module/validation";
import type { SubscriptionInput, BillingCycle } from "./types/subscription";
import { calculateBillingCycle, redirectTo, getSubscriptions } from "./module/util";
import { StorageKeys } from "./module/Constants";
//####################################################
// DOM読み込み処理
//####################################################
document.addEventListener("DOMContentLoaded", () => {
    //==========================================
    // 初期値設定処理
    //==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get("servicename");
    if (serviceName) {
        setDefaultValues(serviceName);
    }
    //==========================================
    // 契約開始日変更処理
    //==========================================
    const startDateElement = getDomElement<HTMLInputElement>("startDate");
    startDateElement.addEventListener("change", () => {
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
    const searchButton = getDomElement<HTMLButtonElement>("submit-button");
    searchButton.addEventListener("click", () => {
        const formData = getFormData();
        //-------------------------------
        // バリデーション
        //-------------------------------
        const errors = validateSubscriptionInput(formData);
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
        saveSubscriptionData(formData as SubscriptionInput);
        //遷移
        redirectTo("subscription-list.html");
    });
    //==========================================
    // 戻るボタンクリック処理
    //==========================================
    const backButton = getDomElement<HTMLButtonElement>("back-button");
    backButton.addEventListener("click", () => {
        redirectTo("subscription-list.html");
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
// 登録処理
//####################################################
function saveSubscriptionData(formData: SubscriptionInput) {
    const subscriptionList = getSubscriptions();
    subscriptionList.push(formData);
    localStorage.removeItem(StorageKeys.SUBSCRIPTION);
    localStorage.setItem(StorageKeys.SUBSCRIPTION, JSON.stringify(subscriptionList));
}

//####################################################
// 初期値設定処理
//####################################################
function setDefaultValues(serviceName: string) {
    const subscriptionList = getSubscriptions();
    if (!subscriptionList) {
        return;
    }
    const displaySubscriptions = subscriptionList.filter(subscription => {
        return subscription.serviceName == serviceName;
    });
    getDomElement<HTMLInputElement>("serviceName").value = displaySubscriptions[0].serviceName;
    getDomElement<HTMLInputElement>("amount").value = displaySubscriptions[0].amount.toString();
    getDomElement<HTMLSelectElement>("cycle").value = displaySubscriptions[0].cycle;
    getDomElement<HTMLSelectElement>("category").value = displaySubscriptions[0].category;
    getDomElement<HTMLInputElement>("startDate").value = displaySubscriptions[0].startDate.toString().split("T")[0];
    getDomElement<HTMLInputElement>("nextBillingDate").value = displaySubscriptions[0].nextBillingDate.toString().split("T")[0];
    getDomElement<HTMLInputElement>("memo").value = displaySubscriptions[0].memo ?? "";
}
