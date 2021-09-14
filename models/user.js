const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    //Run password check on each User
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freeTableName: true,
        underscored: true,
        modelName: 'User'
    },
    {
        //Table config options go here (https://sequelize.org/v5/manual/models-definition.html#configuration)
        hooks: {
            //beforeCreate lifecycle 'hook' function
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 8);
                return newUserData;
            },
            //beforeUpdate lifecycle 'hook' function
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 8);
            }
        },
        sequelize,
        //Do not create timestamps for createdAt/updatedAt
        timestamps: false,
        freezeTableName: true,
        //Underscore > Camel Casing
        underscored: true,
        //Force name to be 'user' in db
        modelName: 'user'
    }
);

module.exports = User;