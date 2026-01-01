import { StorageKeys } from "./module/Constants";
import { redirectTo } from "./module/util";
import type { SubscriptionInput, BillingCycle } from "./types/subscription";
//####################################################
// DOM読み込み処理
//####################################################
document.addEventListener("DOMContentLoaded", () => {
    //==========================================
    // サブスクリプション一覧表示処理
    //==========================================
    showSubscriptionList();
    //==========================================
    // 新規登録ボタンクリック処理
    //==========================================
});
//####################################################
// 一覧表示処理
//####################################################
function showSubscriptionList() {
    //==========================================
    // サブスクリプション登録データを取得
    //==========================================
    const subscription_l = localStorage.getItem(StorageKeys.SUBSCRIPTION);
    if (!subscription_l) {
        return;
    }
    const subscriptionList: SubscriptionInput[] = JSON.parse(subscription_l);
    //==========================================
    // サブスクリプションカードの描画
    //==========================================
    const container = document.getElementById("subscription-list");
    if (!container) return;
    container.innerHTML = "";

    subscriptionList?.forEach(subscription => {
        const card = document.createElement("div");
        card.className = "subscription-card";
        card.innerHTML = `
        <div class="card-content">
            <div class="service-name">${subscription.serviceName}</div>
            <div class="category-badge">${subscription.category}</div>
            <div class="next-payment">次回支払日: <span class="payment-date">あと3日 (1/3)</span></div>
        </div>
        <div class="price-section">
            <div class="price">¥${subscription.amount.toLocaleString()}</div>
            <div class="billing-cycle">${subscription.cycle === "monthly" ? "/月" : "/年"}</div>
        </div>
        <div class="actions">
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </div>
    `;
        container.appendChild(card);
    });
}
