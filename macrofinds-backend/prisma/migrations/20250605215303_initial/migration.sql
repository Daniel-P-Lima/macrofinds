-- CreateTable
CREATE TABLE `dietas` (
    `id_dieta` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_dieta` VARCHAR(255) NOT NULL,
    `objetivo_dieta` VARCHAR(255) NOT NULL,
    `data_criacao_dieta` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao_dieta` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fk_id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `id_dieta`(`id_dieta`),
    INDEX `fk_id_usuario`(`fk_id_usuario`),
    PRIMARY KEY (`id_dieta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_usuario` VARCHAR(255) NOT NULL,
    `idade_usuario` INTEGER NOT NULL,
    `peso_usuario` FLOAT NOT NULL,
    `altura_usuario` FLOAT NOT NULL,
    `email_usuario` VARCHAR(255) NOT NULL,
    `sexo_usuario` VARCHAR(50) NULL,
    `tipo_atividade_fisica` ENUM('N', 'M', 'I') NULL,
    `senha_usuario` VARCHAR(255) NOT NULL,
    `data_criacao_usuario` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao_usuario` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `id_usuario`(`id_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios_dietas` (
    `id_usuario_dieta` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_id_dieta` INTEGER NOT NULL,
    `fk_id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `id_usuario_dieta`(`id_usuario_dieta`),
    INDEX `fk_id_dieta`(`fk_id_dieta`),
    INDEX `fk_id_usuario`(`fk_id_usuario`),
    PRIMARY KEY (`id_usuario_dieta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dietas` ADD CONSTRAINT `dietas_ibfk_1` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_dietas` ADD CONSTRAINT `usuarios_dietas_ibfk_1` FOREIGN KEY (`fk_id_dieta`) REFERENCES `dietas`(`id_dieta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios_dietas` ADD CONSTRAINT `usuarios_dietas_ibfk_2` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
