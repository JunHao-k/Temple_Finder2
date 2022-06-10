
let showAllTemples = async () => {
    let response = await axios.get('./data/templeList.json')
    let templeList = response.data
    // let vCheck = false
    
    let templeLayer = L.layerGroup()
    templeLayer.addTo(map)

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
        
        let templeMarker = L.marker(templeCoordinates , {icon: templeIcon}).addEventListener('click' , 
        () => {findVegetarian(templeCoordinates[0] , templeCoordinates[1] , templeCoordinates)}) 
        
        templeMarker.bindPopup(`
            <h1>${chinese_name}</h1>
            <h2>${english_name}</h2>
        `)
        
        templeMarker.addTo(templeCluster)
    }
    templeCluster.addTo(templeLayer)
    // console.log(vCheck)
    return templeLayer
}
