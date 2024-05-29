'use client';


import {Account, Connect, ConnectorClient, Repro, WriteContract, SwitchAccount, SwitchChain, SignMessage, Connections, BlockNumber, Balance, SendTransaction, ReadContract} from "@/components";
import {useAccount, useChains} from "wagmi";
//<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//<main className="flex min-h-screen flex-col items-center justify-between p-24">
// <Connect />
  export default function Home() {
    const account = useAccount();

    if (account.status === "disconnected") {
      return (<main>
        <Connect />
      </main>);
    }

  return (
    <main>
      <Account />
      <Connect />
      <SwitchAccount />
      <SwitchChain />
      <SignMessage />
      <Connections />
      <BlockNumber />
      <Balance />
      <ConnectorClient />
      <SendTransaction />
      <ReadContract />
      <WriteContract />

      <Repro />
    </main>
  );
}
