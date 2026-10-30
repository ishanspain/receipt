import QRCode from "qrcode";
import lanIpAddress from "./ipaddress.js";
import { createSignature } from "./signer.js";
import { createJwtToken } from "./jwt.js";
import { createCustomJwt } from "./customJwt.js";

const port = process.env.PORT ?? "55555";
const receiptID = "REC-123";

const signedReceipt = createSignature(receiptID);

const data = {
  receiptID,
};

// const verificationUrl = `http://${lanIpAddress}:${port}/verify/${receiptID}`;

const base64Payload = createJwtToken(data);
const verificationUrl = `http://${lanIpAddress}:${port}/verify?token=${base64Payload}`;

/* const base45Payload = createCustomJwt(data);
const verificationUrl = `http://${lanIpAddress}:${port}/verify?token=${base45Payload}`; */

console.log("verificationUrl", verificationUrl);

/* const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
  width: 250,
  margin: 1,
  errorCorrectionLevel: "H",
}); */

const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
  width: 500,
  margin: 4,
  errorCorrectionLevel: "M",
});

export { verificationUrl };
export default qrCodeDataUrl;
