-- Add versioned documentation support

-- Step 1: Add new columns to version_tags
ALTER TABLE "version_tags" ADD COLUMN "docs_synced" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "version_tags" ADD COLUMN "docs_synced_at" TIMESTAMP(3);

-- Step 2: Add version_tag column to documentation_content with default
ALTER TABLE "documentation_content" ADD COLUMN "version_tag" TEXT NOT NULL DEFAULT 'next';

-- Step 3: Drop old unique constraint and add new one with version_tag
ALTER TABLE "documentation_content" DROP CONSTRAINT IF EXISTS "documentation_content_repository_id_file_path_key";
ALTER TABLE "documentation_content" ADD CONSTRAINT "documentation_content_repository_id_file_path_version_tag_key" UNIQUE ("repository_id", "file_path", "version_tag");

-- Step 4: Add new indexes for version queries
CREATE INDEX "documentation_content_repository_id_version_tag_idx" ON "documentation_content"("repository_id", "version_tag");
CREATE INDEX "documentation_content_version_tag_idx" ON "documentation_content"("version_tag");
CREATE INDEX "version_tags_docs_synced_idx" ON "version_tags"("docs_synced");

-- Step 5: Migrate documentation_metadata to support multiple versions per repo
-- Create new table with proper structure
CREATE TABLE "documentation_metadata_new" (
    "id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "version_tag" TEXT NOT NULL,
    "last_commit_sha" TEXT,
    "last_synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_count" INTEGER NOT NULL DEFAULT 0,
    "total_size" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "documentation_metadata_new_pkey" PRIMARY KEY ("id")
);

-- Migrate existing data with 'next' as version_tag
INSERT INTO "documentation_metadata_new" ("id", "repository_id", "version_tag", "last_commit_sha", "last_synced_at", "file_count", "total_size")
SELECT
    gen_random_uuid()::text,
    "repository_id",
    'next',
    "last_commit_sha",
    "last_synced_at",
    "file_count",
    "total_size"
FROM "documentation_metadata";

-- Drop old table and rename new one
DROP TABLE "documentation_metadata";
ALTER TABLE "documentation_metadata_new" RENAME TO "documentation_metadata";

-- Add constraints and indexes
ALTER TABLE "documentation_metadata" ADD CONSTRAINT "documentation_metadata_repository_id_version_tag_key" UNIQUE ("repository_id", "version_tag");
CREATE INDEX "documentation_metadata_repository_id_idx" ON "documentation_metadata"("repository_id");
ALTER TABLE "documentation_metadata" ADD CONSTRAINT "documentation_metadata_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
