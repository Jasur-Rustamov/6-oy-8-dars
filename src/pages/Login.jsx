import React, { useRef, useState } from "react";
import { http } from "../axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setToken }) {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  function validateForm(user) {
    if (!user.username.trim()) {
      alert("Имя пользователя обязательно!");
      return false;
    }
    if (!user.password.trim()) {
      alert("Пароль обязателен!");
      return false;
    }
    return true;
  }

  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);

    let user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    if (!validateForm(user)) {
      setLoading(false);
      return;
    }

    http
      .post("/auth/signin", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.accessToken);
          setToken(response.data.accessToken);
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Ошибка входа!");
        navigate("/register");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400">
      <form
        ref={formRef}
        onSubmit={handleLogin} 
        className="bg-white shadow-2xl rounded-2xl p-10 w-[450px] flex flex-col gap-6 border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Вход
        </h2>
        <input
          className="p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
          ref={usernameRef}
          type="text"
          placeholder="Введите имя пользователя..."
          autoComplete="username"
        />
        <input
          className="p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
          ref={passwordRef}
          type="password"
          placeholder="Введите пароль..."
          autoComplete="current-password"
        />
        <button
          type="submit" 
          disabled={loading}
          className="p-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
        >
          {loading ? "ЗАГРУЗКА..." : "ВОЙТИ"}
        </button>
        <p className="text-center text-gray-900 text-lg">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-800 hover:underline font-semibold">
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
