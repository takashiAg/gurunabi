const http = require("./crud.js");

const fs = require('fs')

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

find_ymap = async (wifi, outret) => {
    let {Lat, Lon} = ymap.getCenter()
    let opt = {
        outret,
        wifi
    }
    let data = await find(Lat, Lon, 1, opt)
    // let data = JSON.parse(d)
    table.results = data;

    let file_data = "飲食店店名,ジャンル,立地,営業j時間,定休日・臨時定休日,コンセント,Wi-fi,禁煙,英語対応,エレベーター,座席数,他のサービスの導入,電話番号,住所,反応やアドバイス,外部リンクURL,FB,Twitter,インスタグラム\n";
    for (let d of data) {
        file_data += ""
            + d.name + ","
            + d.category + ","
            + d.access.station.replace("\n", "") + "から徒歩" + d.access.walk + "分" + ","
            + d.opentime.replace(/\r?\n/g, "") + ","
            + ","
            + ","
            + ","
            + ","
            + ","
            + ","
            + ","
            + ","
            + d.tel + ","
            + d.address + ","
            + ","
            + d.url + ","
            + "\n"
    }
    console.log(file_data)
    let filename
        = document.getElementById("filename").value
        + (opt.wifi == 1 ? "-wifi" : "")
        + (opt.outret == 1 ? "-outret" : "")
        + ".csv"
    fs.writeFileSync("data/" + filename, file_data)
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
    let ss = await find(latitude, longitude, offset + 1, option)
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