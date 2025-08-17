# 高師大附中學生會自治法規共用系統
這是一個使用純 HTML、CSS 和 JavaScript 建置的靜態網站，用於展示高師大附中學生會（以下簡稱本會）自治法規。

## 專案目的

* 提供一個清晰、易於存取的平台，讓本會會員查詢本會自治法規。
* 簡化法規網站的維護流程，如頁首、頁尾與功能列表的更新。 

## 聲明

* 法規沿革，請本會[學生議會「修法歷程」頁面](https://sites.google.com/a/stu.nknush.kh.edu.tw/ashs_sp/laws/修法歷程)查詢。
* 本網站節選部分本校校務章則，實際內容請依[本校官網「校務章則」](https://sites.google.com/tea.nknush.kh.edu.tw/fagui/)或學生手冊查詢為準。
* 本網站之內容不定期更新，最新公告施行法規，將於完成法規整編作業後更新上線。如需查詢最新法規，請至[本會學生議會網站](https://sites.google.com/a/stu.nknush.kh.edu.tw/ashs_sp/laws/法規彙編)查詢。
* 本網站自治法規資料，係由本會學生議會提供之電子檔或書面文字登打製作。若與會長令或學生議會之公布文字有所不同，仍以該法規之會長令或學生議會之公布資料為準。</li>

## 網站設計原則

### CSS 框架

* 採用 Daisy UI、Tailwind CSS，營造乾淨現代的使用者介面。

### 字型

| **#** | **語系** | **樣式** | **字型**                    |
|-------|--------|--------|---------------------------|
| 1     | 中文     | 行號     | 未來熒黑                      |
| 2     | 中文     | 其他     | Noto Sans TC              |
| 3     | 英文     | 條號     | Noto Sans ExtraCondensed  |
| 4     | 英文     | 附件清單編號 | Reddit Sans               |
| 5     | 圖示     | 另開新視窗  | Material Symbols Outlined |

### 主題

* 使用 Daisy UI 內建主題控制器，調整多種主題。

### Logo
* 使用「SA」二字意象，套用湛藍晴空顏色，用於網站圖示（Favicon）、PWA 縮圖。

## 待辦清單

- [ ] 增加「修法沿革時間軸」
- [ ] 增加「學生會自治法規制度程序」
- [ ] 編輯使用者手冊、網站設計理念與說明
- [x] ~~校對本系統各部法規是否正確無誤~~
- [x] ~~調整附件顯示格式，方便閱讀及與主要內容區分~~
- [x] ~~響應式設計：項、目縮排調整~~

## 檔案架構

```
/Ashs-Student-Association-Laws
├── public
│   ├── act                             # 各法規
│   │   ├── act01.html                  # 組織章程
│   │   ├── act02.html                  # 學生代表法
│   │   ├── act03.html                  # 行政中心組運法
│   │   ├── act04.html                  # 學生議會組運法
│   │   ├── act05.html                  # 選舉罷免法
│   │   ├── act06.html                  # 學生會經費法
│   │   ├── act07.html                  # 自治法規標準法
│   │   ├── act08.html                  # 學生政黨法
│   │   ├── oldAct01.html               # 【已廢止】學生會組織辦法
│   │   └── oldAct02.html               # 【已廢止】學生議員選罷法
│   ├── assets
│   │   ├── XX ___法 附件X ___.pdf      # 各法規附件
│   │   ├── index.html                  # 附件導覽 
│   │   └── sitemap.xml
│   ├── components                      # 共用組件資料夾
│   │   ├── buttons.html                # 法規功能選單
│   │   ├── footer.html                 # 頁尾
│   │   └── header.html                 # 頁首
│   ├── css                             # 樣式選單
│   │   ├── 01-base                     # 01- 基本樣式
│   │   │   ├── 01-base.css
│   │   │   └── 02-fonts.css
│   │   ├── 02-layout                   # 02- 排版樣式
│   │   │   ├── 01-layout.css
│   │   │   └── 02-home.css
│   │   ├── 03-components               # 03- 共用樣式
│   │   │   ├── 01-legal-content.css
│   │   │   ├── 02-lists.css
│   │   │   └── 03-misc.css
│   │   ├── 04-utilities                # 04- 功能樣式
│   │   │   └── 01-responsive.css
│   │   ├── .style.css                  # 棄用樣式
│   │   ├── input.css                   # 輸入樣式
│   │   └── style.css                   # 輸出樣式
│   ├── direction                       # 校務章則選
│   │   ├── direction01.html            # 學校會議旁聽要點
│   │   └── overview.html               # 自治法規架構圖
│   ├── fonts
│   │   ├── GlowSansTCCompressed-Bold.woff  # 未來熒黑 woff（用於條號中的中文字）
│   │   └── GlowSansTCCompressed-Bold.woff2 # 未來熒黑 woff2
│   ├── img
│   │   ├── icon-194.png                # PWA 縮圖
│   │   ├── icon-256.png
│   │   ├── icon-512.png
│   │   ├── icon.ico                    # 網站圖示 (Favicon)
│   │   ├── icon.png
│   │   ├── icon.svg
│   │   ├── Preview 3.png
│   │   ├── shortcuts01-512.png
│   │   └── shortcuts02-512.png
│   ├── js
│   │   └── script.js
│   ├── contact_us.html
│   ├── index.html
│   ├── script.js
│   ├── test.html
│   └── testlocal.html
├── 404.html
├── googlee4a1512e361cec00.html
├── package-lock.json
├── package.json
└── README.md
```



# 舊版說明（2025 / 07 / 31 前）

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