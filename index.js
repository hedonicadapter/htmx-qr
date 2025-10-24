import express from "express";
import QRCode from "qrcode";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pendingJson = {
  status: "pending",
  hintCode: "",
  redirectUrl: undefined,
  qrCode: "",
};
const redirectJson = {
  status: "",
  hintCode: "",
  redirectUrl: "/callback",
  qrCode: "",
};

const app = express();

app.get("/", (_, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.get("/callback", (_, res) =>
  res.type("html").send(`<div>callback redirect</div>`),
);

const randomUuid = "130d3bb2-7ed8-4302-af33-aa55be8764fb";
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// först av allt
// express & gin templating
app.get("/theme/:branding", () => {
  // 1 get stylesheet
  // 2 return <style></style> or similar
  //
  // /authMethod(se-bankid|frejaid)/instanceId
  // e.g /se-bankid/something
});

let SOMEVAR = 0;
app.get("/login/se-bankid/:instanceid/collect", async (req, res) => {
  const { instanceid } = req.params;
  const qrData = `bankid://collect/${instanceid}${randomUuid[getRandomArbitrary(0, randomUuid.length - 1)]}`;
  console.log(qrData);

  try {
    SOMEVAR++;

    const qrCode = await QRCode.toDataURL(qrData + SOMEVAR);
    console.log(SOMEVAR, SOMEVAR % 20 === 19);

    if (SOMEVAR % 20 === 19) return res.json({ ...redirectJson, qrCode });

    return res.json({ ...pendingJson, qrCode });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate QR code");
  }
});

app.listen(3000, "0.0.0.0", () => console.log("Server running"));
