# 高師大附中學生會自治法規共用系統

這是一個使用純 HTML、CSS 和 JavaScript 建置的靜態網站，用於展示高師大附中學生會（以下簡稱本會）自治法規。
本網站透過 JavaScript 動態載入共用的頁首 (Header) 和頁尾 (Footer)，方便統一管理和更新。

## 專案目的

* 提供一個清晰、易於存取的平台，讓本會會員查詢本會自治法規。
* 簡化法規網站的維護流程，如頁首、頁尾與功能列表的更新。 

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
├── overview.html      # 自治法規架構圖
├── directions01.html  # 本校會議旁聽要點
├── header.html        # 共用的頁首 HTML 片段
├── footer.html        # 共用的頁尾 HTML 片段
├── buttons.html       # 共用的功能列表 HTML 片段
├── 404.html           # 重新導向頁面
├── style.css          # 主要的 CSS 樣式表
├── script.js          # 用於載入頁首/頁尾及其他互動功能的 JavaScript
└── img/               # 圖示資料夾
    └── icon.ico       # 網站圖示 (Favicon)
    └── icon-xxx.png   # PWA 縮圖（xxx 表示尺寸）
    └── Preview 3.png  # 網站預覽縮圖
└── attachments/       # 自治法規附件資料夾
└── manifest.json      # PWA 資訊清單
└── sw.js              # PWA 緩存設定
```

## 聲明

* 本會自治法規，將於整理後陸續公告上網。
* 尚未上傳之法規，歡迎點擊[本會學生議會網站](https://sites.google.com/a/stu.nknush.kh.edu.tw/ashs_sp)查詢。
* 本網站之內容不定期更新，最新公告施行法規，將於完成法規整編作業後更新上線。
* 本網站自治法規資料，係由本會學生議會提供之電子檔或書面文字登打製作，若與會長令或學生議會之公布文字有所不同，仍以該法規會長令或學生議會之公布資料為準。

## 待辦清單

- [ ] 編輯使用者手冊、網站設計理念與說明
- [x] ~~校對本系統各部法規是否正確無誤~~
- [x] ~~調整附件顯示格式，方便閱讀及與主要內容區分~~
- [x] ~~響應式設計：項、目縮排調整~~

## 技術棧

* **HTML5:** 網頁內容結構。
* **CSS3:** 網頁樣式與排版。
* **JavaScript (ES6):**
    * 使用 `fetch` API 非同步載入共用的 HTML 片段 (`header.html`, `footer.html`, `buttoms.html`)。
    * 動態更新頁尾的年份和最後更新時間。