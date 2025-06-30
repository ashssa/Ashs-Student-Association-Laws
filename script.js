// script.js

document.addEventListener('DOMContentLoaded', function() {

    console.log('DOMContentLoaded 事件已觸發，程式碼開始執行。')

    // --- 常數定義 ---
    const HEADER_FILE = './header.html'; // 頁首檔案路徑
    const FOOTER_FILE = './footer.html'; // 頁尾檔案路徑
    const BUTTONS_FILE = './buttons.html'; // **功能列表檔案路徑**
    const HEADER_PLACEHOLDER_ID = 'main-header'; // 頁首佔位符 ID
    const FOOTER_PLACEHOLDER_ID = 'main-footer'; // 頁尾佔位符 ID
    const BUTTONS_PLACEHOLDER_ID = 'button-container'; // **功能列表佔位符 ID**
    const CURRENT_YEAR_SPAN_ID = 'current-year'; // 頁尾年份 span ID
    const LAST_UPDATED_SPAN_ID = 'last-updated'; // 頁尾更新日期 span ID

    // 返回頂部按鈕的 ID 常數**
    const SCROLL_TO_TOP_BTN_ID = 'scrollToTopBtn';

    // --- 取得元素 ---
    const headerPlaceholder = document.getElementById(HEADER_PLACEHOLDER_ID);
    const footerPlaceholder = document.getElementById(FOOTER_PLACEHOLDER_ID);
    const buttonsPlaceholder = document.getElementById(BUTTONS_PLACEHOLDER_ID); // **取得功能列表佔位符**

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

    // // --- 函數：更新頁尾資訊 ---
    // /**
    //  * 更新頁尾中的動態內容 (目前年份和最後更新日期)
    //  * @param {HTMLElement} footerElement - 頁尾容器元素
    //  */
    // function updateFooterInfo(footerElement) {
    //     if (!footerElement) return; // 如果頁尾元素不存在，則不執行

    //     // 找到頁尾內的年份 span 並更新
    //     const yearSpan = footerElement.querySelector(`#${CURRENT_YEAR_SPAN_ID}`);
    //     if (yearSpan) {
    //         yearSpan.textContent = new Date().getFullYear(); // 設定為當前年份
    //     } else {
    //         console.warn(`在頁尾中找不到 ID 為 "${CURRENT_YEAR_SPAN_ID}" 的年份 span 元素。`);
    //     }

    //     // 找到頁尾內的最後更新日期 span 並更新
    //     const lastUpdatedSpan = footerElement.querySelector(`#${LAST_UPDATED_SPAN_ID}`);
    //     if (lastUpdatedSpan) {
    //         // 顯示頁面載入時的日期和時間
    //         const now = new Date();
    //         const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    //         lastUpdatedSpan.textContent = formattedDateTime;
    //     } else {
    //         console.warn(`在頁尾中找不到 ID 為 "${LAST_UPDATED_SPAN_ID}" 的最後更新日期 span 元素。`);
    //     }
    // }

    // --- 執行載入 ---
    // 使用 Promise.allSettled 來並行載入頁首、頁尾和功能列表，並等待它們都完成 (無論成功或失敗)
    Promise.allSettled([
        loadHtmlFragment(HEADER_FILE, headerPlaceholder, '頁首'),
        loadHtmlFragment(FOOTER_FILE, footerPlaceholder, '頁尾'),
        loadHtmlFragment(BUTTONS_FILE, buttonsPlaceholder, '功能列表') // **載入功能列表**
    ]).then(results => {
        // 檢查頁尾是否成功載入
        const footerResult = results[1]; // 獲取載入頁尾的結果
        if (footerResult.status === 'fulfilled' && footerResult.value !== null) {
            // 如果頁尾成功載入，則更新頁尾資訊
            updateFooterInfo(footerPlaceholder);
        }

        console.log('頁首、頁尾與功能列表載入流程完成。');
        // 在這裡可以執行其他需要在頁首/頁尾/功能列表載入後執行的程式碼

        toastr.options = {
            "closeButton": false, // 是否在通知上顯示一個關閉按鈕
            "debug": false,
            "newestOnTop": false, // 新的通知是否顯示在舊的通知之上。
            "progressBar": false, // 是否在通知上顯示一個進度條，倒數計時通知的顯示時間。
            "positionClass": "toast-top-right", // 設定顯示位置
            "preventDuplicates": true, // 是否阻止顯示重複的通知。
            "onclick": null, // 設定當使用者點擊通知時要執行的 JavaScript 函數。可以將一個函數賦值給這個屬性。
            "showDuration": "250", // 通知出現的動畫持續時間，單位是毫秒（ms）。
            "hideDuration": "1500", // 通知消失的動畫持續時間，單位是毫秒。
            "timeOut": "1500", // 顯示 1.5 秒
            "extendedTimeOut": "0", // 當滑鼠懸停在通知上時，通知保持顯示的額外時間，單位是毫秒。
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "fadeOut",
            "onShown": function() {
                const toastElement = this; // 'this' 指向當前顯示的 toast 元素
                toastElement.style.opacity = '1';}
        }

            // --- 加入複製連結的程式碼 ---
        if (buttonsPlaceholder) {
            const copyLinkButtons = buttonsPlaceholder.querySelectorAll('button[type="copy_link"]');
            console.log('找到的複製連結按鈕 (在容器內):', copyLinkButtons);
            copyLinkButtons.forEach(button => {
                button.addEventListener('click', function() {
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href)
                            .then(() => {
                                toastr.success('網址已複製！');
                            })
                            .catch(err => {
                                console.error('複製網址失敗:', err);
                                toastr.error('複製網址失敗，請手動複製。');
                            });

                    } else {
                        alert('您的瀏覽器不支援複製到剪貼簿的功能，請手動複製。');
                    }
                });
            });
        } else {
            console.warn('找不到按鈕容器元素！');
        }
        // --- 複製連結的程式碼結束 ---
    });


        console.log('頁首、頁尾與功能列表載入流程完成。');
        // 在這裡可以執行其他需要在頁首/頁尾/功能列表載入後執行的程式碼

        const artDataElements = document.querySelectorAll('.art-data');
            artDataElements.forEach(artData => {
            const parElements = artData.querySelectorAll('.par');
            const firstPar = artData.querySelector('.par');
            
            if (parElements.length === 1 && firstPar) {
                firstPar.classList.add('only-one-par');
            } else if (firstPar) {
                firstPar.classList.remove('only-one-par');
            }
            });

        console.log('DOMContentLoaded 事件中的程式碼執行完畢。');
        });

    // --- **新增：返回頂部按鈕的邏輯** ---
    // 檢查按鈕是否存在，避免在找不到元素時產生錯誤
    if (scrollToTopBtn) {
        // 當用戶滾動頁面時，執行這個函數
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            // 如果頁面滾動超過 250 像素，顯示按鈕
            if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        }

        // 當用戶點擊按鈕時，滾動到頁面頂部
        scrollToTopBtn.addEventListener("click", function() {
            // 平滑滾動到頂部
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
        console.log('「返回頂部」按鈕功能已初始化。');
    }
