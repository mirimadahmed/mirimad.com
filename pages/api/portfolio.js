import fs from "fs";
import { join } from "path";

export default function handler(req, res) {
  const portfolioData = join(process.cwd(), "/data/portfolio.json");
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      try {
        fs.writeFileSync(
          portfolioData,
          JSON.stringify(req.body, null, 2),
          "utf-8"
        );
        res.status(200).json({ status: "DONE" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save data" });
      }
    } else {
      res
        .status(200)
        .json({ name: "This route works in development mode only" });
    }
  } else {
    res.status(403).json({ error: "This route works in development mode only" });
  }
}
