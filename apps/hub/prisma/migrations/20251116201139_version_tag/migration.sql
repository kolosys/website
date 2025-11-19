-- CreateTable
CREATE TABLE "version_tags" (
    "id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "tag_name" TEXT NOT NULL,
    "commit_sha" TEXT NOT NULL,
    "is_latest" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "version_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "version_tags_repository_id_idx" ON "version_tags"("repository_id");

-- CreateIndex
CREATE INDEX "version_tags_tag_name_idx" ON "version_tags"("tag_name");

-- CreateIndex
CREATE INDEX "version_tags_is_latest_idx" ON "version_tags"("is_latest");

-- CreateIndex
CREATE INDEX "version_tags_created_at_idx" ON "version_tags"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "version_tags_repository_id_tag_name_key" ON "version_tags"("repository_id", "tag_name");

-- AddForeignKey
ALTER TABLE "version_tags" ADD CONSTRAINT "version_tags_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
