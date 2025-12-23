-- Migration: Add new fields to contact_submissions
-- Phone, Date, Category, Terms accepted fields

ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS contact_date DATE,
ADD COLUMN IF NOT EXISTS category VARCHAR(50),
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT false;
