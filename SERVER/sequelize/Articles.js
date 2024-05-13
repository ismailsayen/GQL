const sequelize = require("./sequelize");
const { Model, DataTypes } = require("sequelize");
const Sousfamille = require("./Sousfamille");
const Famille = require("./Famille");
class Articles extends Model {}

Articles.init(
  {
    id_article: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: DataTypes.STRING,
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    um: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dateentre: DataTypes.DATE,
    quantite: DataTypes.INTEGER,
    c_sous_famille: {
      type: DataTypes.INTEGER,
      references: {
        model: "sousfamille",
        key: "c_sous_famille",
      },
    },
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
    modelName: "articles",
    tableName: "articles",
    timestamps: false,
  }
);
Articles.belongsTo(Sousfamille, {
  foreignKey: "c_sous_famille",
  targetKey: "c_sous_famille",
});
Articles.belongsTo(Famille, {
  foreignKey: "c_famille",
  targetKey: "c_famille",
});

module.exports = Articles;
