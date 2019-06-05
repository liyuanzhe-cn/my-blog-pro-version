function writeResult(status, msg, data) {
    return JSON.stringify({
        status,
        msg,
        data
    })
}
function JSONtoString(json) {
    return JSON.stringify(json)
}
module.exports = {
    writeResult, JSONtoString
}