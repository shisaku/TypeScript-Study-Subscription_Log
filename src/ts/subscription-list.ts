import { StorageKeys } from "./module/Constants";
import { redirectTo, getSubscriptions, getAnnualAmount } from "./module/util";
import type { SubscriptionInput, BillingCycle } from "./types/subscription";
import { getDomElement, isBillingCycle } from "./module/dom";
//####################################################
// DOM読み込み処理
//####################################################
document.addEventListener("DOMContentLoaded", () => {
    const subscription_l = localStorage.getItem(StorageKeys.SUBSCRIPTION);
    if (!subscription_l) {
        return;
    }
    const subscriptions: SubscriptionInput[] = JSON.parse(subscription_l);
    //==========================================
    // サブスクリプション一覧表示処理
    //==========================================
    showSubscriptionList(subscriptions);
    //==========================================
    // 年間合計支払金額の表示
    //==========================================
    const annualTotal = calculateAnnualTotal(subscriptions);
    getDomElement<HTMLElement>("annual-total").textContent = `${annualTotal.toString()}円`;
    //==========================================
    // クリックイベント付与
    //==========================================
    const container = getDomElement<HTMLElement>("container");
    container?.addEventListener("click", function (e) {
        const eventTarget = e.target as HTMLElement;
        // 新規追加ボタンクリック処理
        if (eventTarget.id == "add-button") {
            redirectTo("subscription-register.html");
        }
        // 編集ボタンクリック処理
        if (eventTarget.classList.contains("edit-button")) {
            const container = eventTarget.closest(".subscription-card");
            if (!(container instanceof HTMLElement)) {
                return;
            }
            const serviceName = container.dataset.serviceName;
            redirectTo("subscription-register.html", `?servicename=${serviceName}`);
        }
        // 削除ボタンクリック処理
        if (eventTarget.classList.contains("delete-button")) {
            const container = eventTarget.closest(".subscription-card");
            if (!(container instanceof HTMLElement)) {
                return;
            }
            const serviceName = container.dataset.serviceName;
            if (!serviceName) {
                return;
            }
            deleteSubscription(serviceName);
            redirectTo("subscription-list.html", `?servicename=${serviceName}`);
        }
    });
});
//####################################################
// 一覧表示処理
//####################################################
function showSubscriptionList(subscriptions: SubscriptionInput[]) {
    //==========================================
    // サブスクリプションカードの描画
    //==========================================
    const container = document.getElementById("subscription-list");
    if (!container) return;
    container.innerHTML = "";

    subscriptions?.forEach(subscription => {
        const card = document.createElement("div");
        card.className = "subscription-card";
        card.dataset.serviceName = subscription.serviceName;
        card.innerHTML = `
        <div class="card-content" >
            <div class="service-name">${subscription.serviceName}</div>
            <div class="category-badge">${subscription.category}</div>
            <div class="next-payment">次回支払日: <span class="payment-date">あと3日 (1/3)</span></div>
        </div>
        <div class="price-section">
            <div class="price">¥${subscription.amount.toLocaleString()}</div>
            <div class="billing-cycle">${subscription.cycle === "monthly" ? "/月" : "/年"}</div>
        </div>
        <div class="actions">
            <button class="edit-button">✏️</button>
            <button class="delete-button">🗑️</button>
        </div>
    `;
        container.appendChild(card);
    });
}
//####################################################
// サブスクリプション削除処理
//####################################################
function deleteSubscription(serviceName: string) {
    const subscriptionList = getSubscriptions();
    if (!subscriptionList) {
        return;
    }
    const deletedSubscriptions = subscriptionList.filter(subscription => {
        return subscription.serviceName != serviceName;
    });
    localStorage.removeItem(StorageKeys.SUBSCRIPTION);
    localStorage.setItem(StorageKeys.SUBSCRIPTION, JSON.stringify(deletedSubscriptions));
}
//####################################################
// 年間合計支払額計算処理
//####################################################
function calculateAnnualTotal(subscriptions: SubscriptionInput[]): number {
    return subscriptions.reduce((total, sub) => {
        return total + getAnnualAmount(sub);
    }, 0);
}
