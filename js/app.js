// check  the server worker is support
if('serviceWorker' in navigator){
    // register services
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('../sw_caches.js').then(reg=>console.log('service worker register')).catch(err=>console.log(`service worker:error:${err}`))
    })
    
}