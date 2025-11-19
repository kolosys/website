-- CreateEnum
CREATE TYPE "issue_state" AS ENUM ('open', 'closed');

-- CreateEnum
CREATE TYPE "pr_state" AS ENUM ('open', 'closed', 'merged');

-- CreateEnum
CREATE TYPE "sync_status" AS ENUM ('pending', 'in_progress', 'completed', 'failed');

-- CreateTable
CREATE TABLE "repositories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "description" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "fork" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pushed_at" TIMESTAMP(3),
    "homepage" TEXT,
    "size" INTEGER NOT NULL DEFAULT 0,
    "stargazers_count" INTEGER NOT NULL DEFAULT 0,
    "watchers_count" INTEGER NOT NULL DEFAULT 0,
    "forks_count" INTEGER NOT NULL DEFAULT 0,
    "open_issues_count" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT,
    "default_branch" TEXT NOT NULL DEFAULT 'main',
    "topics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issues" (
    "id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "state" "issue_state" NOT NULL,
    "user_login" TEXT NOT NULL,
    "user_avatar_url" TEXT,
    "labels" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "assignees" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "closed_at" TIMESTAMP(3),
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pull_requests" (
    "id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "state" "pr_state" NOT NULL,
    "user_login" TEXT NOT NULL,
    "user_avatar_url" TEXT,
    "labels" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "assignees" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "requested_reviewers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "head_ref" TEXT NOT NULL,
    "base_ref" TEXT NOT NULL,
    "mergeable" BOOLEAN,
    "merged" BOOLEAN NOT NULL DEFAULT false,
    "merged_at" TIMESTAMP(3),
    "merged_by" TEXT,
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "review_comments_count" INTEGER NOT NULL DEFAULT 0,
    "commits_count" INTEGER NOT NULL DEFAULT 0,
    "additions" INTEGER NOT NULL DEFAULT 0,
    "deletions" INTEGER NOT NULL DEFAULT 0,
    "changed_files" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "closed_at" TIMESTAMP(3),
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pull_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commits" (
    "sha" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_email" TEXT NOT NULL,
    "author_date" TIMESTAMP(3) NOT NULL,
    "committer_name" TEXT NOT NULL,
    "committer_email" TEXT NOT NULL,
    "committer_date" TIMESTAMP(3) NOT NULL,
    "additions" INTEGER NOT NULL DEFAULT 0,
    "deletions" INTEGER NOT NULL DEFAULT 0,
    "total_changes" INTEGER NOT NULL DEFAULT 0,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commits_pkey" PRIMARY KEY ("sha")
);

-- CreateTable
CREATE TABLE "releases" (
    "id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "tag_name" TEXT NOT NULL,
    "name" TEXT,
    "body" TEXT,
    "draft" BOOLEAN NOT NULL DEFAULT false,
    "prerelease" BOOLEAN NOT NULL DEFAULT false,
    "author_login" TEXT NOT NULL,
    "author_avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "releases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contributors" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatar_url" TEXT,
    "html_url" TEXT,
    "type" TEXT NOT NULL,
    "site_admin" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "company" TEXT,
    "blog" TEXT,
    "location" TEXT,
    "email" TEXT,
    "bio" TEXT,
    "public_repos" INTEGER,
    "public_gists" INTEGER,
    "followers" INTEGER,
    "following" INTEGER,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contributors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contributor_contributions" (
    "contributor_id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "contributions_count" INTEGER NOT NULL DEFAULT 0,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contributor_contributions_pkey" PRIMARY KEY ("contributor_id","repository_id")
);

