import { StorageKeys } from "./module/Constants";
import { redirectTo } from "./module/util";
//####################################################
// DOM読み込み処理
//####################################################
document.addEventListener("DOMContentLoaded", () => {
    //==========================================
    // サブスクリプション一覧表示処理
    //==========================================
    showSubscriptionList();
    //==========================================
    // 新規登録ボタン表示処理
    //==========================================
});
function showSubscriptionList() {
    const subscriptionList = localStorage.getItem(StorageKeys.SUBSCRIPTION);
}
