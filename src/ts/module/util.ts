//==========================================
// カテゴリの型定義
// @param earlier - 早い方の日付
// @param later - 遅い方の日付
// @returns 早い方が先なら true、そうでなければ false
//==========================================
export function compareDate(earlier: Date, later: Date) {
    if (earlier < later) {
        return true;
    } else {
        return false;
    }
}
