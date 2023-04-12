const path = require("path");
const multer = require("multer");

////////////////////multer-start///////////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "image") {
            cb(
                null,
                path.join(__dirname, "../public/ProductImage"),
                function (err, success) {
                    if (err) throw err;
                },
            );
        }
        else {
            cb(
                null,
                path.join(__dirname, "../public/images"),
                function (err, success) {
                    if (err) throw err;
                },
            );
        }
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name, function (error1, success1) {
            if (error1) throw error1;
        });
    },
});
//
const upload = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            console.log("only jpg & png file supported !");
            callbackPromise(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
});

module.exports = { upload };