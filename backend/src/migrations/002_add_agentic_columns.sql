
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS competitor_recon JSONB;
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS strategic_differentiation JSONB;
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS narrative JSONB;
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS brand_core JSONB;
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS visual_identity JSONB;
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS audience_definition JSONB;
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS voice_calibration JSONB;
ALTER TABLE brand_dna ADD COLUMN IF NOT EXISTS content_strategy JSONB;
