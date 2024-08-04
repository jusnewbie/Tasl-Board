// App.jsx
import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleLogin = () => {
    setLoggedIn(true);
    setButtonVisible(false); // 点击后隐藏按钮
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setButtonVisible(true); // 登出后显示按钮
  };

  return (
    <div className="App">
      <h1>Project Management App</h1>
      {loggedIn ? (
        <ProjectList onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {buttonVisible && <button onClick={handleLogin}>将军走此小道</button>}
    </div>
  );
};

export default App;
