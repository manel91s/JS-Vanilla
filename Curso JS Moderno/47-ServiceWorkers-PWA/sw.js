const nombreCache = 'apv-v2';

// Guardamos los archivos que queramos cachear en caso de no tener conexión
const archivos = [
    './',
    './index.html',
    './error.html',
    './css/bootstrap.css',
    './css/styles.css',
    './js/app.js',
    './js/apv.js'
];

// Cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('Instalado el service worker');
    
     //Esperar a que todos los archivos se guarden en caché
     e.waitUntil(
        caches.open(nombreCache)
        .then( cache => {
            console.log('cacheando');
            cache.addAll(archivos)
        })
    )
})

//Activar el service worker
self.addEventListener('activate', e => {
    
    // Actualizar las nuevas modificaciones de la app progresive en la caché
    e.waitUntil(
        caches.keys()
              .then(keys => {
                  return Promise.all(
                      //Borrar las versiones anteriores
                      keys.filter( key => key !== nombreCache)
                          .map(key => caches.delete(key)) 
                  )
              })
    )
});

// Evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                // En caso de que exista la petición de la URL a la que queramos acceder en la caché se la devolvemos
                if(respuestaCache) {
                    return respuestaCache;
                }

                //En caso de que no exista la URL retornamos la pagian de error
                return caches.match('./error.html');
            })
           
    )   
})
