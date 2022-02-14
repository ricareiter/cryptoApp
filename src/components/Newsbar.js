import React, { useState } from "react";
import axios from "axios";

const Newsbar = () => {
  const [news1, setNews1] = useState("");

  const options4 = {
    method: "GET",
    url: "https://get-crypto-news-from-different-sources.p.rapidapi.com/CoinDCX",
    headers: {
      "x-rapidapi-host":
        "get-crypto-news-from-different-sources.p.rapidapi.com",
      "x-rapidapi-key": "820f545a96msh8877b22e0898111p1b8700jsn9042a3eafde8",
    },
  };

  axios
    .request(options4)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div className="newsBar">
      <div className="newsBar-div">
        <div className="news-title">
          News
          <div className="news-description-1">{news1}</div>
          <div className="news-description-2">
            Ethereum is Halfway Towards its 'Grand Vision' - Vitalik Buterin
          </div>
          <div className="news-description-3">
            Rising Bitcoin Leverage Keeps Traders on Edge as Volatility Drops
          </div>
          <div className="news-description-4">
            Polish Banks Mull CBDC, Cryptoasset Projects
          </div>
          <div className="news-description-5">
            Shiba DAO, Strategic Blockchain Gaming, Bank Loses to Bitcoin Miner
            + More News
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsbar;
