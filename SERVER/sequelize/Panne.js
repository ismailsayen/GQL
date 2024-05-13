const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const Pc = require("./Pc");

class Panne extends Model {}

Panne.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pc_n_serie: {
        type: DataTypes.STRING,
        references: {
          model: Pc,
          key: "n_serie",
        },
    },
    date_panee: DataTypes.DATE,
    description:DataTypes.TEXT
  },
  {
    sequelize,
    modelName: "panne",
    tableName: "panne",
    timestamps: false,
  }
);

Panne.belongsTo(Pc, {
  foreignKey: "n_serie",
  targetKey: "pc_n_serie",
});

module.exports = Panne;
