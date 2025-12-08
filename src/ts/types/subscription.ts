//==========================================
// カテゴリの型定義
//==========================================
//TODO: カテゴリーは将来的にユーザから登録で増やしたいので、このベタ打ちではだめ
export type SubscriptionCategory = "video" | "music" | "cloud" | "software" | "news" | "fitness" | "education" | "other";
//==========================================
// サブスクリプションの型定義
//==========================================
export interface Subscription {
    id: string;
    serviceName: string;
    amount: number;
    cycle: BillingCycle;
    category: SubscriptionCategory;
    startDate: Date;
    nextBillingDate: Date;
    memo?: string;
    createdAt: Date;
    updatedAt: Date;
}
//==========================================
// フォーム入力データの型定義（IDや日時を除く）
//==========================================
export type SubscriptionInput = Omit<Subscription, "id" | "createdAt" | "updatedAt">;
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
