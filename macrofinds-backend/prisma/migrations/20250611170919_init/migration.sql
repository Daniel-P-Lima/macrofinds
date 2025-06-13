-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: macrofinds
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('d340cc5f-1481-47a8-b622-e9d42cb4b5ae','071bda1ee96d199359f5b7b841cb24ff53ed58962453884e78ce1ff2bfb329f7','2025-06-13 05:19:36.802','20250611170919_init',NULL,NULL,'2025-06-13 05:19:36.658',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diet`
--

DROP TABLE IF EXISTS `diet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diet` (
  `id_dieta` int NOT NULL AUTO_INCREMENT,
  `nome_dieta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `objetivo_dieta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_criacao_dieta` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `data_atualizacao_dieta` datetime(3) NOT NULL,
  `fk_id_usuario` int NOT NULL,
  PRIMARY KEY (`id_dieta`),
  KEY `Diet_fk_id_usuario_fkey` (`fk_id_usuario`),
  CONSTRAINT `Diet_fk_id_usuario_fkey` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diet`
--

LOCK TABLES `diet` WRITE;
/*!40000 ALTER TABLE `diet` DISABLE KEYS */;
INSERT INTO `diet` VALUES (2,'Dieta 1','M','2025-06-13 02:35:57.653','2025-06-13 08:37:41.146',1),(3,'Dieta 2','M','2025-06-13 02:35:57.656','2025-06-13 08:37:41.152',1);
/*!40000 ALTER TABLE `diet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `cal` double NOT NULL,
  `prot` double NOT NULL,
  `carb` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Arroz Branco','g',0.07,3.59,0.06,0.798),(2,'Frango','g',0.011,2.39,0.27,0),(3,'Batata palha','g',0.1,0.73,0.018,0.16),(4,'Suco de laranja','ml',0.024,0.47,0.007,0.103);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plate`
--

DROP TABLE IF EXISTS `plate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dietId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Plate_dietId_fkey` (`dietId`),
  CONSTRAINT `Plate_dietId_fkey` FOREIGN KEY (`dietId`) REFERENCES `diet` (`id_dieta`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plate`
--

LOCK TABLES `plate` WRITE;
/*!40000 ALTER TABLE `plate` DISABLE KEYS */;
INSERT INTO `plate` VALUES (25,'Refeição 1',2),(26,'Refeição 2',2),(27,'Refeição 1',3),(28,'Refeição 2',3);
/*!40000 ALTER TABLE `plate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platefood`
--

DROP TABLE IF EXISTS `platefood`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platefood` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plateId` int NOT NULL,
  `foodId` int NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PlateFood_plateId_foodId_key` (`plateId`,`foodId`),
  KEY `PlateFood_foodId_fkey` (`foodId`),
  CONSTRAINT `PlateFood_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `food` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `PlateFood_plateId_fkey` FOREIGN KEY (`plateId`) REFERENCES `plate` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platefood`
--

LOCK TABLES `platefood` WRITE;
/*!40000 ALTER TABLE `platefood` DISABLE KEYS */;
INSERT INTO `platefood` VALUES (60,25,1,150),(61,25,2,100),(62,25,3,30),(63,26,2,150),(64,26,4,100),(65,27,2,100),(66,27,1,20),(67,28,1,150),(68,28,2,100),(69,28,3,30),(70,28,4,200);
/*!40000 ALTER TABLE `platefood` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha_usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idade_usuario` int NOT NULL,
  `peso_usuario` double NOT NULL,
  `altura_usuario` double NOT NULL,
  `sexo_usuario` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_atividade_fisica` enum('N','M','I') COLLATE utf8mb4_unicode_ci NOT NULL,
  `objetivo_usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tmb_usuario` double DEFAULT NULL,
  `data_criacao_usuario` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `data_atualizacao_usuario` datetime(3) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `Usuario_email_usuario_key` (`email_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Afonso','afonso@gmail.com','12345678',24,70,179,'M','M','M',2371.68,'2008-10-03 22:59:52.000','2025-06-13 06:47:44.462');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-13  5:44:39
