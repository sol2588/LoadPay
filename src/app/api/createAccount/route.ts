import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utills/database";
import { getDoc, getDocs, collection, setDoc, doc, query, QuerySnapshot } from "firebase/firestore";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  // ! 일단 계좌가 생성되면 다시 생성 못하게 막아주기
  if (req.method == "GET") {
    // 계좌 생성 로직
    const account = () => {
      const middle = new Date().getTime().toString().substr(7);
      const end = Math.floor(Math.random() * 1000);
      return `110-${middle}-${end}`;
    };

    try {
      // ! 토큰으로 userId 찾기 : 모듈화?
      const cookieStore = cookies();
      const token = cookieStore.get("refreshToken")?.value;
      const decoded = token ? jwt.verify(token, process.env.PRIVATE_KEY as string) : "";
      const { userId } = decoded as JwtPayload;

      // 1) 계좌존재 여부 확인
      const q = query(collection(db, "users", `user_${userId}`, "account"));
      const querySnapshot = await getDocs(q);
      const accountRef = querySnapshot.docs.some(doc => doc.data().account);
      console.log("계좌소유여부 확인: ", accountRef);

      // 1-2) 계좌존재하는 경우
      if (accountRef) {
        return NextResponse.json({ message: "Account has already created" }, { status: 400 });
      }

      // 2) 걔좌신규 개설인 경우 user의 db에 독립된 docs 추가
      const docRef = doc(collection(db, "users", `user_${userId}`, "account"), `account_${userId}`);
      await setDoc(docRef, { account: account(), money: 0 });

      return NextResponse.json({ message: "success create account" }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error on CreateAccount" }, { status: 400 });
    }
  }
}
