const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000;
const SCORE_FILE_PATH = path.join(__dirname, 'data', 'score.json');

app.use(express.json());

// 클라이언트의 점수를 저장하는 라우트
app.post('/score', async (req, res) => {
  try {
    let scoreData = { score: 0 };

    // 파일이 존재하는 경우에만 파일을 읽어옴
    if (fs.existsSync(SCORE_FILE_PATH)) {
      scoreData = JSON.parse(fs.readFileSync(SCORE_FILE_PATH, 'utf-8'));
    }

    // 클라이언트에서 보낸 값을 서버에 저장된 점수에 더함
    scoreData.score += req.body.value;

    // 파일에 저장
    fs.writeFileSync(SCORE_FILE_PATH, JSON.stringify(scoreData, null, 2));

    res.send('점수가 저장되었습니다.');
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류: 점수를 저장하는 중에 문제가 발생했습니다.');
  }
});

// 클라이언트의 최신 점수를 가져오는 라우트
app.get('/score', async (req, res) => {
  try {
    // 파일이 존재하는 경우에만 파일을 읽어옴
    if (fs.existsSync(SCORE_FILE_PATH)) {
      const scoreData = JSON.parse(fs.readFileSync(SCORE_FILE_PATH, 'utf-8'));
      res.json({ score: scoreData.score });
    } else {
      res.json({ score: 0 }); // 파일이 없는 경우 기본 점수 0 반환
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류: 점수를 가져오는 중에 문제가 발생했습니다.');
  }
});

// index.html 파일 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
