import React, { useState, useEffect } from 'react';

const ExchangeRateCalculator = () => {
  const [coinRates, setCoinRates] = useState(null);
  const [currencyA, setCurrencyA] = useState('BTCNGN');
  const [currencyB, setCurrencyB] = useState('BTCBUSD');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    async function fetchCoinRates() {
      try {
        const response = await fetch('https://staging-biz.coinprofile.co/v3/currency/rate');
        if (response.ok) {
          const data = await response.json();
          setCoinRates(data.data.rates);
        } else {
          console.error('Failed to fetch coin rates');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCoinRates();
  }, []);

  const handleConversion = () => {
    if (coinRates) {
      const rateA = coinRates[`${currencyA}`].rate;
      const rateB = coinRates[`${currencyB}`].rate;
      const converted = (amount / rateA) * rateB;
      setConvertedAmount(converted.toFixed(2));
    } else {
      setConvertedAmount('N/A');
    }
  };

  return (
    <div>
      <h1>Exchange Rate Calculator</h1>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Currency A:
          <select
            value={currencyA}
            onChange={(e) => setCurrencyA(e.target.value)}
          >
            {coinRates &&
              Object.keys(coinRates).map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Currency B:
          <select
            value={currencyB}
            onChange={(e) => setCurrencyB(e.target.value)}
          >
            {coinRates &&
              Object.keys(coinRates).map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </label>
      </div>
      <button onClick={handleConversion}>Convert</button>
      {convertedAmount !== null && (
        <div>
          {amount} {currencyA} is equal to {convertedAmount} {currencyB}
        </div>
      )}
    </div>
  );
}

export default ExchangeRateCalculator;
