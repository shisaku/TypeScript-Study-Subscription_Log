//####################################################
// 渡されたid属性のHTML要素と型が一致しているか確認し、一致していた時HTML属性に型情報を付与し、返却する
//#####################################################
export function checkDomElement<T extends HTMLElement>(elementId: string): T {
    const htmlElement = document.getElementById(elementId);
    if (!htmlElement) {
        throw new Error(`${elementId} not found in HTML`);
    }
    return htmlElement as T;
}
