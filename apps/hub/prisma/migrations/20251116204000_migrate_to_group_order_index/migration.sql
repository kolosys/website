-- Add group_slug column to documentation_content (explicit group identifier)
ALTER TABLE "documentation_content" ADD COLUMN "group_slug" TEXT;

-- Populate group_slug from slug array (slug[1] is first element in PostgreSQL)
UPDATE "documentation_content"
SET "group_slug" = CASE 
  WHEN array_length(slug, 1) > 0 THEN slug[1]
  ELSE 'uncategorized'
END;

-- Make group_slug NOT NULL after populating
ALTER TABLE "documentation_content" ALTER COLUMN "group_slug" SET NOT NULL;

-- Convert order_index from INTEGER to INTEGER[] array
-- First, create a new column with array type
ALTER TABLE "documentation_content" ADD COLUMN "order_index_new" INTEGER[] DEFAULT '{}';

-- Migrate existing order_index values to array format
-- If order_index exists, convert to [order_index]
-- If order_index is NULL, use empty array []
UPDATE "documentation_content"
SET "order_index_new" = CASE
  WHEN "order_index" IS NOT NULL THEN ARRAY["order_index"]
  ELSE ARRAY[]::INTEGER[]
END;

-- Drop old order_index column
ALTER TABLE "documentation_content" DROP COLUMN "order_index";

-- Rename new column to order_index
ALTER TABLE "documentation_content" RENAME COLUMN "order_index_new" TO "order_index";

-- Migrate existing group_order data from documentation_metadata to order_index arrays
-- Extract group order from JSON and apply it as order_index[0] for all items in that group
DO $$
DECLARE
  repo_record RECORD;
  group_order_json JSONB;
  group_key TEXT;
  group_order_val INTEGER;
BEGIN
  FOR repo_record IN 
    SELECT repository_id, group_order 
    FROM documentation_metadata 
    WHERE group_order IS NOT NULL 
      AND group_order != '{}'::jsonb
  LOOP
    group_order_json := repo_record.group_order;
    
    -- Iterate through each group in the JSON
    FOR group_key, group_order_val IN 
      SELECT key, value::text::INTEGER 
      FROM jsonb_each(group_order_json)
    LOOP
      -- Update all items in this group: set order_index[0] = group_order_val
      -- Preserve existing order_index[1] if it exists, otherwise set to 0
      UPDATE documentation_content
      SET order_index = CASE
        WHEN array_length(order_index, 1) > 0 THEN
          -- Replace first element, preserve rest
          ARRAY[group_order_val] || order_index[2:]
        ELSE
          -- No existing order_index, create [group_order_val, 0]
          ARRAY[group_order_val, 0]
      END
      WHERE repository_id = repo_record.repository_id
        AND group_slug = group_key;
    END LOOP;
  END LOOP;
END $$;

-- Create index for better query performance
CREATE INDEX "documentation_content_group_slug_idx" ON "documentation_content"("group_slug");

-- Remove group_order column from documentation_metadata (no longer needed)
ALTER TABLE "documentation_metadata" DROP COLUMN IF EXISTS "group_order";

