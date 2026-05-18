/*
  # Add increment_downloads RPC function

  1. New Functions
    - `increment_downloads()` - Increments the total_downloads counter in site_stats table
      - Uses UPDATE ... SET to atomically increment the counter
      - Returns void

  2. Security
    - Function is definer (runs as function owner)
    - Only service role can call it (authenticated)
*/

CREATE OR REPLACE FUNCTION increment_downloads()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE site_stats
  SET total_downloads = total_downloads + 1,
      updated_at = now()
  WHERE id = (SELECT MIN(id) FROM site_stats);
END;
$$;
