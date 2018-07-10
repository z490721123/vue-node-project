var fs = require('fs');
var path = require('path');
var moment = require('moment');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        var t = moment().format('YYYY-M-D');
        var distPath = `../uploads/${t}`;

        if (!fs.existsSync('../uploads')) {
            fs.mkdirSync('../uploads');
        }

        if (!fs.existsSync(distPath)) {
            fs.mkdirSync(distPath);
        }

        cb(null, distPath);
    },

    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

var upload = multer({storage: storage});

module.exports = upload;