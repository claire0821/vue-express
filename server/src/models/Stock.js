module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
      stockID: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        charset: 'utf8',
      } ,
      openingPrice: DataTypes.FLOAT,
      closingPrice: DataTypes.FLOAT,
      currentPrice: DataTypes.FLOAT,
      highestPrice: DataTypes.FLOAT,
      lowestPrice: DataTypes.FLOAT,
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME
    },{
        timestamps: false,
        collate: 'utf8_general_ci',
        charset: 'utf8'
    })
    return Stock
  }