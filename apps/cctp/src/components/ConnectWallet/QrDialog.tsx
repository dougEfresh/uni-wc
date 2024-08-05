import React, {useCallback, useState} from 'react';
import {Dialog, DialogTitle, DialogContent, IconButton, Button, type SxProps} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {useClientContext} from "@/contexts/ClientContext";

interface Props {
	handleClose: () => void
//  handleConnect: (connector: AbstractConnector) => void
	open: boolean
	sx?: SxProps
}

const QRCodeDialog: React.FC<Props> = ({ open, handleClose }) => {
	const [copied, setCopied] = useState(false);
	const { uri } = useClientContext();

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText( uri ?? '')
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
	}, [setCopied])

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle className="flex justify-center items-center">
				Scan QR Code
				<IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
					<CloseIcon style={{ color: 'white' }} />
				</IconButton>
			</DialogTitle>
			<DialogContent className="flex flex-col justify-center items-center p-8">
				<QRCode value={uri!} size={256} />
				<div className="mt-4">
					<CopyToClipboard text={uri!} onCopy={handleCopy}>
						<Button variant="contained" color="primary">
							{copied ? 'Copied!' : 'Copy URI'}
						</Button>
					</CopyToClipboard>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default QRCodeDialog;
