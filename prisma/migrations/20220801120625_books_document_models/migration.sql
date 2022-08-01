/*
  Warnings:

  - You are about to drop the `Paragraph` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Paragraph";

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "link" TEXT,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_type_key" ON "Document"("type");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_type_fkey" FOREIGN KEY ("type") REFERENCES "DocumentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
