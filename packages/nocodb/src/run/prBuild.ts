import cors from 'cors';
import path from 'path';
import express from 'express';

import Noco from '../lib/Noco';

const server = express();
server.enable('trust proxy');
server.use(cors());
server.use('/dashboard', express.static(path.join(__dirname, 'nc-gui')));
server.set('view engine', 'ejs');

(async () => {
  const httpServer = server.listen(process.env.PORT || 8080, () => {
    console.log(`App started successfully.\nVisit -> ${Noco.dashboardUrl}`);
  });
  server.use(await Noco.init({}, httpServer, server));
})().catch((e) => console.log(e));
