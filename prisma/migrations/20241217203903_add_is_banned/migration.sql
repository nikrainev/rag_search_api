/*
  Warnings:

  - You are about to drop the column `chat_id` on the `Request` table. All the data in the column will be lost.
  - Added the required column `is_banned` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "chat_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_banned" BOOLEAN NOT NULL;
