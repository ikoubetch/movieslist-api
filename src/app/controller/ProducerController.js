class ProducerController {
  index(req, res) {
    const producers = req.Movies.map(s => s.producers).filter(
      (value, index, self) => {
        return self.indexOf(value) === index;
      }
    );

    const intervalResult = [];

    producers.forEach(producer => {
      const Movies = req.Movies.filter(
        m => m.producers === producer && m.winner.length !== 0
      );

      if (Movies.length >= 2) {
        let Years = Movies.map(m => parseInt(m.year, 10));
        const followingWin = Years.reduce((a, b) => Math.max(a, b));
        Years = Years.filter(m => m !== followingWin);
        const previousWin =
          Years.length === 0
            ? followingWin
            : Years.reduce((a, b) => Math.max(a, b));

        intervalResult.push({
          producer,
          followingWin,
          previousWin,
          interval: followingWin - previousWin,
        });
      }
    });

    const min = intervalResult.reduce((a, b) => {
      if (b.interval === Math.min(a.interval, b.interval)) {
        return b;
      }
      return a;
    });
    const max = intervalResult.reduce((a, b) => {
      if (b.interval === Math.max(a.interval, b.interval)) {
        return b;
      }
      return a;
    });

    return res.json({
      min,
      max,
    });
  }
}

export default new ProducerController();
