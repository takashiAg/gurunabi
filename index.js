const http = require("./crud.js");


let iframe_url = "https://www.google.co.jp/maps/"
let api_url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
let keyid = "35bdc81c912412d08cb70f6e98c06e7f"

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
}, 100)

/*
 * latitude  : 緯度
 * longitude : 経度
 */
let find = async (latitude, longitude) => {
    let data = {
        keyid, latitude, longitude
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