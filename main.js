const http = require("./crud.js");
let api_url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
let keyid = "35bdc81c912412d08cb70f6e98c06e7f"

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

let main = async () => {
    let d = await find(12.3, 123.4)
    console.log(d)
}
main()