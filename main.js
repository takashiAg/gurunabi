const http = require("./crud.js");

let main = async () => {
    let d = await http.get("https://google.com/", {})
}
main()