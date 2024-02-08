export const fetchSmartMoneyRanking = async () => {
  console.log(`Fetching ...`)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '2',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '3',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '4',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
    {
      id: '5',
      smart_money: 'Amber Group',
      badge: ['silver', 'gold'],
      roi: 1.364,
      net_profit: 12000000,
      total_balance: 15800000,
      most_profitable_trade: 'USDT',
      current_largest_position: 'USDT',
      most_bought_token_24h: 'USDT',
      most_sell_token_24h: 'USDT',
      largest_trade: '16 days 1hr ago',
    },
  ]
}

export const activity = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '2',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '3',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '4',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
    {
      id: '5',
      time: 'Nov 19, 01:24',
      smart_money: 'Amber Group',
      symbol: 'USDT',
      movements: 'OUTFLOW',
      value: {
        total: 14740000,
        amount: 2000000,
        symbol: 'BLUR',
      },
      avg_cost: 0.524773,
      realized_pnl: {
        percent: 2.1,
        amount: 300000,
      },
      unrealized_pnl: {
        percent: 8.4,
        amount: 1200000,
      },
    },
  ]
}

export const tradeStatistic = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
    {
      id: '2',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
    {
      id: '3',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
    {
      id: '4',
      symbol: 'USDT',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
    {
      id: '5',
      symbol: 'Total',
      pnl: 320000,
      total_spent: 1560000,
      realized_gains: 0.524232,
      unrealized_gains: 0.26,
      avg_roi: 50.66,
    },
  ]
}

export const portfolio = async (groupId: string) => {
  console.log(`Fetching ...`, groupId)
  await new Promise((r) => setTimeout(r, 500))
  return [
    {
      id: '1',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '2',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '3',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '4',
      symbol: 'USDT',
      amount: 39939.33,
    },
    {
      id: '5',
      symbol: 'USDT',
      amount: 39939.33,
    },
  ]
}
