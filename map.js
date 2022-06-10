let createMap = () => {
    let map = L.map("map")
    map.setView([1.3521 , 103.8198] , 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map); 
    return map
}
createMap();