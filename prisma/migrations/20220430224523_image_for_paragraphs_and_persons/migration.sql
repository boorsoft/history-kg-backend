/*
  Warnings:

  - Added the required column `image` to the `Paragraph` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paragraph" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Paragraph" ("id", "text", "title") SELECT "id", "text", "title" FROM "Paragraph";
DROP TABLE "Paragraph";
ALTER TABLE "new_Paragraph" RENAME TO "Paragraph";
CREATE TABLE "new_Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Person" ("bio", "firstName", "id", "lastName") SELECT "bio", "firstName", "id", "lastName" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
