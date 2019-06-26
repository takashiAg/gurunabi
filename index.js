const http = require("./crud.js");


let iframe_url = "https://www.google.co.jp/maps/"
let api_url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
let keyid = "6d85b8952e3fb799848e78a3b682109a"

var ymap = null
window.onload = function () {
    ymap = new Y.Map("map");
    ymap.addControl(new Y.SliderZoomControlVertical());
    ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);
}

// setInterval(async () => {
//     let {Lat, Lon} = ymap.getCenter()
//     let d = await find(Lat, Lon)
//     let data = JSON.parse(d)
//     table.results = data.rest;
//     console.log(data)
// }, 5000)

find_ymap = async () => {
    let {Lat, Lon} = ymap.getCenter()
    let data = await find(Lat, Lon, 1, {
        outret: 0,
        wifi: 1
    })
    // let data = JSON.parse(d)
    table.results = data;
}

/*
 * latitude  : 緯度
 * longitude : 経度
 */
let find = async (latitude, longitude, offset, option) => {
    if (typeof offset !== typeof 1)
        offset = 1
    let data = {
        keyid, latitude, longitude,
        range: 1,
        wifi: ("wifi" in option ? option.wifi : 0),
        outret: ("outret" in option ? option.outret : 0),
        offset_page: offset,
        hit_per_page: 100
    }
    let d = await http.get(api_url, data)
    d = JSON.parse(d)
    if (d.total_hit_count <= offset * 100)
        return d.rest
    let ss = await find(latitude, longitude, offset + 1)
    return d.rest.concat(ss)
}

// let find = async (latitude, longitude, offset) => {
//     let data = {
//         keyid, latitude, longitude,
//         range: 1,
//         hit_per_page: 100
//     }
//     return await http.get(api_url, data)
// }

// let index = async () => {
//     let data = await find(12.3, 123.4);
//     console.log(data)
// }
// index()
//     .then(() => {
//     })
//     .catch(() => {
//     })