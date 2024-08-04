// 例子中使用Express框架
import express = require('express');
import bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 假设这里存储评论的数据结构，可以是数据库或者内存中的对象
let comments = {};
// POST请求处理器，用来接收评论并保存
app.post('/tasks/:taskId/comments', (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;

  if (!comments[taskId]) {
    comments[taskId] = [];
  }
  comments[taskId].push({ text });

  console.log(`Comment saved for task ${taskId}: ${text}`);
  res.status(201).send('Comment saved successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
