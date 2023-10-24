import React, { useState, useEffect } from 'react';

const Coins = () => {
  const [coinRates, setCoinRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
 const fetchCoins = async () => {
      try {
        const response = await fetch('https://staging-biz.coinprofile.co/v3/currency/rate');
        if (response.ok) {
          const data = await response.json();
          const rates = data.data.rates || {};
          setCoinRates(Object.entries(rates));  
          setFilteredCoins(Object.entries(rates));  
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
    const filtered = coinRates.filter(([coinName]) =>
      coinName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCoins(filtered);
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
        type="search"
        placeholder="Search by coin name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredCoins.map(([coinName, rate], index) => (
          <li key={index}>
          <div className="coin-name">{coinName}:</div>
          <div className="coin-rate">{rate.rate}</div>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Coins;
