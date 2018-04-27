self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
      '/',
      '/index.html',
      '/voice.html',
      '/video.html',
      '/contact_us.html',
      '/data.html',
      '/company_profile.html',
      '/manifest.json',
      '/img/icon-512.png',
      '/img/icon.png',
      'index_r1_c1.gif',
      'index_r2_c1.gif',
      'index_r2_c3.gif',
      'index_r2_c5.gif',
      'index_r3_c5.gif',
      'start_r3_c7.gif',
      'index_r3_c9.gif',
      'start_r6_c7.gif',
      'index_r4_c3.gif',
      'index_r6_c8.gif',
      'a_index_r6_c6.gif',
      'index_r6_c5.gif',
      'index_r5_c4.gif',
      'a_start_r5_c2.gif',
      'index_r5_c1.gif',
      'index_r7_c2.gif',
      'index_r8_c6.gif',
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  console.log('fetching ...',event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(CACHE_NAME)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}