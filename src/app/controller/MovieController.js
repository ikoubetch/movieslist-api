import csv from 'csv-parser';
import fs from 'fs';

class MovieController {
  store(req, res) {
    try {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', row => {
          const rowObj = Object.values(row)
            .join(';')
            .split(';');
          const tmpWinner = [];
          if (rowObj[4].trim() === 'yes') {
            rowObj[3].split(' and ').map(p => tmpWinner.push(p));
          } else if (rowObj[4] !== '') {
            rowObj[4].split(' and ').map(win => tmpWinner.push(win.trim()));
          }
          req.Movies.push({
            year: rowObj[0],
            title: rowObj[1],
            studios: rowObj[2],
            producers: rowObj[3].trim(),
            winner: tmpWinner,
          });
        })
        .on('end', () => {
          return res
            .status(201)
            .json({ Message: 'Arquivo importado!', Db: req.Movies });
        });
    } catch (err) {
      return res
        .status(400)
        .json({ Error: 'Falha ao incializar banco em memória', Detail: err });
    }
  }
}

export default new MovieController();
