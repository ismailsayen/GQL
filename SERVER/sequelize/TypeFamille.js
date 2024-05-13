const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");

class Typefamille extends Model {}

Typefamille.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "typefamille",
    tableName: "typefamille",
    timestamps: false,
  }
);
module.exports=Typefamille