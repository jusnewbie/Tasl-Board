import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
/*import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
      button: {
          backgroundColor: '#4285f4',
          color: 'white',
          '&:hover': {
              backgroundColor: '#1a73e8',
          },
      },
  }),
);*/
const RegisterForm = () => {
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    confirmPassword: false
});


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const val = {
        username: data.get("username"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
    };
    const newErrors = {
        username: false,
        password: false,
        confirmPassword: false
    };
    
    const pwdStr = val.password!.toString();
    if (pwdStr.length < 6) {
        newErrors.password = true;
        setErrors(newErrors);
        alert('密码至少需要有6个字符！');
        return;
    }

    if (val.password !== val.confirmPassword) {
        newErrors.confirmPassword = true;
        setErrors(newErrors);
        alert('确认密码不匹配！');
        return;
    }
    setErrors(newErrors);

    try {
        const response = await axios.post(`http://localhost:7001/user/register`, {
            username:val.username,
            password:val.password
        });
        console.log(response.data)
        if (response.data.success) {
            alert('🎉注册成功');
        } else if (response.data.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email') {
            alert('注册失败,此邮箱已被使用');
        } else {
            alert('注册失败,ERR_MSG:' + response.data.message);
        }
    } catch
        (error) {
          alert(error.message);
        alert('注册失败，请重试');
    }

};

//const classes = useStyles();

return (
    <div className="h-full w-full bg-gray-50">
        <Container className="py-16" maxWidth="sm">
            <Box
                className="bg-white"
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    注册
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="用户名"
                        name="username"
                        autoComplete="username"
                        error={errors.username}
                        autoFocus
                    />
                    <TextField label="密码" name="password" error={errors.password}/>
                    <TextField label="确认密码" name="confirmPassword" error={errors.confirmPassword}/>
                    <Box className="pt-6">
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            //className={classes.button}
                        >
                            <h2 className="my-3 font-semibold text-white">注册</h2>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    </div>
)
    ;
};

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7001/user/login', { username, password });
      alert('Login successful');
      console.log(response.data.user); // 输出登录成功的用户信息
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

const Login = (onLogin) => {
  return (
    <div>
      <RegisterForm />
      <LoginForm />
    </div>
  );
};

export default Login;
