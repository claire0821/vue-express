module.exports = {
    port:8089,
    db:{
        database: 'mydb',
        user: 'root',
        password: '123456',
        options:{
            dialect: 'mysql',
            host: 'localhost',
            port: '3307',
            storage: './example.mysql'
        }
    },
    authentication:{
        jwtSecret: 'claire'
    },
    timezone: '+08:00'
}
