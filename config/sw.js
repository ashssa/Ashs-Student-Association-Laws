// 將 CACHE_NAME 設為一個佔位符，讓自動化腳本替換
const CACHE_NAME = 'my-pwa-cache-v-%%VERSION%%'; // 注意這裡的 %%VERSION%%
const urlsToCache = [
'/Ashs-Student-Association-Laws/',
'/Ashs-Student-Association-Laws/public/public/index.html',
'/Ashs-Student-Association-Laws/public/css/styles.css',
'/Ashs-Student-Association-Laws/public/js/script.js',
'/Ashs-Student-Association-Laws/public/act/act01.html',
'/Ashs-Student-Association-Laws/public/act/act02.html',
'/Ashs-Student-Association-Laws/public/act/act03.html',
'/Ashs-Student-Association-Laws/public/act/act04.html',
'/Ashs-Student-Association-Laws/public/act/act05.html',
'/Ashs-Student-Association-Laws/public/act/act06.html',
'/Ashs-Student-Association-Laws/public/act/act07.html',
'/Ashs-Student-Association-Laws/public/act/act08.html',
'/Ashs-Student-Association-Laws/public/directions/directions01.html',
'/Ashs-Student-Association-Laws/public/directions/overview.html',
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
