const http = require("./crud.js");


let iframe_url = "https://www.google.co.jp/maps/"
let api_url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
let keyid = "d5560ce384cf654e0c24f5b5e95b4b66"

var ymap = null
window.onload = function () {
    ymap = new Y.Map("map");
    ymap.addControl(new Y.SliderZoomControlVertical());
    ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);
}

setInterval(async () => {
    let {Lat, Lon} = ymap.getCenter()
    let d = await find(Lat, Lon)
    console.log(d)
}, 5000)

/*
 * latitude  : 緯度
 * longitude : 経度
 */
let find = async (latitude, longitude) => {
    let data = {
        keyid, latitude, longitude,
        range: 1
    }
    return await http.get(api_url, data)
}

// let index = async () => {
//     let data = await find(12.3, 123.4);
//     console.log(data)
// }
// index()
//     .then(() => {
//     })
//     .catch(() => {
//     })