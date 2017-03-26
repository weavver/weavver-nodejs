console.log('Started', self);

self.addEventListener('install', function(event) {

     event.waitUntil(
          caches.open('v1').then(function(cache) {
               return cache.addAll([
                    '/index.html',
                    '/scripts/weavver.js',
                    '/styles/Master.css'
               ]);
          })
     );

     console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
     console.log('Activated', event);
});

//self.addEventListener('push', function(event) {
//     console.log('Push message received', event);
//     // TODO
//});

this.addEventListener('fetch', function(event) {
     return fetch(event.request);

     //event.respondWith(
     //     caches.match(event.request).then(function(resp) {
     //          console.log(resp.request);
     //          return resp || fetch(event.request).then(function(response) {
     //                    return caches.open('v1').then(function(cache) {
     //                         cache.put(event.request, response.clone());
     //                         return response;
     //                    });
     //               });
     //     })
     //);
});