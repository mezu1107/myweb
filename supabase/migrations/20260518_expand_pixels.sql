-- Expand pixel management to include Pinterest, Snapchat, Twitter/X, Hotjar, Clarity
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS pinterest_pixel_id TEXT,
  ADD COLUMN IF NOT EXISTS snapchat_pixel_id TEXT,
  ADD COLUMN IF NOT EXISTS twitter_pixel_id TEXT,
  ADD COLUMN IF NOT EXISTS hotjar_site_id TEXT,
  ADD COLUMN IF NOT EXISTS clarity_project_id TEXT;
