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
    createAdvert(advert, callback) {
        return Advertisement.create(advert)
            .then((advert) => {
                callback(null, advert);
            })
            .catch((err) => {
                callback(err);
            })
    },
    getAdvert(id, callback) {
        return Advertisement.findById(id)
            .then((advert) => {
                callback(null, advert);
            })
            .catch((err) => {
                callback(err);
            })
    },
    deleteAdvert(id, callback) {
        return Advertisement.destroy({
            where : {id}
        })
            .then((advert) => {
                callback(null, advert);
            })
            .catch((err) => {
                callback(err);
            })
    },
    updateAdvert(id, updatedAdvert, callback){
        return Advertisement.findById(id)
        .then((advert) => {
          if(!advert){
            return callback("Advertisement not found");
          }
          advert.update(updatedAdvert, {
            fields: Object.keys(updatedAdvert)
          })
          .then(() => {
            callback(null, advert);
          })
          .catch((err) => {
            callback(err);
          });
        });
      }


}