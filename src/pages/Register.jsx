import React, { useRef, useState } from "react";
import { http } from "../axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  function validateForm(user) {
    if (!user.username.trim()) {
      alert("Имя пользователя обязательно!");
      return false;
    }

    if (!user.email.trim()) {
      alert("Email обязателен!");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(user.email)) {
      alert("Некорректный email!");
      return false;
    }

    if (!user.password.trim()) {
      alert("Пароль обязателен!");
      return false;
    }

    if (user.password.length < 6) {
      alert("Пароль должен содержать минимум 6 символов!");
      return false;
    }

    return true;
  }

  function handleRegister(event) {
    event.preventDefault();
    setLoading(true);

    let user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!validateForm(user)) {
      setLoading(false);
      return;
    }

    http
      .post("/auth/signup", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Ошибка регистрации!");
      })
      .finally(() => {
        formRef.current?.reset();
        setLoading(false);
      });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400">
      <form
        ref={formRef}
        className="bg-white shadow-2xl rounded-2xl p-12 w-[500px] flex flex-col gap-6 border border-gray-400"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Регистрация
        </h2>
        <input
          className="p-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-300"
          ref={usernameRef}
          type="text"
          placeholder="Введите имя пользователя..."
        />
        <input
          className="p-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-300"
          ref={emailRef}
          type="email"
          placeholder="Введите email..."
        />
        <input
          className="p-4 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-300"
          ref={passwordRef}
          type="password"
          placeholder="Введите пароль..."
        />
        <button
          disabled={loading}
          className="p-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          onClick={handleRegister}
        >
          {loading ? "ЗАГРУЗКА..." : "РЕГИСТРАЦИЯ"}
        </button>
        <p className="text-center text-gray-900 text-lg">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-800 hover:underline font-semibold">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
