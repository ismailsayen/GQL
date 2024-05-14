const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const Pc = require("./Pc");

class Pannes extends Model {}

Pannes.init(
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
    modelName: "pannes",
    tableName: "pannes",
    timestamps: false,
  }
);

Pannes.belongsTo(Pc, {
  foreignKey: "pc_n_serie",
  targetKey: "n_serie",
});

module.exports = Pannes;
