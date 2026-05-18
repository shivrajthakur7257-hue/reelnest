/*
  # ReelNest Database Schema

  1. New Tables
    - `download_logs`
      - `id` (uuid, primary key)
      - `url` (text, the URL that was downloaded)
      - `platform` (text, e.g. 'youtube', 'instagram')
      - `download_type` (text, e.g. 'mp4', 'mp3', 'reel', 'story', 'dp')
      - `quality` (text, e.g. '1080p', '720p')
      - `ip_address` (text, for rate limiting)
      - `created_at` (timestamptz)
    - `site_stats`
      - `id` (uuid, primary key)
      - `total_downloads` (bigint, default 0)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - download_logs: anyone can insert (for logging), only service role can read
    - site_stats: anyone can read, only service role can update
*/

CREATE TABLE IF NOT EXISTS download_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  platform text NOT NULL,
  download_type text NOT NULL,
  quality text DEFAULT '720p',
  ip_address text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_downloads bigint DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Insert initial stats row
INSERT INTO site_stats (id, total_downloads) VALUES (gen_random_uuid(), 0)
  ON CONFLICT DO NOTHING;

ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can insert download logs (anon + authenticated)
CREATE POLICY "Allow insert download logs"
  ON download_logs FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service role can read download logs
CREATE POLICY "Service role can read download logs"
  ON download_logs FOR SELECT
  TO authenticated
  USING (true);

-- Anyone can read site stats
CREATE POLICY "Allow read site stats"
  ON site_stats FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated can update site stats
CREATE POLICY "Authenticated can update site stats"
  ON site_stats FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_download_logs_platform ON download_logs(platform);
CREATE INDEX IF NOT EXISTS idx_download_logs_created_at ON download_logs(created_at);
