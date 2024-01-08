/*
  Warnings:

  - Made the column `unit` on table `RecipeStepIngredient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RecipeLabel" DROP CONSTRAINT "RecipeLabel_categoryId_fkey";

-- AlterTable
ALTER TABLE "RecipeStepIngredient" ALTER COLUMN "unit" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RecipeLabel" ADD CONSTRAINT "RecipeLabel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "RecipeLabelCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
