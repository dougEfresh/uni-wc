import {useAccount, useBalance} from "wagmi";
import {optimism} from "wagmi/chains";

export function Balance() {
  const { address } = useAccount()

  const { data: default_ } = useBalance({ address })
  const { data: account_ } = useBalance({ address })
  const { data: optimism_ } = useBalance({
    address,
    chainId: optimism.id,
  })

  return (
    <div>
      <h2>Balance</h2>

      <div>Balance (Default Chain): {default_?.formatted}</div>
      <div>Balance (Account Chain): {account_?.formatted}</div>
      <div>Balance (Optimism Chain): {optimism_?.formatted}</div>
    </div>
  )
}
