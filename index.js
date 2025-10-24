import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const randomUuid = "130d3bb2-7ed8-4302-af33-aa55be8764fb";
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const pendingJson = {
  status: "pending",
  hintCode: "",
  redirectUrl: undefined,
  qrData: "",
};
const redirectJson = {
  status: "",
  hintCode: "",
  redirectUrl: "/callback",
  qrData: "",
};

const app = express();

app.get("/templating", (_, res) =>
  res.sendFile(path.join(__dirname, "/templating.html")),
);
app.get("/htmx-json", (_, res) =>
  res.sendFile(path.join(__dirname, "/htmx-json.html")),
);

app.get("/callback", (_, res) =>
  res.sendFile(path.join(__dirname, "callback.html")),
);

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

  try {
    SOMEVAR++;
    console.log(SOMEVAR, SOMEVAR % 20 === 19);

    if (SOMEVAR % 20 === 19) return res.json({ ...redirectJson, qrData });
    return res.json({ ...pendingJson, qrData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate QR code");
  }
});

app.listen(3000, "0.0.0.0", () => console.log("Server running"));
