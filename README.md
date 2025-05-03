# 高師大附中學生會自治法規共用系統

這是一個使用純 HTML、CSS 和 JavaScript 建置的靜態網站，用於展示高師大附中學生會（以下簡稱本會）自治法規。
本網站透過 JavaScript 動態載入共用的頁首 (Header) 和頁尾 (Footer)，方便統一管理和更新。

## 專案目的

* 提供一個清晰、易於存取的平台，讓本會會員查詢本會自治法規。
* 簡化法規網站的維護流程，如頁首和頁尾的更新。

## 檔案結構

```
.
├── index.html         # 網站主頁（法規總覽）
├── act01.html         # 組織章程
├── act02.html         # 學生代表法
├── act03.html         # 行政中心組織及運作法
├── act04.html         # 學生議會組織及運作法
├── act05.html         # 選舉及罷免法
├── act06.html         # 經費法
├── act07.html         # 自治法規標準法
├── act08.html         # 學生政黨法
├── header.html        # 共用的頁首 HTML 片段
├── footer.html        # 共用的頁尾 HTML 片段
├── 404.html           # 重新導向頁面
├── style.css          # 主要的 CSS 樣式表
├── script.js          # 用於載入頁首/頁尾及其他互動功能的 JavaScript
└── img/└── icon.ico   # 網站圖示 (Favicon)
```

## 聲明

* 本會自治法規，將於整理後陸續公告上網。
* 尚未上傳之法規，歡迎點擊[本會學生議會網站](https://sites.google.com/a/stu.nknush.kh.edu.tw/ashs_sp)查詢。

## 技術棧

* **HTML5:** 網頁內容結構。
* **CSS3:** 網頁樣式與排版。
* **JavaScript (ES6):**
    * 使用 `fetch` API 非同步載入共用的 HTML 片段 (`_header.html`, `_footer.html`)。
    * 動態更新頁尾的年份和最後更新時間。