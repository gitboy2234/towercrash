import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import "./index.css";
import { ethers } from "ethers";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Play from "./pages/Play/Play";
import Ranking from "./pages/Leaderboards/Ranking";
import Statistics from "./pages/Statistics/Statistics";
import About from "./pages/About/About";
import Notfound from "./components/Notfound";

//Routes to other pages
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/play",
      element: <Play />,
    },
    {
      path: "/leaderboards",
      element: <Ranking />,
    },
    {
      path: "/statistics",
      element: <Statistics />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);
  //Checking if metamask is installed
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("Requesting account...");

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  //useState for the mobile view list
  const [checked, setChecked] = useState(true);
  const toggleChecked = () => setChecked(value => !value);
  console.log(checked);
  return (
    <div>
      <main className="tower-bg mx-auto relative bg-cover bg-center min-h-screen ">
        <div className=" bg-slate-900 opacity-70 w-full h-full fixed text-white z-0 overflow-y-auto overflow-x-hidden ">
          <div className=" lg:hidden my-auto absolute ml-auto right-2">
            <i
              className={
                checked ? "fas fa-bars text-6xl " : "fas fa-times text-6xl "
              }
              onClick={toggleChecked}
            ></i>
          </div>

          <div
            className={
              checked
                ? "lg:flex tracking-widest text-xl bg-slate-800 nav-menu  lg:space-y-0"
                : "lg:flex tracking-widest text-xl bg-slate-800 nav-menu-active  lg:sp" +
                  "ace-y-0 "
            }
          >
            <div
              className={
                checked
                  ? "my-auto text-4xl xl:ml-10  border-r-4"
                  : "my-auto text-6xl xl:ml-10 "
              }
            ></div>
            <Header />
            <button
              onClick={requestAccount}
              className=" absolute items-center text-xl mx-auto lg:right-10 xl:pt-7  nav-li tracking-widest hover:text-red-700"
            >
              Connect Wallet
            </button>
          </div>
          {element}
        </div>
      </main>
    </div>
  );
}

export default App;
