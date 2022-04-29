/*
  Warnings:

  - You are about to drop the `QuestionAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "QuestionAnswer_questionId_key";

-- DropIndex
DROP INDEX "QuestionAnswer_answerId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QuestionAnswer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "isCorrectAnswer" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("id", "questionId", "text") SELECT "id", "questionId", "text" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
