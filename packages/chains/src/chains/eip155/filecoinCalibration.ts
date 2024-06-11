import { filecoinCalibration as vfilecoinCalibration } from "viem/chains";
import {type Chain} from "../chain";


export const filecoinCalibration: Chain = {
	id: "eip155:" + vfilecoinCalibration.id,
	namespace: "eip155",
	vchain: vfilecoinCalibration,
};
