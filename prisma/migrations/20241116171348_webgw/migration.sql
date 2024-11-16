/*
  Warnings:

  - You are about to drop the `testing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `testing`;

-- CreateTable
CREATE TABLE `ambilnomor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `satfung` VARCHAR(100) NOT NULL,
    `notadinas` VARCHAR(190) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
