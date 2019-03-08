'use strict';
module.exports = (sequelize, DataTypes) => {
    var Flair = sequelize.define('Flair', {
        name: DataTypes.STRING,
        color: DataTypes.STRING,
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    Flair.associate = function (models) {
        // associations can be defined here
        Flair.belongsTo(models.Post, {
            foreignKey: "postId",
            onDelete: "CASCADE"
        });
    };
    return Flair;
};