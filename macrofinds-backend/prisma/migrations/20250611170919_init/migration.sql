-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_usuario` VARCHAR(191) NOT NULL,
    `email_usuario` VARCHAR(191) NOT NULL,
    `senha_usuario` VARCHAR(191) NOT NULL,
    `idade_usuario` INTEGER NOT NULL,
    `peso_usuario` DOUBLE NOT NULL,
    `altura_usuario` DOUBLE NOT NULL,
    `sexo_usuario` VARCHAR(191) NULL,
    `tipo_atividade_fisica` ENUM('N', 'M', 'I') NOT NULL,
    `objetivo_usuario` VARCHAR(191) NOT NULL,
    `tmb_usuario` DOUBLE NULL,
    `data_criacao_usuario` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao_usuario` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_usuario_key`(`email_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `cal` DOUBLE NOT NULL,
    `prot` DOUBLE NOT NULL,
    `carb` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diet` (
    `id_dieta` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_dieta` VARCHAR(191) NOT NULL,
    `objetivo_dieta` VARCHAR(191) NOT NULL,
    `data_criacao_dieta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao_dieta` DATETIME(3) NOT NULL,
    `fk_id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_dieta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dietId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlateFood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plateId` INTEGER NOT NULL,
    `foodId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,

    UNIQUE INDEX `PlateFood_plateId_foodId_key`(`plateId`, `foodId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diet` ADD CONSTRAINT `Diet_fk_id_usuario_fkey` FOREIGN KEY (`fk_id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plate` ADD CONSTRAINT `Plate_dietId_fkey` FOREIGN KEY (`dietId`) REFERENCES `Diet`(`id_dieta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlateFood` ADD CONSTRAINT `PlateFood_plateId_fkey` FOREIGN KEY (`plateId`) REFERENCES `Plate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlateFood` ADD CONSTRAINT `PlateFood_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
