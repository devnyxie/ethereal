---
title: "Freqtrade Backtesting"
tags:
  - cryptocurrency
  - bot
date: 2025-03-23
description: "Setting up Freqtrade, a free and open-source crypto trading bot and backtesting it with sample data."
---

Yeah. It was unexpected for me as well. I'm not a fan of gambling and prefer stability over volatility. However, as a human seeking new experiences, I decided to give it a try.

[Freqtrade](https://www.freqtrade.io/en/stable) is a free and open-source crypto trading bot that allows you to automate your trading strategies. It is written in Python and has a very active community. I'm new to this, so I will be sharing my journey with you. I hope you will find it interesting.

![[freqtrade.png|400]]

> [!danger]
> This is not financial advice. I am not a financial advisor. I am just a software engineer who is trying to learn new things. Please do your own research before making any financial decisions.

> [!note]
> A more interesting and stable approach would be arbitrage trading. From what I know, there is a bot called [Hummingbot](https://github.com/hummingbot/hummingbot) that allows you to do that. We must give it a try in the future!

Alright, let's start. We will use Linux for this tutorial. Feel free to fire up your VM or WSL.

# Installation

Step 1: Git clone the repository

```bash
git clone https://github.com/freqtrade/freqtrade
cd freqtrade
```

Step 2: Install the dependencies

```bash
./setup.sh -i
```

Step 3: Move to stable branch

'cuz we are not brave enough to use the dev branch.

```bash
git checkout stable
```

Step 4: Activate the python virtual environment

```bash
source ./.venv/bin/activate
```

# Configuration

Step 1: Init user folder

```bash
freqtrade create-userdir --userdir user_data
```

Step 2: Create a new config file

```bash
freqtrade new-config --config config.json
```

Step 3: Edit the config file

```bash
nano config.json
# locate exchange.pair_whitelist and add the pairs you want to trade, e.g. ["BTC/USDT", "ETH/USDT"]
```

Step 4: Test the configuration with sample data

Let's pull some real data from Binance, shall we?

```bash
# freqtrade download-data --config config.json --days 999 -t 5m 15m 30m 1h 2h 4h 1d 1w
# let's download data only for 5 min timeframe & 9 days
freqtrade download-data --config config.json --days 9 -t 5m
```

Step 5: Minor tweak for backtesting

Locate `pairlists` in the config file and replace the content with the following:

```json
"pairlists": [
    {
        "method": "StaticPairList"
    }
],
```

and:

```json
"pair_whitelist": [
    "BTC/USDT",
    "ETH/USDT",
    "LTC/USDT",
    "ADA/USDT",
    "XRP/USDT",
    "DOGE/USDT",
    "DOT/USDT",
    "LINK/USDT",
    "UNI/USDT",
    "SOL/USDT"
],
```

Step 6: Backtest the configuration

```bash
freqtrade backtesting --config config.json --strategy SampleStrategy
```

Output:

```
                   SUMMARY METRICS
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┓
┃ Metric                      ┃ Value               ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━┩
│ Backtesting from            │ 2025-03-14 16:40:00 │
│ Backtesting to              │ 2025-03-23 01:00:00 │
│ Trading Mode                │ Spot                │
│ Max open trades             │ 2                   │
│                             │                     │
│ Total/Daily Avg Trades      │ 10 / 1.25           │
│ Starting balance            │ 1000 USDT           │
│ Final balance               │ 1024.87 USDT        │
│ Absolute profit             │ 24.87 USDT          │
│ Total profit %              │ 2.49%               │
│ CAGR %                      │ 206.73%             │
│ Sortino                     │ 4931.99             │
│ Sharpe                      │ 35.33               │
│ Calmar                      │ 3483.24             │
│ Profit factor               │ 15.21               │
│ Expectancy (Ratio)          │ 2.49 (2.84)         │
│ Avg. daily profit %         │ 0.31%               │
│ Avg. stake amount           │ 333.829 USDT        │
│ Total trade volume          │ 6714.87 USDT        │
│                             │                     │
│ Best Pair                   │ BTC/USDT 1.58%      │
│ Worst Pair                  │ ETH/USDT 0.91%      │
│ Best trade                  │ ETH/USDT 1.00%      │
│ Worst trade                 │ ETH/USDT -0.26%     │
│ Best day                    │ 9.953 USDT          │
│ Worst day                   │ -1.75 USDT          │
│ Days win/draw/lose          │ 5 / 3 / 1           │
│ Avg. Duration Winners       │ 22:41:00            │
│ Avg. Duration Loser         │ 2 days, 11:02:00    │
│ Max Consecutive Wins / Loss │ 8 / 2               │
│ Rejected Entry signals      │ 0                   │
│ Entry/Exit Timeouts         │ 0 / 0               │
│                             │                     │
│ Min balance                 │ 1003.299 USDT       │
│ Max balance                 │ 1026.62 USDT        │
│ Max % of account underwater │ 0.17%               │
│ Absolute Drawdown (Account) │ 0.17%               │
│ Absolute Drawdown           │ 1.75 USDT           │
│ Drawdown high               │ 26.62 USDT          │
│ Drawdown low                │ 24.87 USDT          │
│ Drawdown Start              │ 2025-03-20 14:15:00 │
│ Drawdown End                │ 2025-03-23 01:00:00 │
│ Market change               │ 5.21%               │
└─────────────────────────────┴─────────────────────┘

Backtested 2025-03-14 16:40:00 -> 2025-03-23 01:00:00 | Max open trades : 2
                                STRATEGY SUMMARY
┏━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━┓
┃         ┃        ┃         ┃         ┃         ┃         ┃     Win ┃         ┃
┃         ┃        ┃     Avg ┃     Tot ┃     Tot ┃         ┃    Draw ┃         ┃
┃         ┃        ┃  Profit ┃  Profit ┃  Profit ┃     Avg ┃    Loss ┃         ┃
┃ Strate… ┃ Trades ┃       % ┃    USDT ┃       % ┃ Durati… ┃    Win% ┃ Drawdo… ┃
┡━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━┩
│ Sample… │     10 │    0.75 │  24.870 │    2.49 │  1 day, │       8 │    1.75 │
│         │        │         │         │         │ 5:58:00 │ 0     2 │    USDT │
│         │        │         │         │         │         │    80.0 │   0.17% │
└─────────┴────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

Step 7: Run the bot

Let's test the bot with real money. Just kidding, we are not that brave yet. Let's test it with a dry-run.

```bash
freqtrade trade --config config.json
```

And looking at the output, we can see that the bot is alive and well. It is ready to trade. But, we are not. Not yet. We need to learn more about the strategies and the market. So, see you in the next part!
