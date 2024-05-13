const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const Direction = require("./Direction");

class Bureau extends Model {}

Bureau.init(
  {
    c_bureau: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
    },
    nom: DataTypes.STRING,
    abs: {
      type: DataTypes.STRING,
      references: {
        model: "direction",
        key: "abs",
      },
    },
  },
  {
    sequelize,
    modelName: "bureau",
    tableName: "bureau",
    timestamps: false,
  }
);
Bureau.belongsTo(Direction, { foreignKey: "abs", targetKey: "abs" });
module.exports = Bureau;
