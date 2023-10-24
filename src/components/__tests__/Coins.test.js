import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Coins from '../../components/Coins';

test('displays loading message and then coin rates', async () => {
  const mockData = {
    success: true,
    message: 'Current rates',
    data: {
      rates: {
        BTCNGN: {
          rate: 38208583.69019999,
        },
        ETHNGN: {
          rate: 2072450.6851950001,
        },
      },
    },
  };

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockData,
  });

  render(<Coins />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

  const btcCoinName = screen.getByText('BTCNGN:');
  const ethCoinName = screen.getByText('ETHNGN:');

  expect(btcCoinName).toBeInTheDocument();
  expect(ethCoinName).toBeInTheDocument();

  const btcRate = screen.getByText('38208583.69019999');
  const ethRate = screen.getByText('2072450.6851950001');

  expect(btcRate).toBeInTheDocument();
  expect(ethRate).toBeInTheDocument();
});

test('filters coin rates based on search', async () => {
  const mockData = {
    success: true,
    message: 'Current rates',
    data: {
      rates: {
        BTCNGN: {
          rate: 38208583.69019999,
        },
        ETHNGN: {
          rate: 2072450.6851950001,
        },
      },
    },
  };

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockData,
  });

  render(<Coins />);

  await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

  const searchInput = screen.getByPlaceholderText('Search by coin name');
  fireEvent.change(searchInput, { target: { value: 'BTC' } });

  const btcCoinName = screen.getByText('BTCNGN:');
  const ethCoinName = screen.queryByText('ETHNGN:');

  expect(btcCoinName).toBeInTheDocument();
  expect(ethCoinName).toBeNull();
});
