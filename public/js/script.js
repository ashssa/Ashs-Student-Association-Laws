// script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件已觸發，程式碼開始執行。');

    // --- 常數定義 ---
    const HEADER_FILE = '../components/header.html'; // 頁首檔案路徑
    const FOOTER_FILE = '../components/footer.html'; // 頁尾檔案路徑
    const BUTTONS_FILE = '../components/buttons.html'; // **功能列表檔案路徑**
    const HEADER_PLACEHOLDER_ID = 'main-header'; // 頁首佔位符 ID
    const FOOTER_PLACEHOLDER_ID = 'main-footer'; // 頁尾佔位符 ID
    const BUTTONS_PLACEHOLDER_ID = 'button-container'; // **功能列表佔位符 ID**
    const CURRENT_YEAR_SPAN_ID = 'current-year'; // 頁尾年份 span ID
    const LAST_UPDATED_SPAN_ID = 'last-updated'; // 頁尾更新日期 span ID
    const SCROLL_TO_TOP_BTN_ID = 'scrollToTopBtn'; // 返回頂部按鈕的 ID 常數**

    // --- 取得元素 ---
    const headerPlaceholder = document.getElementById(HEADER_PLACEHOLDER_ID);
    const footerPlaceholder = document.getElementById(FOOTER_PLACEHOLDER_ID);
    const buttonsPlaceholder = document.getElementById(BUTTONS_PLACEHOLDER_ID); // **取得功能列表佔位符**
    const scrollToTopBtn = document.getElementById(SCROLL_TO_TOP_BTN_ID); // 獲取返回頂部按鈕元素**

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
            console.warn(`找不到 ID 為 "${placeholderName}" 的 ${placeholderName} 佔位符元素。`);
            return null; // 找不到元素，直接返回
        }

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`網路回應錯誤: ${response.status} ${response.statusText}`);
            }
            const html = await response.text();
            placeholder.innerHTML = html;
            console.log(`${placeholderName} (${filePath}) 已成功載入。`);
            return html; // 返回載入的 HTML
        } catch (error) {
            console.error(`無法載入 ${placeholderName} (${filePath}):`, error);
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
        if (!footerElement) return;

        const yearSpan = footerElement.querySelector(`#${CURRENT_YEAR_SPAN_ID}`);
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        } else {
            console.warn(`在頁尾中找不到 ID 為 "${CURRENT_YEAR_SPAN_ID}" 的年份 span 元素。`);
        }

        const lastUpdatedSpan = footerElement.querySelector(`#${LAST_UPDATED_SPAN_ID}`);
        if (lastUpdatedSpan) {
            const now = new Date();
            const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            lastUpdatedSpan.textContent = formattedDateTime;
        } else {
            console.warn(`在頁尾中找不到 ID 為 "${LAST_UPDATED_SPAN_ID}" 的最後更新日期 span 元素。`);
        }
    }

    // --- 執行載入 ---
    Promise.allSettled([
        loadHtmlFragment(HEADER_FILE, headerPlaceholder, '頁首'),
        loadHtmlFragment(FOOTER_FILE, footerPlaceholder, '頁尾'),
        loadHtmlFragment(BUTTONS_FILE, buttonsPlaceholder, '功能列表') // **載入功能列表**
    ]).then(results => {
        const footerResult = results[1];
        if (footerResult.status === 'fulfilled' && footerResult.value !== null) {
            updateFooterInfo(footerPlaceholder);
        }

        console.log('頁首、頁尾與功能列表載入流程完成。');

    const backBtn = document.getElementById('backBtn');
    console.log('即將啟動myBtn（回上頁按鈕）');
    if (backBtn) {
        console.log('myButton 元素已找到（',backBtn,'），添加點擊事件監聽器。');
        backBtn.addEventListener('click', function() {
            window.location.href = '../';
        });
    }

    // --- 新增：初始化主題切換邏輯的函數 ---
    function initializeThemeSwitcher() {
        console.log('initializeThemeSwitcher 函數開始執行。');
        const themeRadios = document.querySelectorAll('.theme-controller');
        const htmlElement = document.documentElement; // 獲取 <html> 元素
        const localStorageKey = 'daisyuiTheme'; // 儲存主題的 localStorage 鍵名

        // 1. 頁面載入時，從 localStorage 讀取並應用主題
        const savedTheme = localStorage.getItem(localStorageKey);
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme); // 設定 <html> 的 data-theme 屬性
            // 同步更新 radio 按鈕的選中狀態
            const savedRadio = document.querySelector(`input[value="${savedTheme}"]`);
            if (savedRadio) {
                savedRadio.checked = true;
                console.log(`已從 localStorage 載入主題: ${savedTheme}`);
            } else {
                console.warn(`localStorage 中儲存的主題 '${savedTheme}' 找不到對應的 radio 按鈕。`);
            }
        } else {
            // 如果 localStorage 沒有儲存，預設使用第一個主題或 'default' 主題
            const defaultThemeRadio = document.querySelector('input[name="theme-dropdown"]:checked') || document.querySelector('input[value="default"]');
            if (defaultThemeRadio) {
                htmlElement.setAttribute('data-theme', defaultThemeRadio.value);
                localStorage.setItem(localStorageKey, defaultThemeRadio.value);
                defaultThemeRadio.checked = true;
                console.log(`localStorage 無主題，設定預設主題: ${defaultThemeRadio.value}`);
            } else {
                console.warn('找不到預設主題的 radio 按鈕或任何選中的主題。');
            }
        }

        // 2. 監聽 radio 按鈕的變更事件，儲存新主題並應用
        if (themeRadios.length > 0) {
            themeRadios.forEach(radio => {
                radio.addEventListener('change', (event) => {
                    const selectedTheme = event.target.value; // 取得被選中的主題值
                    htmlElement.setAttribute('data-theme', selectedTheme);
                    localStorage.setItem(localStorageKey, selectedTheme);
                    console.log(`主題已切換並儲存: ${selectedTheme}`);
                });
            });
            console.log('主題切換監聽器已成功綁定。');
        } else {
            console.warn('未找到任何主題切換 radio 按鈕 (.theme-controller)。');
        }
    }
        console.log('initializeThemeSwitcher 函數預備執行');
        initializeThemeSwitcher();

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "250",
            "hideDuration": "1500",
            "timeOut": "1500",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "fadeOut",
            "onShown": function() {
                const toastElement = this;
                toastElement.style.opacity = '1';
            }
        };

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
    if (scrollToTopBtn) {
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        }

        scrollToTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
        console.log('「返回頂部」按鈕功能已初始化。');
    }
});
