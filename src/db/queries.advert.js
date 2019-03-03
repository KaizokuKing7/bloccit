const Advertisement = require("./models").Advertisement;

module.exports = {


    getAllAdverts(callback) {
        return Advertisement.all()
            .then((adverts) => {
                callback(null, adverts);
            })
            .catch((err) => {
                callback(err);
            })
    },
    createAdvert(advert, callback){
        return Advertisement.create({
            title: advert.title,
            description: advert.description
        })
        .then((advert) =>{
            callback(null, advert);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateAdvert(advert,callback){
        
    }


}