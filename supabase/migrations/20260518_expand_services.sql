-- Expand services table with enterprise content fields
ALTER TABLE public.services
  -- SEO & Meta
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
  
  -- Pricing & Tiers
  ADD COLUMN IF NOT EXISTS pricing_model TEXT, -- "fixed", "tiered", "custom"
  ADD COLUMN IF NOT EXISTS base_price DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS pricing_tiers JSONB, -- [{"name": "Starter", "price": 999, "features": [...]}, ...]
  ADD COLUMN IF NOT EXISTS price_currency TEXT DEFAULT 'USD',
  
  -- Benefits (display as cards)
  ADD COLUMN IF NOT EXISTS benefits JSONB, -- [{"title": "...", "description": "...", "icon": "..."}, ...]
  
  -- Features & Technical
  ADD COLUMN IF NOT EXISTS features JSONB, -- [{"title": "...", "description": "..."}, ...]
  ADD COLUMN IF NOT EXISTS tech_stack TEXT[], -- Array of technologies
  
  -- Process/Timeline
  ADD COLUMN IF NOT EXISTS process_steps JSONB, -- [{"step": 1, "title": "...", "description": "..."}, ...]
  
  -- Content Sections
  ADD COLUMN IF NOT EXISTS short_description TEXT, -- Hero subtitle
  ADD COLUMN IF NOT EXISTS detailed_content TEXT, -- Rich HTML content
  ADD COLUMN IF NOT EXISTS why_us_content JSONB, -- [{"title": "...", "value": "..."}, ...]
  
  -- FAQs
  ADD COLUMN IF NOT EXISTS faqs JSONB, -- [{"question": "...", "answer": "..."}, ...]
  
  -- Testimonials & Social Proof
  ADD COLUMN IF NOT EXISTS featured_testimonial_id UUID REFERENCES testimonials(id),
  ADD COLUMN IF NOT EXISTS related_service_ids UUID[], -- Related services array
  
  -- Media
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
  ADD COLUMN IF NOT EXISTS gallery_images JSONB; -- [{"url": "...", "caption": "..."}, ...]
