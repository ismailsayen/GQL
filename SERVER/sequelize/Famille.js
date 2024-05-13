const sequelize = require('./sequelize');
const { Model, DataTypes } = require('sequelize');
const TypeFamille = require('./TypeFamille'); 

class Famille extends Model {}

Famille.init(
    {
        c_famille:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom:DataTypes.STRING,
        type_id: {
            type: DataTypes.INTEGER, 
            references: {
                model: 'typefamille',
                key: 'id' 
            }
        }
    },
    {
        sequelize,
        modelName: 'famille',
        tableName: 'famille',
        timestamps: false,
    }
);

Famille.belongsTo(TypeFamille, { foreignKey: 'type_id', targetKey: 'id' });

module.exports = Famille;
