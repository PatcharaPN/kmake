import sharp from "sharp";
import fs from "fs";

fs.mkdirSync("public/icons", { recursive: true });
const src = "icon-source.png";

const make = (size, name, pad = 0) =>
  sharp(src)
    .resize(size - pad * 2, size - pad * 2, {
      fit: "contain",
      background: "#ffffff",
    })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: "#ffffff",
    })
    .toFile(`public/icons/${name}`);

await make(192, "icon-192.png");
await make(512, "icon-512.png");
await make(512, "icon-maskable-512.png", 64);
await make(180, "apple-touch-icon.png");
console.log("done");
