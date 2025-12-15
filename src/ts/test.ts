const startDate = new Date("2025-12-15");
const billingCycle = "monthly";
let nextBillingDate = new Date(startDate); // startDateをコピー

if (billingCycle == "weekly") {
    nextBillingDate.setDate(nextBillingDate.getDate() + 7);
    console.log(nextBillingDate.toISOString().split('T')[0]);
} else if (billingCycle == "monthly") {
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    console.log(nextBillingDate.toISOString().split('T')[0]);
} else if (billingCycle == "annual") {
    nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    console.log(nextBillingDate.toISOString().split('T')[0]);
}
// 出力: 2026-12-15
