import updateDotenv from 'update-dotenv';
import getToken from '../../shared/utils/getToken';


const key = getToken();

updateDotenv({ SECRET: key })
  .then(() => {
    console.info('Secret key created successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('ERROR: ', error);
    process.exit(1);
  });
