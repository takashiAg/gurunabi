const {XMLHttpRequest} = require("xmlhttprequest")

function url_encode(data) {
    let query_string = "";
    for (let d in data) {
        if (query_string != "")
            query_string += "&";
        query_string += d + "=" + data[d]
    }
    return query_string
}

exports.get = function (url, query) {
    if (query !== undefined && query instanceof Object) {
        if (query instanceof Array) {
            if (url.slice(-1) == "/")
                url = url.slice(0, -1)
            for (let d of query)
                url += "/" + d
            return this.get(url)
        } else {
            if (!Object.keys(query).length)
                return this.get(url);
            let query_string = url_encode(query)
            return this.get(url + "?" + query_string)
        }
    }
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200")
                resolve(xhr.responseText)
            else
                reject(xhr.responseText)
        }
        xhr.send(null);
    })
}


exports.post = function (url, data) {
    return new Promise((resolve, reject) => {
        let query_string = url_encode(data)
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200")
                resolve(xhr.responseText)
            else
                reject(xhr.responseText)
        }
        xhr.send(query_string);
    })
}

exports.post_json = function (url, data) {
    return new Promise((resolve, reject) => {
        let json = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200")
                resolve(xhr.responseText)
            else
                reject(xhr.responseText)
        }
        xhr.send(json);
    })
}

exports.put = function (url, data) {
    return new Promise((resolve, reject) => {
        let json = JSON.stringify(data);

        let xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            if (xhr.readyState == 4 && (xhr.status == "200" || xhr.status == "201"))
                resolve(xhr.responseText)
            else
                reject(xhr.responseText)
        }
        xhr.send(json);
    })
}

exports.del = function (url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == "200")
                resolve(xhr.responseText)
            else
                reject(xhr.responseText)
        }
        xhr.send(null);
    })
}

