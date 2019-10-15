module.exports = (sequelize, DataTypes) => {
    const StockID = sequelize.define('StockID', {
      stockID: DataTypes.STRING,
      name: DataTypes.STRING,
    },{
        timestamps: false,
        collate: 'utf8_general_ci',
        charset: 'utf8'
    })
    return StockID
  }