-- CreateTable
CREATE TABLE "documentation_content" (
    "id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "slug" TEXT[],
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "order_index" INTEGER,
    "version" TEXT,
    "status" TEXT DEFAULT 'Stable',
    "emoji" TEXT,
    "fa_icon" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentation_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentation_metadata" (
    "repository_id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "last_commit_sha" TEXT,
    "last_synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_count" INTEGER NOT NULL DEFAULT 0,
    "total_size" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "documentation_metadata_pkey" PRIMARY KEY ("repository_id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" TEXT NOT NULL,
    "sync_type" TEXT NOT NULL,
    "repository_id" TEXT,
    "status" "sync_status" NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "error_message" TEXT,
    "records_processed" INTEGER DEFAULT 0,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repositories_full_name_key" ON "repositories"("full_name");

-- CreateIndex
CREATE INDEX "repositories_full_name_idx" ON "repositories"("full_name");

-- CreateIndex
CREATE INDEX "repositories_owner_idx" ON "repositories"("owner");

-- CreateIndex
CREATE INDEX "repositories_language_idx" ON "repositories"("language");

-- CreateIndex
CREATE INDEX "repositories_archived_idx" ON "repositories"("archived");

-- CreateIndex
CREATE INDEX "issues_repository_id_idx" ON "issues"("repository_id");

-- CreateIndex
CREATE INDEX "issues_state_idx" ON "issues"("state");

-- CreateIndex
CREATE INDEX "issues_user_login_idx" ON "issues"("user_login");

-- CreateIndex
CREATE INDEX "issues_created_at_idx" ON "issues"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "issues_repository_id_number_key" ON "issues"("repository_id", "number");

-- CreateIndex
CREATE INDEX "pull_requests_repository_id_idx" ON "pull_requests"("repository_id");

-- CreateIndex
CREATE INDEX "pull_requests_state_idx" ON "pull_requests"("state");

-- CreateIndex
CREATE INDEX "pull_requests_user_login_idx" ON "pull_requests"("user_login");

-- CreateIndex
CREATE INDEX "pull_requests_created_at_idx" ON "pull_requests"("created_at" DESC);

-- CreateIndex
CREATE INDEX "pull_requests_merged_idx" ON "pull_requests"("merged");

-- CreateIndex
CREATE UNIQUE INDEX "pull_requests_repository_id_number_key" ON "pull_requests"("repository_id", "number");

-- CreateIndex
CREATE INDEX "commits_repository_id_idx" ON "commits"("repository_id");

-- CreateIndex
CREATE INDEX "commits_author_email_idx" ON "commits"("author_email");

-- CreateIndex
CREATE INDEX "commits_author_date_idx" ON "commits"("author_date" DESC);

-- CreateIndex
CREATE INDEX "releases_repository_id_idx" ON "releases"("repository_id");

-- CreateIndex
CREATE INDEX "releases_tag_name_idx" ON "releases"("tag_name");

-- CreateIndex
CREATE INDEX "releases_published_at_idx" ON "releases"("published_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "releases_repository_id_tag_name_key" ON "releases"("repository_id", "tag_name");

-- CreateIndex
CREATE UNIQUE INDEX "contributors_login_key" ON "contributors"("login");

-- CreateIndex
CREATE INDEX "contributors_login_idx" ON "contributors"("login");

-- CreateIndex
CREATE INDEX "contributors_type_idx" ON "contributors"("type");

-- CreateIndex
CREATE INDEX "contributor_contributions_repository_id_idx" ON "contributor_contributions"("repository_id");

-- CreateIndex
CREATE INDEX "documentation_content_repository_id_idx" ON "documentation_content"("repository_id");

-- CreateIndex
CREATE INDEX "documentation_content_slug_idx" ON "documentation_content"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "documentation_content_repository_id_file_path_key" ON "documentation_content"("repository_id", "file_path");

-- CreateIndex
CREATE INDEX "sync_logs_status_idx" ON "sync_logs"("status");

-- CreateIndex
CREATE INDEX "sync_logs_repository_id_idx" ON "sync_logs"("repository_id");

-- CreateIndex
CREATE INDEX "sync_logs_started_at_idx" ON "sync_logs"("started_at" DESC);

-- CreateIndex
CREATE INDEX "sync_logs_sync_type_idx" ON "sync_logs"("sync_type");

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pull_requests" ADD CONSTRAINT "pull_requests_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commits" ADD CONSTRAINT "commits_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "releases" ADD CONSTRAINT "releases_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributor_contributions" ADD CONSTRAINT "contributor_contributions_contributor_id_fkey" FOREIGN KEY ("contributor_id") REFERENCES "contributors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contributor_contributions" ADD CONSTRAINT "contributor_contributions_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentation_content" ADD CONSTRAINT "documentation_content_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentation_metadata" ADD CONSTRAINT "documentation_metadata_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_logs" ADD CONSTRAINT "sync_logs_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
