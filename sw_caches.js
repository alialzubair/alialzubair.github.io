// set namecache and cachesAssest var
const cacheName = 'v2';
// const urls = [ 'index.html', 'about.html', 'contect.html', 'mywork.html', '/css/main.css' ];

// call install Event
self.addEventListener('install', (e) => {
	console.log('service worker install');
});

// acll activate event
self.addEventListener('activate', (e) => {
	console.log('service activate');
	caches.keys().then((urls) => {
		return Promise.all(
			urls.map((cache) => {
				if (cache !== cacheName) {
					console.log('service worker:clearing old caches');
					return caches.delete(cache);
				}
			})
		);
	});
});

// call fetch event
self.addEventListener('fetch', (e) => {
	console.log('service worker fetched');
	e.respondWith(
		fetch(e.request)
			.then((res) => {
				//make copy/clone of response
				const resClone = res.clone();

				// open caches
				caches.open(cacheName).then((cache) => {
					// add response to cache
					cache.put(e.request, resClone);
				});
				return res;
			})
			.catch((err) => caches.match(e.request).then((res) => res))
	);
});
