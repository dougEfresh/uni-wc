import { gnosisChiado as vgnosisChiado } from "viem/chains";
import {type Chain} from "../chain";


export const gnosisChiado: Chain = {
	id: "eip155:" + vgnosisChiado.id,
	namespace: "eip155",
	vchain: vgnosisChiado,
};
