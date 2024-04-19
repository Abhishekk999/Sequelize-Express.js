const dbConfig = {
    user:"postgres",
    host:"localhost",
    database:"postgres",
    password:"Admin@1234",
    port:5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}

export default dbConfig;