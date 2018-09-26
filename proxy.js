const https = require("https")


module.exports = function proxy(url, mimeType) {
    return (req, res, next) => {
        https.get(url, (response) => {
            console.log('statusCode:', response.statusCode);
            //console.log('headers:', response.headers);
            res.type(mimeType)
    
            response.on('data', (d) => {
                res.write(d)
            });
            response.on('end', () => {
                res.end()
            })
    
        }).on('error', (e) => {
            console.error(e);
            next(e)
        });
    }
}