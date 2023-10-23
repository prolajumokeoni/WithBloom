import React, { useState, useEffect } from 'react';

const  CoinList = () => {
  const [coinRates, setCoinRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch('https://staging-biz.coinprofile.co/v3/currency/rate');
        if (response.ok) {
          const data = await response.json();
          setCoinRates(data.data.rates); 
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>List of Coin Rates</h1>
      <ul>
        {Object.keys(coinRates).map((coinName, index) => (
          <li key={index}>{coinName}</li>
        ))}
      </ul>
    </div>
  );
}

export default CoinList;
