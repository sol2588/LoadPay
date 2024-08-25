"use client";

import styles from "./CreateAccountComponent.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function CreateAccountComponent() {
  const [errMessage, setErrMessage] = useState("");
  const router = useRouter();
  const handleButton = async () => {
    try {
      const response = await axios.get("/api/createAccount");
      if (response.status == 200) {
        console.log(response.data);
        const myAccount = { account: response.data.account, balance: response.data.balance };
        localStorage.setItem("accountInfo", JSON.stringify(myAccount));
        router.push("/main");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.message) {
          if (err.response.data.message === "Account has already created") {
            // ? 모달창 필요할듯
            setErrMessage("계좌가 이미 존재합니다. 메인페이지로 이동해주세요");
          } else {
            setErrMessage(err.response.data.message);
          }
        } else {
          setErrMessage("계좌 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // 다른 종류의 에러일 경우에 대한 처리
        setErrMessage("예기치 못한 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <header>
        <h3 className={styles.title}>Balance Account 입출금 통장</h3>
      </header>
      <ul className={styles.featList}>
        <li className={styles.featItem}>첫 사용자도 손쉬운 사용</li>
        <li className={styles.featItem}>지인 추가로 빠른 송금</li>
        <li className={styles.featItem}>저축도우미</li>
      </ul>

      {errMessage.length && <p>{errMessage}</p>}
      <button className={styles.button} onClick={handleButton}>
        사용해보기
      </button>
    </>
  );
}
