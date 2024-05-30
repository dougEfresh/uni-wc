import { gnosisChiado as vgnosisChiado } from "viem/chains";
import {Chain} from "../chain.js";


export const gnosisChiado: Chain = {
	id: "eip155:" + vgnosisChiado.id,
	namespace: "eip155",
	vchain: vgnosisChiado,
};
