let templeLayer = L.layerGroup()
templeLayer.addTo(map)
let yueLaoLayer = L.layerGroup()


let showTemples = async () => {
    let temple_response = await axios.get('./data/templeList.json')
    let templeList = temple_response.data
    
    let templeCluster = L.markerClusterGroup();
    
    let templeIcon = L.icon({
        iconUrl: './data/chineseTemple.png',
        // shadowUrl: './data/chineseTemple.png',
        iconSize:     [38, 50], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    
    
    for(i = 0; i < 350; i++){
        let templeCoordinates = [templeList[String(i)].lat , templeList[String(i)].lng]
        let chinese_name = templeList[String(i)].chiName 
        let english_name = templeList[String(i)].engName 
        
        let templeMarker = L.marker(templeCoordinates , {icon: templeIcon})/*.addEventListener('click' , 
        () => {findVegetarian(templeCoordinates[0] , templeCoordinates[1] , templeCoordinates)}) */
        
        templeMarker.bindPopup(`
            <h1>${chinese_name}</h1>
            <h2>${english_name}</h2>
        `)
        templeMarker.addTo(templeCluster)
    }
    // templeCluster.addTo(templeLayer)
    return templeCluster
}

let yueLaoMarker = L.marker([1.284284 , 103.849579]).bindPopup(`
    <h1>粤海清庙</h1>
    <h2>Yueh Hai Ching Temple</h2>
`).addTo(yueLaoLayer)

templeLayer = showTemples();

let baseLayers = {
    "Show all temples": templeLayer,
    "For Relationships": yueLaoLayer
}

L.control.layers(baseLayers , {}).addTo(map)