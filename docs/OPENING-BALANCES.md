# Opening balances: checklist for any cut-off

The books of a client can start on any month (Owner, 25 November 2026):

- the start of the **calendar year** (books from 1 January);
- the start of a **fiscal year** (e.g. books from 1 July for a June year end);
- **part-way through the year**, e.g. the second quarter (books from 1 April).

The opening balances are always as of **the day before the books start**. The Books page shows this checklist for each client, worked out for its own cut-off and fiscal year, with what is done (src/lib/ledger/opening-checklist.ts).

## Choosing the cut-off

- Set it when the chart is set up, or change it on the Books page (checklist, "Books start") while nothing but the opening balances is in the books. Changing it removes the opening balances; enter them again as of the new date.
- The Clients page sets up every missing chart in one step, either from the same month for every client or from the start of each client's own taxable year (for fiscal-year clients).
- Prefer the first day of a quarter. A cut-off in the middle of a quarter still works, but that quarter's return mixes the opening's year to date with the books.

## The checklist

| # | Item | Year-start cut-off | Mid-year cut-off |
|---|---|---|---|
| 1 | Trial balance as of the day before the books start | After closing: no income or expense accounts (the import refuses them) | Including the **income and expenses for the year to date**, by account, not closed into equity |
| 2 | Unpaid customer and supplier invoices behind AR and AP | Listed invoice by invoice; must add up to the AR and AP balances | Same |
| 3 | Property and equipment, asset by asset | Each asset bought before the cut-off on the Fixed assets page (date, cost, life, tax life); the register's cost and accumulated depreciation must tie to the trial balance | Same |
| 4 | CWT still waiting for 2307s | When each of those 2307s arrives, move it by journal entry from CWT – Awaiting 2307 to CWT (BIR 2307) | Same |
| 5 | Excess input VAT | Type it as "Input tax carried over" (Item 38) on the first 2550Q after the cut-off | Same |
| 6 | Inventory | Keep the count sheet as of the cut-off | Same |
| 7 | Payroll from January to the month before the cut-off | — (not needed when the books start in January) | Enter those months on the Payroll page, so the 2316s, the alphalist and the year-end tax adjustment cover the whole calendar year. Payroll is by calendar year even for fiscal-year clients |
| 8 | Returns already filed for the year | — | The first returns after the cut-off need their figures: previous quarters' tax payments on the 1701Q/1702Q, input tax carried over on the 2550Q, where no earlier worksheet exists in the OS |
| 9 | 2307s received earlier in the year | — | Upload them, so the annual return and its SAWT credit the whole year |

## What the app does with a mid-year cut-off

- The opening's income and expenses are dated the day before the books start. The quarterly and annual income tax returns read them as the earlier part of the year, so the whole year comes from the books.
- If the opening carries no income or expenses, those returns use the documents for that year instead, and say so.
- The year-end closing closes the opening's income and expenses together with the books'.
- The tie-out and sign-off gates on returns start from the client's books start, and not before the January 2027 cycle.
