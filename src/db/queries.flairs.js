const Flair = require("../db/models").Flair;


module.exports = {
    addFlair(newflair, callback){
        return Flair.create(newflair)
        .then((flair) => {
            callback(null,flair);
        })
        .catch((err) => {
            callback(err);
        })
    },
}