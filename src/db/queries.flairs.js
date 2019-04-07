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
    getFlair(id, callback) {
        return Flair.findById(id)
            .then((flair) => {
                callback(null, flair);
            })
            .catch((err) => {
                callback(err);
            })
    },
    updateFlair(id, updatedFlair, callback){
        return Flair.findById(id)
        .then((flair) => {
          if(!flair){
            return callback("flair not found");
          }   
          flair.update(updatedFlair, {
            fields: Object.keys(updatedFlair)
          })
          .then(() => {
            callback(null, flair);
          })
          .catch((err) => {
            callback(err);
          });
        });
      },
      deleteFlair(id,callback){
        return Flair.destroy({
            where: { id }
          })
          .then((deletedRecordsCount) => {
            callback(null, deletedRecordsCount);
          })
          .catch((err) => {
            callback(err);
          })
      }
}