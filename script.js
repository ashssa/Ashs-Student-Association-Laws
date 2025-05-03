// script.js

// 使用 DOMContentLoaded 事件確保 HTML 完全載入並解析後再執行腳本
document.addEventListener('DOMContentLoaded', function() {

    // --- 常數定義 ---
    const HEADER_FILE = './test.html'; // 頁首檔案路徑
    const FOOTER_FILE = './footer.html'; // 頁尾檔案路徑
    const HEADER_PLACEHOLDER_ID = 'main-header'; // 頁首佔位符 ID
    const FOOTER_PLACEHOLDER_ID = 'main-footer'; // 頁尾佔位符 ID
    const CURRENT_YEAR_SPAN_ID = 'current-year'; // 頁尾年份 span ID
    const LAST_UPDATED_SPAN_ID = 'last-updated'; // 頁尾更新日期 span ID

    // --- 取得元素 ---
    const headerPlaceholder = document.getElementById(HEADER_PLACEHOLDER_ID);
    const footerPlaceholder = document.getElementById(FOOTER_PLACEHOLDER_ID);

    // --- 函數：載入 HTML 片段 ---
    /**
     * 使用 Fetch API 異步載入 HTML 片段並插入到指定的佔位符元素中
     * @param {string} filePath - 要載入的 HTML 檔案路徑
     * @param {HTMLElement} placeholder - 要插入內容的目標元素
     * @param {string} placeholderName - 佔位符的描述性名稱 (用於錯誤訊息)
     * @returns {Promise<string|null>} - 成功時解析為載入的 HTML 字串，失敗時為 null
     */
    async function loadHtmlFragment(filePath, placeholder, placeholderName) {
    if (!placeholder) {
        console.warn(`找不到 ID 為 "${placeholder.id}" 的 ${placeholderName} 佔位符元素。`);
        return null; // 找不到元素，直接返回
    }

    try {
        // 發起 fetch 請求
        const response = await fetch(filePath);

        // 檢查回應狀態
        if (!response.ok) {
        // 如果請求失敗 (例如 404 Not Found)
        throw new Error(`網路回應錯誤: ${response.status} ${response.statusText}`);
        }

        // 將回應轉換為文字 (HTML 內容)
        const html = await response.text();

        // 將載入的 HTML 插入佔位符
        placeholder.innerHTML = html;
        console.log(`${placeholderName} (${filePath}) 已成功載入。`);
        return html; // 返回載入的 HTML

    } catch (error) {
        // 捕捉 fetch 或處理過程中的錯誤
        console.error(`無法載入 ${placeholderName} (${filePath}):`, error);
        // 在佔位符顯示錯誤訊息，方便除錯
        placeholder.innerHTML = `<p style="color:red; text-align:center;">${placeholderName} 載入失敗！請檢查檔案路徑或網路連線。</p>`;
        return null; // 返回 null 表示失敗
    }
    }

    // --- 函數：更新頁尾資訊 ---
    /**
     * 更新頁尾中的動態內容 (目前年份和最後更新日期)
     * @param {HTMLElement} footerElement - 頁尾容器元素
     */
    function updateFooterInfo(footerElement) {
    if (!footerElement) return; // 如果頁尾元素不存在，則不執行

    // 找到頁尾內的年份 span 並更新
    const yearSpan = footerElement.querySelector(`#${CURRENT_YEAR_SPAN_ID}`);
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear(); // 設定為當前年份
    } else {
        console.warn(`在頁尾中找不到 ID 為 "${CURRENT_YEAR_SPAN_ID}" 的年份 span 元素。`);
    }

    // 找到頁尾內的最後更新日期 span 並更新
    const lastUpdatedSpan = footerElement.querySelector(`#${LAST_UPDATED_SPAN_ID}`);
    if (lastUpdatedSpan) {
        // 顯示頁面載入時的日期和時間
        const now = new Date();
        const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        lastUpdatedSpan.textContent = formattedDateTime;
    } else {
        console.warn(`在頁尾中找不到 ID 為 "${LAST_UPDATED_SPAN_ID}" 的最後更新日期 span 元素。`);
    }
    }

    // --- 執行載入 ---
    // 使用 Promise.allSettled 來並行載入頁首和頁尾，並等待兩者都完成 (無論成功或失敗)
    Promise.allSettled([
    loadHtmlFragment(HEADER_FILE, headerPlaceholder, '頁首'),
    loadHtmlFragment(FOOTER_FILE, footerPlaceholder, '頁尾')
    ]).then(results => {
    // 檢查頁尾是否成功載入
    const footerResult = results[1]; // 獲取載入頁尾的結果
    if (footerResult.status === 'fulfilled' && footerResult.value !== null) {
        // 如果頁尾成功載入，則更新頁尾資訊
        updateFooterInfo(footerPlaceholder);
    }

    console.log('頁首與頁尾載入流程完成。');
    // 在這裡可以執行其他需要在頁首/頁尾載入後執行的程式碼
    });

});
