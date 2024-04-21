import apiEndPoints from "@/constants/apiEndPoints";
import constants from "@/constants/constants";
import api from "@/utils/api";
import notify from "@/utils/notify";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [key, setKey] = useState("");
  const router = useRouter();

  const handleGoClick = () => {
    api
      .post(apiEndPoints.VERIFY_ADMIN_KEY, { apiKey: key })
      .then((res) => {
        if (res.data.verified) {
          notify.success("Key verified");
          setCookie(constants.ADMIN_API_KEY, key, {
            maxAge: 60 * 60 * 24 * 2, // 2 days
          });
          router.replace("/admin-panel/movies");
        } else {
          notify.error("Invalid key");
        }
      })
      .catch((err) => {
        notify.error("Invalid key");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <textarea
        className="border text-black border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500 w-full"
        placeholder="Enter your key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button className="my-button" onClick={handleGoClick}>
        Go
      </button>
    </div>
  );
}
