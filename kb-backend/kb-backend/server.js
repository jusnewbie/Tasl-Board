// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

// 解析 application/json
app.use(bodyParser.json());

// MySQL 连接池配置
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
});

// 注册用户接口
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Hash 密码
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length > 0) {
      return res.status(400).json({ error: '用户名已被注册' });
    }

    await pool.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email]
    );

    res.json({ message: '注册成功' });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ error: '注册失败' });
  }
});

// 登录接口
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: '用户不存在' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: '密码不正确' });
    }

    res.json({ message: '登录成功' });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ error: '登录失败' });
  }
});

// 启动服务器
app.listen(port, () => {
  //console.log(`Server is running on http://localhost:${port}`);
});
