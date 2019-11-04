import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import MemoryDb from './app/middleware/MemoryDb';

import MovieController from './app/controller/MovieController';
import ProducerController from './app/controller/ProducerController';

const routes = new Router();
const upload = multer(multerConfig);

routes.use(MemoryDb);

routes.get('/', (req, res) => res.json({ Message: 'API Ok' }));

routes.post('/movies/import', upload.single('file'), MovieController.store);
routes.get('/producer/rank', ProducerController.index);

export default routes;
