// 將 CACHE_NAME 設為一個佔位符，讓自動化腳本替換
const CACHE_NAME = 'my-pwa-cache-v-605ed4b'; // 注意這裡的 605ed4b
const urlsToCache = [
'../Ashs-Student-Association-Laws/',
'../Ashs-Student-Association-Laws/index.html',
'../Ashs-Student-Association-Laws/styles.css',
'../Ashs-Student-Association-Laws/script.js',
'../Ashs-Student-Association-Laws/act01.html',
'../Ashs-Student-Association-Laws/act02.html',
'../Ashs-Student-Association-Laws/act03.html',
'../Ashs-Student-Association-Laws/act04.html',
'../Ashs-Student-Association-Laws/act05.html',
'../Ashs-Student-Association-Laws/act06.html',
'../Ashs-Student-Association-Laws/act07.html',
'../Ashs-Student-Association-Laws/act08.html',
'../Ashs-Student-Association-Laws/directions01.html',
'../Ashs-Student-Association-Laws/overview.html',
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
    })
);
});

// 攔截網路請求並返回緩存的資源
self.addEventListener('fetch', (event) => {
event.respondWith(
    caches.match(event.request)
    .then((response) => {
        if (response) {
        return response;
        }
        return fetch(event.request);
    })
);
});

// 清理舊的緩存
self.addEventListener('activate', (event) => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
    caches.keys().then((cacheNames) => {
    return Promise.all(
        cacheNames.map((cacheName) => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
        }
        })
    );
    })
);
});
