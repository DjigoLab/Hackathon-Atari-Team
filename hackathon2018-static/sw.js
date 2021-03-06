self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('v1').then(function(cache) {
     cache.matchAll('/img/').then(function (response) {
       response.forEach(function(element, index, array) {
         // cache.delete(element);
         console.log('element',element)
       });
     })
     return cache.addAll([
      '/',
      '/index.html',
      '/voice.html',
      '/video.html',
      '/contact_us.html',
      '/data.html',
      '/company_profile.html',
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