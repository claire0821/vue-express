module.exports = (sequelize, DataTypes) => {
    const Login_a = sequelize.define('Login_a', {  
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      latestlogin: DataTypes.DATE  
    })
  
    return Login_a
  }
  