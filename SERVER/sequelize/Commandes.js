const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const Articles = require("./Articles");
const Bureau = require("./Bureau");

class Commandes extends Model {}

Commandes.init(
  {
    id_commande:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_article:{
      type: DataTypes.INTEGER,
        references: {
          model: Articles,
          key: "id_article",
        },
    },
    c_bureau:{
      type: DataTypes.INTEGER,
        references: {
          model: Bureau,
          key: "c_bureau",
        },
    },
    date_commande:DataTypes.DATE,
    quantite:DataTypes.INTEGER

  },
  {
    sequelize,
    modelName: "commandes",
    tableName: "commandes",
    timestamps: false,
  }
);

Commandes.belongsTo(Articles, {
  foreignKey: "id_article",
  targetKey: "id_article",
});
Commandes.belongsTo(Bureau, {
  foreignKey: "c_bureau",
  targetKey: "c_bureau",
});

module.exports = Commandes;
