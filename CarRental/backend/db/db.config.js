import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('carSwift', 'root', 'sd6266936500', {
  host: 'localhost',
  dialect: 'mysql',
  
});

sequelize.authenticate()
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    console.error(err);
  });

export default sequelize;
