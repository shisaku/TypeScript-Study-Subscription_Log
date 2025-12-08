import { checkDomElement } from "./module/dom";
import { validateSubscriptionInput } from "./module/validation";
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
        validateSubscriptionInput;
        //登録
        //遷移
    });
});
