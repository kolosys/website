-- CreateEnum
CREATE TYPE "source_provider" AS ENUM ('github', 'gitlab', 'bitbucket');

-- CreateEnum
CREATE TYPE "nav_node_type" AS ENUM ('page', 'group', 'link');

-- DropIndex
DROP INDEX "documentation_content_repository_id_file_path_key";

-- AlterTable
ALTER TABLE "documentation_metadata" RENAME CONSTRAINT "documentation_metadata_new_pkey" TO "documentation_metadata_pkey";

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "emoji" TEXT,
    "fa_icon" TEXT,
    "topics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "homepage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_sources" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "provider" "source_provider" NOT NULL,
    "owner" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "default_branch" TEXT NOT NULL DEFAULT 'main',
    "docs_path" TEXT NOT NULL DEFAULT '/docs',
    "is_primary" BOOLEAN NOT NULL DEFAULT true,
    "last_synced_at" TIMESTAMP(3),
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "versions" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "git_ref" TEXT,
    "is_latest" BOOLEAN NOT NULL DEFAULT false,
    "docs_synced" BOOLEAN NOT NULL DEFAULT false,
    "synced_at" TIMESTAMP(3),
    "file_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" TEXT NOT NULL,
    "version_id" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "slug" TEXT[],
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "emoji" TEXT,
    "fa_icon" TEXT,
    "status" TEXT DEFAULT 'Stable',
    "word_count" INTEGER NOT NULL DEFAULT 0,
    "byte_size" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nav_structure" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "slug_pattern" TEXT[],
    "sort_order" INTEGER NOT NULL,
    "type" "nav_node_type" NOT NULL DEFAULT 'page',
    "custom_title" TEXT,
    "custom_emoji" TEXT,
    "custom_icon" TEXT,
    "external_url" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nav_structure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_slug_idx" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_published_idx" ON "projects"("published");

-- CreateIndex
CREATE INDEX "projects_featured_idx" ON "projects"("featured");

-- CreateIndex
CREATE INDEX "project_sources_project_id_idx" ON "project_sources"("project_id");

-- CreateIndex
CREATE INDEX "project_sources_provider_idx" ON "project_sources"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "project_sources_provider_owner_repo_key" ON "project_sources"("provider", "owner", "repo");

-- CreateIndex
CREATE INDEX "versions_project_id_idx" ON "versions"("project_id");

-- CreateIndex
CREATE INDEX "versions_tag_idx" ON "versions"("tag");

-- CreateIndex
CREATE INDEX "versions_is_latest_idx" ON "versions"("is_latest");

-- CreateIndex
CREATE UNIQUE INDEX "versions_project_id_tag_key" ON "versions"("project_id", "tag");

-- CreateIndex
CREATE INDEX "content_version_id_idx" ON "content"("version_id");

-- CreateIndex
CREATE INDEX "content_slug_idx" ON "content"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "content_version_id_file_path_key" ON "content"("version_id", "file_path");

-- CreateIndex
CREATE INDEX "nav_structure_project_id_idx" ON "nav_structure"("project_id");

-- CreateIndex
CREATE INDEX "nav_structure_parent_id_idx" ON "nav_structure"("parent_id");

-- CreateIndex
CREATE INDEX "nav_structure_project_id_parent_id_sort_order_idx" ON "nav_structure"("project_id", "parent_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "nav_structure_project_id_slug_pattern_key" ON "nav_structure"("project_id", "slug_pattern");

-- AddForeignKey
ALTER TABLE "project_sources" ADD CONSTRAINT "project_sources_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "versions" ADD CONSTRAINT "versions_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nav_structure" ADD CONSTRAINT "nav_structure_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nav_structure" ADD CONSTRAINT "nav_structure_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "nav_structure"("id") ON DELETE CASCADE ON UPDATE CASCADE;
