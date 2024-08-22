import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utills/database";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

// get 이어도 문제 없을 듯 애초에 그냥 요청하면 자동으로 계좌 생성하고 return하는게 목적
export async function POST(req: NextRequest) {
  if (req.method == "POST") {
    const data = req.json();

    // 토큰으로 userId 찾기
    const cookieStore = cookies();
    const token = cookieStore.get("refreshToken")?.value;
    const decoded = token ? jwt.verify(token, process.env.PRIVATE_KEY as string) : "";
    const { userId } = decoded as JwtPayload;

    // 계좌 생성 로직 짜기
    const account = () => {
      const middle = new Date().getTime().toString().substr(7);
      const end = Math.floor(Math.random() * 1000);
      return `110-${middle}-${end}`;
    };

    //https://velog.io/@wlwl99/Firebase-Cloud-Firestore%EC%97%90%EC%84%9C-%ED%95%98%EC%9C%84-%EC%BB%AC%EB%A0%89%EC%85%98-%EC%B6%94%EA%B0%80%ED%95%98%EB%8A%94-%EB%B2%95-%EC%9D%BD%EC%96%B4%EC%98%A4%EB%8A%94-%EB%B2%95

    // user의 db에 독립된 docs 추가 - user_userId 값 알아야 함
    const docRef = doc(collection(db, "user", "*user_userId", "account"));
    await setDoc(docRef, { account });
  }
}
