# Ashs-Student-Association-Laws
## 學生會內部自治法規展示網站

這是一個使用純 HTML、CSS 和 JavaScript 建置的靜態網站，用於展示學生會的內部自治法規。
網站的主要特色是透過 JavaScript 動態載入共用的頁首 (Header) 和頁尾 (Footer)，方便統一管理和更新。

## 專案目的

* 提供一個清晰、易於存取的平台，讓學生會成員及本會會員查詢最新的本會法規。
* 簡化法規網站的維護流程，特別是頁首和頁尾的更新。

## 技術棧

* **HTML5:** 網頁內容結構。
* **CSS3:** 網頁樣式與排版。
* **JavaScript (ES6):**
    * 使用 `fetch` API 非同步載入共用的 HTML 片段 (`_header.html`, `_footer.html`)。
    * 動態更新頁尾的年份和最後更新時間。

## 檔案結構

```
.
├── index.html         # 網站主頁（法規總覽）
├── act01.html         # 法規頁面範例（可複製此結構新增更多法規頁面）
├── _header.html       # 共用的頁首 HTML 片段
├── _footer.html       # 共用的頁尾 HTML 片段
├── style.css          # 主要的 CSS 樣式表
├── script.js          # 用於載入頁首/頁尾及其他互動功能的 JavaScript
└── img/└── icon.ico       # 網站圖示 (Favicon)
```

## 主要功能

* **靜態網站:** 無需後端伺服器或資料庫，可部署於任何支援靜態檔案的空間。
* **共用頁首/頁尾:** 只需修改 `_header.html` 和 `_footer.html` 即可更新所有頁面的對應區塊。
* **基本響應式設計:** 在不同螢幕尺寸下提供基本的可用性。
* **網站圖示 (Favicon):** 在瀏覽器頁籤和書籤中顯示學生會的圖示。