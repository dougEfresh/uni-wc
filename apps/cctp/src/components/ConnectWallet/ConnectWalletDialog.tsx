import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'



import type { SxProps } from '@mui/material'
import {useClientContext} from "@/contexts/ClientContext";

interface Props {
  handleClose: () => void
//  handleConnect: (connector: AbstractConnector) => void
  open: boolean
  sx?: SxProps
}

const ConnectWalletDialog: React.FC<Props> = ({
                                                handleClose,
                                                //handleConnect,
                                                open,
                                                sx = {},
                                              }) => {

  const { uri } = useClientContext();
  if (!uri) {
    return (<div></div>)
  }
  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogContent>
        <p>{uri}</p>
      </DialogContent>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default ConnectWalletDialog
