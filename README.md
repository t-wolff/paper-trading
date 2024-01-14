# paper-trading
There are several ways to calculate P&L, this is my chosen method :

Weighted average cost method
The weighted average cost method requires traders to determine the average cost of all units of a digital currency in their portfolio to arrive at the initial cost. Here are the steps to calculate PnL using this method:

1) Determine the total cost of all units of the cryptocurrency. Multiply the purchase price per unit for each transaction by the number of units of the asset and add the numbers.

2) To arrive at the weighted average cost per unit of the digital coin, divide the total cost of all units by the number of units.

3) Find the current market value of the cryptocurrency sold. Multiply the current market price per unit by the number of units sold.

4) To determine PnL, subtract the average cost per unit from the current market value.

Suppose Alice bought 1 BTC at $1,500 and a few days later bought 1 BTC at $2,000. She later sold 1 BTC at $2,400. Here is the PnL using the weighted average cost method:

Total cost = (1 BTC x $1,500) + (1 BTC x $2,000) = $3,500

Weighted average cost = $3,500 / 2 BTC = $1,750

Current market value = (1 BTC x $2,400) = $2,400

PnL = $2,400 - $1,750 = $650 (profit)

![Alt text](./public/image.png)


Top-down
The overall PL is by comparing the difference of asset (equity and cash) balance.

Balance (t1) – Balance (t0) – Net asset transfer (between t0 and t1) = Trading PL (between t0 and t1)

Let’s explain with an example:

time      t0         t1        delta
btc       -          0.6        0.6
usdt      50k        37k       -13k

Suppose at t1, market price for BTC is $30k, ETH is $2k, USDT is $1 

PL (t0-t1) = 0.6 * 30k + 1 * 2k - 13k = 7k USD

The PL is measured by calculating the total asset (equity) balance’s movement, doesn't matter if the original acquiring cost is $30k or $40k.

It’s simple because there are no transaction details in the calculation, and it’s accurate because there’s no way of mistaking it.