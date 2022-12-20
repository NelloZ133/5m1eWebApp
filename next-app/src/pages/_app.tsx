import type { AppProps } from "next/app";

import "animate.css";
import "../styles/main.scss";
import "../styles/main.css";
import { useEffect } from "react";
import { UserStore } from "@/store/user.store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { loadUser, isLoggedIn } = UserStore();
  const router = useRouter();

  useEffect(() => {
    loadUser();

    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [loadUser, isLoggedIn, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
