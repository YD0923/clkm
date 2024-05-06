const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const port = process.env.PORT || 4000;
  const SCORE_FILE_PATH = path.join(__dirname, 'data', 'score.json');

  if (req.method === 'POST') {
    try {
      let scoreData = { score: 0 };

      if (fs.existsSync(SCORE_FILE_PATH)) {
        scoreData = JSON.parse(fs.readFileSync(SCORE_FILE_PATH, 'utf-8'));
      }

      scoreData.score += req.body.value;

      fs.writeFileSync(SCORE_FILE_PATH, JSON.stringify(scoreData, null, 2));

      res.status(200).send('점수가 저장되었습니다.');
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 오류: 점수를 저장하는 중에 문제가 발생했습니다.');
    }
  } else if (req.method === 'GET') {
    try {
      if (fs.existsSync(SCORE_FILE_PATH)) {
        const scoreData = JSON.parse(fs.readFileSync(SCORE_FILE_PATH, 'utf-8'));
        res.status(200).json({ score: scoreData.score });
      } else {
        res.status(200).json({ score: 0 });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 오류: 점수를 가져오는 중에 문제가 발생했습니다.');
    }
  } else {
    res.status(404).send('Not Found');
  }
};
