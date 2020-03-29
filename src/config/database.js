require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    paranoid: true, // cria campo deleted_at, assim o campo não é excluído do BD
    freezeTableName: true, // deixa o nome da tabela como está na migration
  },
};
