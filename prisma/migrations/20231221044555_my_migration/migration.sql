-- CreateTable
CREATE TABLE `CategoryTable` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Topic` VARCHAR(191) NOT NULL,
    `Answer` VARCHAR(191) NOT NULL,
    `CategoryId` INTEGER NOT NULL,
    `SubCategory` VARCHAR(191) NULL,
    `Level` INTEGER NOT NULL,
    `DateToRepeat` DATETIME(3) NOT NULL,
    `PreviousDateToRepeat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `CategoryTable`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
