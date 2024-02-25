
program actions:
- Create - create new PDA accout of bank
- Deposit
- Withdraw

To update program
anchor build
solana program extend 5WddyjSv7XASHfsgG14Wk5h39YVxWuKrnEHK9p2B8Whc 1000 (1000 bytes = +- 0.007SOL)
anchor upgrade target/deploy/<PROGRAM_NAME>.so --provider.cluster <CLUSTER> --program-id <PROGRAM_ID>
anchor deploy