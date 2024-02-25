import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { DefaultBox } from '../components/DefaultBox';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from '@solana/web3.js';
import { type PublicKey as PublicKeyType } from '@solana/web3.js';
import  { Program, AnchorProvider, web3, utils, BN } from "@project-serum/anchor"
import idl from "../../../../target/idl/solanapda.json"
import { useState } from "react";


const idl_string = JSON.stringify(idl)
const idl_object = JSON.parse(idl_string)
const programID = new PublicKey(idl.metadata.address)

export function Bank(){
    const { publicKey, signTransaction, signAllTransactions } = useWallet()
    const { connection } = useConnection()

    const [banks, setBanks] = useState<Array<any>>([])

    function getProvider() {
        if (publicKey != null &&  signTransaction != undefined && signAllTransactions != undefined) {
            const provider = new AnchorProvider(connection, { publicKey, signTransaction, signAllTransactions }, AnchorProvider.defaultOptions())
            return provider
        }
        
    }

    async function createBank(){
        try {
            // getting anchor provider
            const anchProvider = getProvider()
            // adding reference to program by idl and program id, add anchoir porvider
            const program = new Program(idl_object, programID, anchProvider)

            // first we need to find the address for our PDA
            const [bank] = await PublicKey.findProgramAddressSync([
                utils.bytes.utf8.encode("bankaccount"),
                anchProvider!.wallet.publicKey.toBuffer()
            ], program.programId)

            await program.rpc.create("WsoS Bank", {
                accounts: {
                    bank,
                    user:  anchProvider!.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId
                }
                
            } )

            console.log("Wow new bank created " + bank.toString())
        } catch (error) {
            console.error("error while creating " + error)
        }
    } 

    async function getBanks(){
        try {
            const anchProvider = getProvider()
            const program = new Program(idl_object, programID, anchProvider)

            // await Promise.all((await connection.getProgramAccounts(programID)).map(async bank =>                 
            //     ({
            //     ...(await program.account.bank.fetch(bank.pubkey)),
            //     pubkey: bank.pubkey
            // }))).then(banks =>{
            //     console.log({banks})
            //     setBanks(banks)
            // })
            // Fetch program accounts
            const programAccounts = await connection.getProgramAccounts(programID);
            console.log('Program Accounts:', programAccounts);

            // Map over each bank
            const banksPromises = programAccounts.map(async (bank) => {
                console.log('Current Bank:', bank);
                console.log('Current Bank pubkey:', bank.pubkey.toString());

                // Fetch bank account
                try {
                    const bankAccount = await program.account.bank.fetch(bank.pubkey);
                    console.log('Bank Account:', bankAccount);
                    // Return bank account and pubkey
                    return {
                        ...bankAccount,
                        pubkey: bank.pubkey
                    };
                } catch (error) {
                    console.log("this is not bank:", bank.pubkey)
                    return null
                }    
            });

            // Resolve all promises
            const banks = (await Promise.all(banksPromises)).filter(bank => bank !== null);
            console.log('Banks:', banks);

            // Set banks
            setBanks(banks);


        } catch (error) {
            console.error("error while getBanks ", error)
        }
    }

    async function depositBank(publicKey: PublicKeyType){
        try {
            const anchProvider = getProvider()
            const program = new Program(idl_object, programID, anchProvider)

            
            await program.rpc.deposit(new BN(0.1 * web3.LAMPORTS_PER_SOL), {
                accounts: {
                    bank: publicKey,
                    user:  anchProvider!.wallet.publicKey,
                    systemProgram: web3.SystemProgram.programId
                }
                
            } )
            console.log("deposite done ", publicKey)
        } catch (error) {
            console.error("error while deposit " + error)
        }
    }

    async function withdrawBank(publicKey: PublicKeyType){
        try {
            const anchProvider = getProvider()
            const program = new Program(idl_object, programID, anchProvider)

            
            await program.rpc.withdraw(new BN(0.1 * web3.LAMPORTS_PER_SOL), {
                accounts: {
                    bank: publicKey,
                    user:  anchProvider!.wallet.publicKey
                }
                
            } )
            console.log("withdraw done ", publicKey)
        } catch (error) {
            console.error("error while withdraw " + error)
        }
    }
    return (
        <DefaultBox>
            <Center>
                <Flex flexDirection={"column"} textAlign={'center'} alignItems={'center'} justifyContent={'center'} maxW={'80%'}>
                    <Heading as="h1" size="xl" m={5}>
                        Bank - anchor FE
                    </Heading>                                    
                </Flex>
            </Center>
            {banks.map((bank, index) => {
                return (
                    <Box key={index}>
                        <Heading as="h1">{bank.name.toString()}</Heading>
                        <Text>{bank.balance.toString()}</Text>
                        <Text>{bank.pubkey.toString()}</Text>
                        <Button onClick={() => depositBank(bank.pubkey)}>
                            Deposit Bank
                        </Button>
                        <Button onClick={() => withdrawBank(bank.pubkey)}>
                            Withdraw Bank
                        </Button>
                    </Box>
                )
            })}
            <Button onClick={createBank}>
                Create Bank
            </Button>
            <Button onClick={getBanks}>
                Get Banks
            </Button>
            

        </DefaultBox>
    )
}