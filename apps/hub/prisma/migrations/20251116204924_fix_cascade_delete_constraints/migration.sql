-- Ensure all foreign keys referencing repositories have CASCADE delete
-- This migration fixes any foreign key constraints that might not have CASCADE properly set

-- Drop and recreate foreign keys with CASCADE to ensure they work correctly
-- Issues
ALTER TABLE "issues" DROP CONSTRAINT IF EXISTS "issues_repository_id_fkey";
ALTER TABLE "issues" ADD CONSTRAINT "issues_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Pull Requests
ALTER TABLE "pull_requests" DROP CONSTRAINT IF EXISTS "pull_requests_repository_id_fkey";
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Commits
ALTER TABLE "commits" DROP CONSTRAINT IF EXISTS "commits_repository_id_fkey";
ALTER TABLE "commits" ADD CONSTRAINT "commits_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Releases
ALTER TABLE "releases" DROP CONSTRAINT IF EXISTS "releases_repository_id_fkey";
ALTER TABLE "releases" ADD CONSTRAINT "releases_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Version Tags
ALTER TABLE "version_tags" DROP CONSTRAINT IF EXISTS "version_tags_repository_id_fkey";
ALTER TABLE "version_tags" ADD CONSTRAINT "version_tags_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Contributor Contributions
ALTER TABLE "contributor_contributions" DROP CONSTRAINT IF EXISTS "contributor_contributions_repository_id_fkey";
ALTER TABLE "contributor_contributions" ADD CONSTRAINT "contributor_contributions_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Documentation Content
ALTER TABLE "documentation_content" DROP CONSTRAINT IF EXISTS "documentation_content_repository_id_fkey";
ALTER TABLE "documentation_content" ADD CONSTRAINT "documentation_content_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Documentation Metadata
ALTER TABLE "documentation_metadata" DROP CONSTRAINT IF EXISTS "documentation_metadata_repository_id_fkey";
ALTER TABLE "documentation_metadata" ADD CONSTRAINT "documentation_metadata_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE CASCADE ON UPDATE CASCADE;

-- Sync Logs (SET NULL is intentional since repository_id is optional)
ALTER TABLE "sync_logs" DROP CONSTRAINT IF EXISTS "sync_logs_repository_id_fkey";
ALTER TABLE "sync_logs" ADD CONSTRAINT "sync_logs_repository_id_fkey" 
  FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") 
  ON DELETE SET NULL ON UPDATE CASCADE;
