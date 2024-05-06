async function sendScore(score) {
  const response = await fetch('/score', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: score })
  });

  const result = await response.text();
  console.log(result);
  getScore(); // 점수 갱신
}

async function getScore() {
  const response = await fetch('/score');
  const data = await response.json();
  document.getElementById('score').innerText = data.score;
}

document.getElementById('clickButton').addEventListener('click', function() {
  // 클릭 이벤트가 발생하면 버튼을 비활성화
  this.disabled = true;

  // 클릭할 때마다 점수를 1씩 증가시킴
  getScore().then(() => {
      const currentScore = parseInt(document.getElementById('score').innerText);
      sendScore(currentScore + 1);
  });
});
