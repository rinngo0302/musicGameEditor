
async function fileExport()
{
    const blob = new Blob([text], { type: 'text/plain' });
 
    // ダミーの a 要素を生成して body 要素の最後に追加
    let dummy_a_el = document.createElement('a');
    document.body.appendChild(dummy_a_el);
 
    // a 要素の href 属性に Object URL をセット
    dummy_a_el.href = window.URL.createObjectURL(blob);
 
    // a 要素の download 属性にファイル名をセット
    dummy_a_el.download = 'test.csv';
 
    // 疑似的に a 要素をクリックさせる
    dummy_a_el.click();
 
    // a 要素を body 要素から削除
    document.body.removeChild(dummy_a_el);
}