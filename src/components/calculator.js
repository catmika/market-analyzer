import React, { useState, useEffect } from "react";

const Calculator = () => {
  //Data
  const instruments = [
    {
      label: "EURUSD",
      name: "EUR_USD",
      lot_size: 1,
    },
    {
      label: "GBPUSD",
      name: "GBP_USD",
      lot_size: 1,
    },
    {
      label: "AUDUSD",
      name: "AUD_USD",
      lot_size: 1,
    },
    {
      label: "NZDUSD",
      name: "NZD_USD",
      lot_size: 1,
    },
    {
      label: "USDCAD",
      name: "USD_CAD",
      lot_size: 1,
    },
    {
      label: "USDCHF",
      name: "USD_CHF",
      lot_size: 1,
    },
    {
      label: "USDJPY",
      name: "USD_JPY",
      lot_size: 1,
    },
    {
      label: "XAUUSD",
      name: "XAU_USD",
      lot_size: 0.001,
    },
  ];
  //States
  const [accountBalance, setAccountBalance] = useState("");
  const [riskPercentage, setRiskPercentage] = useState("");
  const [stopLossLevel, setStopLossLevel] = useState("");
  const [instrument, setInstrument] = useState(instruments[0].name);
  const [lotSize, setLotSize] = useState(instruments[0].lot_size);
  const [positionSize, setPositionSize] = useState("");
  const [latestPrice, setLatestPrice] = useState(null);

  // Update lot size when instrument changes
  useEffect(() => {
    const selectedInstrument = instruments.find((i) => i.name === instrument);
    setLotSize(selectedInstrument.lot_size);
  }, [instrument, instruments]);

  //Get latest price
  useEffect(() => {
    const fetchLatestPrice = async () => {
      await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${instrument.slice(
          0,
          3
        )}&to_currency=${instrument.slice(4)}&apikey=97QAMO03Y5GP07VD`
      )
        .then((response) => response.json())
        .then((data) => {
          const latestPrice =
            data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          setLatestPrice(latestPrice);
          console.log(latestPrice);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchLatestPrice();
  }, [instrument]);

  // Functions
  const calculatePositionSize = () => {
    const riskAmount = accountBalance * (riskPercentage / 100);
    const pipValue = (lotSize / latestPrice) * 0.0001;
    const stopLossPips = Math.abs(stopLossLevel - latestPrice) / pipValue;
    const positionSize = riskAmount / (stopLossPips * pipValue);
    setPositionSize(positionSize);
  };
  // Render
  return (
    <div>
      <label>Instrument:</label>
      <select
        value={instrument}
        onChange={(e) => {
          setInstrument(e.target.value);
        }}
      >
        {instruments.map((instrument) => (
          <option key={instrument.name} value={instrument.name}>
            {instrument.label}
          </option>
        ))}
      </select>

      <label>Account Balance $:</label>
      <input
        type="number"
        value={accountBalance}
        onChange={(e) => setAccountBalance(e.target.value)}
      />

      <label>Risk %:</label>
      <input
        type="number"
        value={riskPercentage}
        onChange={(e) => setRiskPercentage(e.target.value)}
      />

      <label>Stop Loss Pips:</label>
      <input
        type="number"
        value={stopLossLevel}
        onChange={(e) => setStopLossLevel(e.target.value)}
      />

      <button onClick={calculatePositionSize}>Calculate Position Size</button>

      <div>Position Size: {positionSize}</div>
    </div>
  );
};

export default Calculator;
