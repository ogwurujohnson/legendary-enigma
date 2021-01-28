import logger from './utils/logger';
import app from './app';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost'

const server = app.listen(PORT, () => {
  logger.info(`App Running on ${HOST}:${PORT}`)
  logger.info("Press CTRL-C to stop\n");
});

export default server;