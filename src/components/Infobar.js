import icon1 from "./icon-img/icon1.png";
import icon2 from "./icon-img/icon2.png";
import icon3 from "./icon-img/icon3.png";
import icon4 from "./icon-img/icon4.png";
import search from "./icon-img/search.png";
import axios from "axios";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Infobar = () => {
  const [searchCoin, setSearchCoin] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const [symbol, setSymbol] = useState("");
  const [coinIcon, setCoinIcon] = useState("");
  const [day, setDay] = useState("");
  const [price, setPrice] = useState("");
  const [coinName, setCoinName] = useState("");
  const [hour, setHour] = useState("");
  const [coinRank, setCoinRank] = useState("");
  const [priceChange, setPriceChange] = useState("");
  const [searchError, setSearchError] = useState(false);

  const today = () => {
    const getDay = new Date();
    const day = ("0" + getDay.getDate()).slice(-2);
    const month = ("0" + (getDay.getMonth() + 1)).slice(-2);
    const year = getDay.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const coinSearch = (e) => {
    setSearchCoin(e.target.value.toLowerCase());
  };

  const timestampConverter = (timestamp) => {
    const date = new Date(timestamp);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    return `${day}/${month}`;
  };

  const hourConverter = (timestamp) => {
    const date = new Date(timestamp);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  };

  const submitCoinSearch = () => {
    const options = {
      method: "GET",
      url: `https://coingecko.p.rapidapi.com/coins/${searchCoin}/history`,
      params: { date: today() },
      headers: {
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setCoinName(response.data.name);
        setCoinIcon(response.data.image.small);

        setCoinPrice(response.data.market_data.current_price.usd.toFixed(2));
        setSymbol(response.data.symbol);
        setSearchError(false);
      })
      .catch(function (error) {
        setSearchError(true);
        console.error(error);
      });

    const options2 = {
      method: "GET",
      url: `https://coingecko.p.rapidapi.com/coins/${searchCoin}/market_chart`,
      params: { vs_currency: "usd", days: "7" },
      headers: {
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    axios
      .request(options2)
      .then(function (response) {
        sevenDaysFilter(response.data.prices);
        setSearchError(false);
      })
      .catch(function (error) {
        setSearchError(true);
        console.error(error);
      });

    const options3 = {
      method: "GET",
      url: "https://coingecko.p.rapidapi.com/coins/markets",
      params: {
        vs_currency: "usd",
        price_change_percentage: "7d",
        ids: searchCoin,
        order: "market_cap_desc",
      },
      headers: {
        "x-rapidapi-host": "coingecko.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    axios
      .request(options3)
      .then(function (response) {
        setCoinRank(response.data[0].market_cap_rank);
        console.log(response.data);
        setPriceChange(
          response.data[0].price_change_percentage_7d_in_currency.toFixed(2)
        );
        setSearchError(false);
      })
      .catch(function (error) {
        setSearchError(true);
        console.error(error);
      });

    const sevenDaysFilter = (array) => {
      const convertTime = array.map((obj) => timestampConverter(obj[0]));
      const hourConvert = array.map((obj) => hourConverter(obj[0]));
      const convertPrice = array.map((obj) => obj[1]);
      setDay(convertTime);
      setPrice(convertPrice);
      setHour(hourConvert);
    };
  };

  let data = [];
  for (let i = 0; i < price.length; i++) {
    data.push({ Price: price[i].toFixed(2), day: day[i], time: hour[i] });
  }

  let value2 = -1;

  function CustomTooltip({ active, payload, label }) {
    if (active) {
      return (
        <div>
          <p>{label}</p>
          <p>{payload[1].value}</p>
          <h4>Price: ${payload[0].value}</h4>
        </div>
      );
    }
    return null;
  }

  const errorHandler = () => {
    if (searchError === true) {
      return "Coin not found";
    }
  };

  return (
    <div>
      <div className="infoBar">
        <h3 className="dashboard-p">Dashboard</h3>
        <div className="input-submit">
          <input
            className="dashboard-search"
            placeholder="Coin Name. Ex: bitcoin"
            type="text"
            onChange={coinSearch}
          />
          <img
            className="search-button-img"
            src={search}
            onClick={submitCoinSearch}
          />
        </div>
        <div className="search-error">
          <p>{errorHandler()}</p>
        </div>
      </div>
      <div className="coin-icon-display">
        <img className="img-coin-icon" src={coinIcon} />
      </div>
      <div className="stats">
        <div className="stats-1">
          <img className="stats-1-img" src={icon3} />
          <p className="stats-1-p">Currency</p>
          <p className="stats-1-p2">{symbol}</p>
        </div>
        <div className="stats-1">
          <img className="stats-1-img" src={icon2} />
          <p className="stats-1-p">Price</p>
          <p className="stats-1-p2">${coinPrice}</p>
        </div>
        <div className="stats-1">
          <img className="stats-1-img" src={icon1} />
          <p className="stats-1-p">Price Change (7d)</p>
          <p className="stats-1-p2">{priceChange}%</p>
        </div>
        <div className="stats-1">
          <img className="stats-1-img" src={icon4} />
          <p className="stats-1-p">Market Rank</p>
          <p className="stats-1-p2">{coinRank}</p>
        </div>
      </div>
      <div className="graph">
        <div className="graphTitle">
          <h3 className="graphTitleHeader">{coinName} to USD Chart</h3>
          <p className="graphSubTitle">History</p>
        </div>
        <ResponsiveContainer
          className="graph-container"
          width="100%"
          height="70%"
        >
          <AreaChart width={10} height={40} data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#0f123f"
              dy={10}
              axisLine={false}
              tickLine={false}
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
              }}
              tickFormatter={(value) => {
                let value1 = value;
                if (value1 !== value2) {
                  value2 = value;
                  return value;
                }
                return "";
              }}
            />
            <YAxis
              dataKey="Price"
              stroke="#0f123f"
              dx={-5}
              axisLine={false}
              tickLine={false}
              style={{
                fontFamily: "Poppins",
              }}
              tickCount={8}
              tickFormatter={(value) => {
                return `$${value}`;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area dataKey="Price" fill="url(#color)" dot={false} />
            <Area dataKey="time" dot={false} />
            <CartesianGrid opacity={0.5} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Infobar;
