# This is a WIP banking system built with Next.js and React
My goal for this project is to setup a simplistic Core Banking System.

## There will be Users who can have multiple accounts. 
- Each account will have a balance and a list of transactions. 
- Transactions will be created by Users and will be used to update the balance of the respective account.

## There will be tellers who can execute specific functions on a user's accounts
- A teller can create a new account for a user, deposit money into an account, withdraw money from an account, and transfer money between accounts.

## There will be admins
- An admin can create and remove tellers.
- An admin can freeze, unfreeze, and delete users and their accounts.
- This is the highest level of access and will be used to manage the application at any point of intervention.


#### I'm not entirely familiar with best practices for building a banking application but for security-centric functions I'm attempting to do my research and implement the best practices I can find.

## I'm using Next.js/React to build the front-end and Node.js/Express to build the back-end.

### Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

