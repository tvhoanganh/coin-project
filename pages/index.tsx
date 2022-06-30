import ButtonCustom from "@component/Button";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import http from "@utils/http-client.utils";
import styles from "../styles/Home.module.css";
import axios from "axios";
import httpServer from "@utils/http-server.utils";
import { Coin } from "model/coin.model";
import { Stats } from "model/stats.model";
import CoinsList from "features/home-page/coin-list";
interface Response {
  data: {
    stats: Stats;
    coins: Coin[];
  };
}
const Home = (data: Response) => {
  return <CoinsList coins={data.data.coins} />;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await httpServer.get("/coins");
  const res = data.data as Response;
  return {
    props: { data: res },
  };
};
export default Home;
