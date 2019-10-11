module.exports = (sequelize, DataTypes) => {
    const stockID = sequelize.define('stockID', {
      stockID: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        charset: 'utf8',
      } ,
      ID: DataTypes.STRING,
    },{
        timestamps: false,
        collate: 'utf8_general_ci',
        charset: 'utf8'
    })
    return stockID
  }