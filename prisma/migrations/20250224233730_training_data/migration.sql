-- CreateEnum
CREATE TYPE "TrainingPlan" AS ENUM ('tp_test', 'tp_21k110m4wbw5m', 'tp_21k110m6wbw5m', 'tp_21k120m6wbw5m', 'tp_42k230m4wbw5m', 'tp_42k230m6wbw5m', 'tp_42k240m4wbw5m', 'tp_42k240m6wbw5m', 'tp_42k250m4wbw5m', 'tp_42k250m6wbw5m');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "raceDate" TEXT,
ADD COLUMN     "trainingPlan" "TrainingPlan";
