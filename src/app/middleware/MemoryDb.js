import { resolve } from 'path';
import csv from 'csv-parser';
import fs from 'fs';

const Movies = [];

export default (req, res, next) => {
  try {
    if (Movies.length !== 0) {
      req.Movies = Movies;
      return next();
    }
    fs.createReadStream(resolve(__dirname, '..', '..', 'test', 'movielist.csv'))
      .pipe(csv())
      .on('data', row => {
        const rowObj = Object.values(row)
          .join(';')
          .split(';');
        Movies.push({
          year: rowObj[0],
          title: rowObj[1],
          studios: rowObj[2],
          producers: rowObj[3],
          winner: rowObj
            .splice(4, rowObj.length - 4)
            .filter(winner => winner !== ''),
        });
      })
      .on('end', () => {
        req.Movies = Movies;
        return next();
      });
  } catch (err) {
    return res
      .status(400)
      .json({ Error: 'Falha ao incializar banco em memória', Detail: err });
  }
};
