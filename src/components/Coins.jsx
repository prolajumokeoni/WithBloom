import React, { useState, useEffect } from 'react';

const CoinList = () => {
  const [coinRates, setCoinRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState({});

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch('https://staging-biz.coinprofile.co/v3/currency/rate');
        if (response.ok) {
          const data = await response.json();
          setCoinRates(data.data.rates);
          setFilteredCoins(data.data.rates);
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

  useEffect(() => {
    const filtered = Object.keys(coinRates).filter((coinName) =>
      coinName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCoinsObject = {};
    filtered.forEach((coinName) => {
      filteredCoinsObject[coinName] = coinRates[coinName];
    });

    setFilteredCoins(filteredCoinsObject);
  }, [searchTerm, coinRates]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>List of Coin Rates</h1>
      <input
        type="text"
        placeholder="Search by coin name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {Object.keys(filteredCoins).map((coinName, index) => (
          <li key={index}>
            {coinName}: {filteredCoins[coinName].rate} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinList;
