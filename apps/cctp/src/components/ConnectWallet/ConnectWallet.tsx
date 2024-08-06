import {useCallback, useEffect, useState} from 'react'
import { Button, Fade, Menu, MenuItem } from '@mui/material'
import {IEipSession, ISolanaSession } from "@uni-wc/provider";

import QRCodeDialog from "@/components/ConnectWallet/QrDialog";
import {useChainContext} from "@/contexts/ChainContext";

function getAddressAbbreviation(address: string): string {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

const ConnectWallet = () => {
  const [evmSessions, setEvmSessions] = useState<IEipSession[]>([]);
  const [solanaSession, setSolanaSession] = useState<ISolanaSession>();
  const { established, chains }  = useChainContext();
  const [error, setError] = useState<Error>();

  const [isConnectWalletDialogOpen, setIsConnectWalletDialogOpen] =
    useState<boolean>(false)

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])


  const closeConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(false)
  }

  const openConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(true)
  }

  /*
  const handleConnect = async (connector: AbstractConnector) => {
    closeConnectWalletDialog()
    await activate(connector)
  }
   */

  const handleDisconnect = useCallback(() => {
    console.log("disconnect")
    //deactivate()
    handleMenuClose()
  }, [handleMenuClose])


  useEffect(() => {
    if (!established) {
      return
    }
    // setEvmSessions(evms);
    // setSolanaSession(solana);
    setIsConnectWalletDialogOpen(false)
  }, [established, setEvmSessions, setSolanaSession, setIsConnectWalletDialogOpen]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(evmSessions[0].account ?? '')
    handleMenuClose()
  }, [evmSessions, handleMenuClose])


  return (
    <>
      {established ? (
        <Button
          id="connected-wallet-button"
          aria-controls={open ? 'connected-wallet-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          //onClick={handleMenuClick}
        >
          {getAddressAbbreviation(evmSessions[0].account)}
        </Button>
      ) : (
        <div className="relative inline">
          <Button onClick={openConnectWalletDialog}>Connect Wallet</Button>
          {error != null && (
            <span className="absolute left-0 top-10 text-sm text-redhot-500">
              {error?.message}
            </span>
          )}
        </div>
      )}
      <Menu
        id="connected-wallet-menu"
        MenuListProps={{
          'aria-labelledby': 'connected-wallet-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleCopy}>Copy Address</MenuItem>
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
      </Menu>
      <QRCodeDialog
        handleClose={closeConnectWalletDialog}
        open={isConnectWalletDialogOpen}
      />
    </>
  )
  /*
  if (!solanaSession || evmSessions.length === 0) {
    return (
      <div className="relative inline">
        <Button onClick={openConnectWalletDialog} variant="contained">Connect Wallet</Button>
      </div>
    );
  }

  return (
  <Button
    id="connected-wallet-button"
    aria-controls={open ? 'connected-wallet-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    //onClick={handleMenuClick}
  >
    {getAddressAbbreviation(evmSessions[0].account)}
  </Button>
  )

   */
}

export default ConnectWallet
