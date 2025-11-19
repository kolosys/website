/*
  Warnings:

  - A unique constraint covering the columns `[github_id]` on the table `contributors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_id]` on the table `issues` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_id]` on the table `pull_requests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_id]` on the table `releases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github_id]` on the table `repositories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `github_id` to the `contributors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_id` to the `issues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_id` to the `pull_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_id` to the `releases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_id` to the `repositories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contributors" ADD COLUMN     "github_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "github_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "pull_requests" ADD COLUMN     "github_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "releases" ADD COLUMN     "github_id" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "repositories" ADD COLUMN     "github_id" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contributors_github_id_key" ON "contributors"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "issues_github_id_key" ON "issues"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "pull_requests_github_id_key" ON "pull_requests"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "releases_github_id_key" ON "releases"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "repositories_github_id_key" ON "repositories"("github_id");
