"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import axios from "axios";
import Router from "next/router";

// 김라솔
// lasol
// 1212
// $2b$10$T2DEVh8/4dni2Y9rmQCHw.7PEaRLm.ETK84tlRn5OvW1dwvHTjrx2
// ! 암호환된 로그인 decode(bcrypt로 변환해주었음) - 해제해서 사용자가 입력한 값이 나오도록 해줘야함

interface ErrorType {
  response?: {
    data?: {
      message: string;
    };
  };
}

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { userId, pw });
      if (response.status == 200) {
        router.push("/");
      } else {
        console.log(response.status);
      }
    } catch (error: unknown) {
      const err = error as ErrorType;
      setMessage(err.response?.data?.message || "Unknown error");
    }
  };

  return (
    <section className={styles.loginContainer}>
      <header>
        <h3 className={styles.loginHeader}>로그인</h3>
      </header>
      <form action="/api/login" method="post" onSubmit={handleSubmit}>
        <fieldset className={styles.loginField}>
          <legend>로그인정보를 입력하세요</legend>

          <label htmlFor="id">아이디</label>
          <input type="text" id="id" name="id" value={userId} onChange={e => setUserId(e.target.value)} />

          <label htmlFor="pw">비밀번호</label>
          <input type="password" id="pw" name="pw" value={pw} onChange={e => setPw(e.target.value)} />
        </fieldset>
        <button type="submit">로그인하기</button>
        {message.length && <p>{message}</p>}
      </form>
    </section>
  );
}
