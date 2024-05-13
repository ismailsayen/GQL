const sequelize = require('./sequelize');
const { Model, DataTypes } = require('sequelize');

class Utilisateur extends Model {}
Utilisateur.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        numero_de_telephone: DataTypes.STRING,
        grade: DataTypes.STRING,
        sexe: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'utilisateur',
        tableName: 'utilisateur',
        timestamps: false,
    }
);

module.exports = Utilisateur;
