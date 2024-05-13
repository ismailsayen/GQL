const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const TypeFamille = require("./TypeFamille"); // Importez le modèle TypeFamille

class Direction extends Model {}

Direction.init(
  {
    numero: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    abs: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "direction",
    tableName: "direction",
    timestamps: false,
  }
);

module.exports=Direction;
