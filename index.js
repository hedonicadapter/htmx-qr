import express from "express";
import QRCode from "qrcode";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const randomUuid = "130d3bb2-7ed8-4302-af33-aa55be8764fb";
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

app.get("/login/se-bankid/:instanceid/collect", async (req, res) => {
  const { instanceid } = req.params;
  const qrData = `bankid://collect/${instanceid}${randomUuid[getRandomArbitrary(0, randomUuid.length - 1)]}`;

  try {
    const qrCode = await QRCode.toDataURL(qrData);
    res.type("html").send(`<img src="${qrCode}" alt="QR Code"/>`);
  } catch (err) {
    res.status(500).send("Failed to generate QR code");
  }
});

app.listen(3000, "0.0.0.0", () => console.log("Server running"));
