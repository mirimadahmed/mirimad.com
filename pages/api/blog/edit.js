import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  const postsfolder = join(process.cwd(), `/_posts/`);
  if (process.env.NODE_ENV === "development") {
    if (req.method === "POST") {
      try {
        const { date, title, tagline, preview, image } = req.body.variables;
        fs.writeFile(
          postsfolder + req.body.slug + ".md",
          matter.stringify(req.body.content, {
            date,
            title,
            tagline,
            preview,
            image,
          }),
          "utf-8",
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: "Failed to save blog post" });
            }
            res.status(200).json({ status: "DONE" });
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process request" });
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
