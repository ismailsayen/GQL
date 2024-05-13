const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const Bureau = require("./Bureau");
const Famille = require("./Famille");

class Pc extends Model {}

Pc.init(
  {
    n_serie: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    marque: DataTypes.STRING,
    
    c_technique: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_entre_magasin: DataTypes.DATE,
    servie_affecte: {
      type: DataTypes.INTEGER,
      references: {
        model: Bureau,
        key: "c_bureau",
      },
    },
    date_affectation: DataTypes.DATE,
    c_famille: {
      type: DataTypes.INTEGER,
      references: {
        model: Famille,
        key: "c_famille",
      },
    },
  },
  {
    sequelize,
    modelName: "pc",
    tableName: "pc",
    timestamps: false,
  }
);

Pc.belongsTo(Bureau, {
  foreignKey: "servie_affecte",
  targetKey: "c_bureau",
});

Pc.belongsTo(Famille, {
  foreignKey: "c_famille",
  targetKey: "c_famille",
});

module.exports = Pc;
