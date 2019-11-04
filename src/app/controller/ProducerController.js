class ProducerController {
  index(req, res) {
    const winners = [];

    req.Movies.filter(x => x.winner.length !== 0).forEach(movies => {
      movies.winner.forEach(winner => {
        const winnerExist = winners.findIndex(x => x.name === winner);
        if (winnerExist >= 0) {
          winners[winnerExist].years.push(parseInt(movies.year, 10));
        } else {
          winners.push({
            name: winner,
            years: [parseInt(movies.year, 10)],
          });
        }
      });
    });
    const winnersFinal = winners
      .filter(x => x.years.length >= 2)
      .map(winner => {
        const followingWin = winner.years.reduce((a, b) => Math.max(a, b));
        const Years = winner.years.filter(m => m !== followingWin);
        const previousWin =
          Years.length === 0
            ? followingWin
            : Years.reduce((a, b) => Math.max(a, b));

        return {
          producer: winner.name,
          followingWin,
          previousWin,
          interval: followingWin - previousWin,
          years: winner.years,
        };
      })
      .filter(x => x.interval !== 0);

    const minInterval = winnersFinal.reduce((a, b) => {
      if (b.interval === Math.min(a.interval, b.interval)) {
        return b;
      }
      return a;
    }).interval;
    const min = winnersFinal.filter(w => w.interval === minInterval).shift();

    const maxInterval = winnersFinal.reduce((a, b) => {
      if (b.interval === Math.max(a.interval, b.interval)) {
        return b;
      }
      return a;
    }).interval;
    const max = winnersFinal.filter(w => w.interval === maxInterval).pop();

    return res.json({
      min: [min],
      max: [max],
    });
  }
}

export default new ProducerController();
