const serviceName = "Netflix";
if (!serviceName || serviceName.trim() === "") {
        console.log("サービス名を入力してください");
    }

    if (serviceName.length > 50) {
        console.log("サービス名は50文字以内で入力してください" );
    }
console.log("OK");
