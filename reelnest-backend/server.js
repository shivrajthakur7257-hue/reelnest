import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();

app.use(cors({
  origin: [
    "https://reelnest.click",
    "https://www.reelnest.click",
    "http://localhost:3000"
  ]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ReelNest backend running");
});

app.post("/api/fetch", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  const command = `yt-dlp -j "${url}"`;

  exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout) => {
    if (error) {
      return res.status(500).json({
        error: "Failed to fetch video",
        details: error.message
      });
    }

    try {
      const data = JSON.parse(stdout);

      res.json({
        title: data.title,
        thumbnail: data.thumbnail,
        duration: data.duration,
        uploader: data.uploader,
        downloadUrl: `/api/download?url=${encodeURIComponent(url)}`
      });
    } catch {
      res.status(500).json({ error: "Invalid response" });
    }
  });
});

app.get("/api/download", (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL required");
  }

  res.setHeader("Content-Disposition", "attachment; filename=reelnest-video.mp4");

  const command = `yt-dlp -f best -o - "${url}"`;
  const child = exec(command, { maxBuffer: 1024 * 1024 * 100 });

child.stdout.pipe(res);

child.stderr.on("data", (data) => {
  console.error(data.toString());
});