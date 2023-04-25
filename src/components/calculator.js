import React, { useState } from "react";

const Calculator = () => {
  //Data
  const instruments = [
    {
      label: "EURUSD",
      name: "EUR",
    },
    {
      label: "GBPUSD",
      name: "GBP",
    },
    {
      label: "AUDUSD",
      name: "AUD",
    },
    {
      label: "NZDUSD",
      name: "NZD",
    },
    {
      label: "USDCAD",
      name: "CAD",
    },
    {
      label: "USDCHF",
      name: "CHF",
    },
    {
      label: "USDJPY",
      name: "JPY",
    },
  ];
  //States
  const [accountBalance, setAccountBalance] = useState("");
  const [riskPercentage, setRiskPercentage] = useState("");
  const [stopLossPips, setStopLossPips] = useState("");
  const [instrument, setInstrument] = useState(instruments[0].name);
  const [positionSize, setPositionSize] = useState("");

  // Calculation
  const calculatePositionSize = async () => {
    const riskAmount = accountBalance * (riskPercentage / 100);
    const stopLossDollars = 0.0001 * 100000;

    if (
      instrument === "EUR" ||
      instrument === "GBP" ||
      instrument === "AUD" ||
      instrument === "NZD"
    ) {
      setPositionSize(
        (riskAmount / (stopLossDollars * stopLossPips)).toFixed(2)
      );
    } else if (instrument !== "XAU") {
      await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${instrument}&apikey=97QAMO03Y5GP07VD`
      )
        .then((response) => response.json())
        .then((data) => {
          const latestPrice =
            data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

          if (instrument === "JPY") {
            setPositionSize(
              (
                (latestPrice *
                  (riskAmount / (stopLossDollars * stopLossPips))) /
                100
              ).toFixed(2)
            );
          } else {
            setPositionSize(
              (
                latestPrice *
                (riskAmount / (stopLossDollars * stopLossPips))
              ).toFixed(2)
            );
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
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
        value={stopLossPips}
        onChange={(e) => setStopLossPips(e.target.value)}
      />

      <button onClick={calculatePositionSize}>Calculate Position Size</button>

      <div>Position Size (Lots): {positionSize}</div>
    </div>
  );
};

export default Calculator;
