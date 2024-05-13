const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const Famille = require('./Famille');


class Sousfamille extends Model {}

Sousfamille.init(
  {
    c_sous_famille: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: DataTypes.STRING,
    c_famille: {
      type: DataTypes.INTEGER,
      references: {
        model: "famille",
        key: "c_famille",
      },
    },
  },
  {
    sequelize,
    tableName: "sous_famille",
    modelName: "sous_famille",
    timestamps: false,
  }
);
Sousfamille.belongsTo(Famille, {
  foreignKey: "c_famille",
  targetKey: "c_famille",
});

module.exports = Sousfamille;
