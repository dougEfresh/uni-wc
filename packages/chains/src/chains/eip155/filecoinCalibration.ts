import { filecoinCalibration as vfilecoinCalibration } from "viem/chains";
import {Chain} from "../chain.js";


export const filecoinCalibration: Chain = {
	id: "eip155:" + vfilecoinCalibration.id,
	namespace: "eip155",
	vchain: vfilecoinCalibration,
};
