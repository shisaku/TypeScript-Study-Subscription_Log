//==========================================
// 支払いサイクルの型
//==========================================
export type BillingCycle = "weekly" | "monthly" | "annual";

//==========================================
// バリデーションエラー
//==========================================
export interface ValidationError {
    field: string;
    message: string;
}
