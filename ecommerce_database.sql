-- MySQL dump 10.16  Distrib 10.1.28-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: ecommerce_database
-- ------------------------------------------------------
-- Server version	10.1.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` char(12) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `number_phone` varchar(20) NOT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  `updatedAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES ('80ADMINS','Daffa Naufal','Daffa Rachmat','$2a$12$a1wXLSCSN2qMEQP28DokG.1Mm0yG39crZDayHN8C1X7Ef4UUil4Im','naufalrachmat3@gmail.com','Suropati Residence','085712356420','05/05/2019','05/05/2019');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins_details`
--

DROP TABLE IF EXISTS `admins_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` char(12) NOT NULL,
  `profile_image` text,
  `createdAt` varchar(200) DEFAULT NULL,
  `updatedAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_id` (`admin_id`),
  CONSTRAINT `admins_details_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins_details`
--

LOCK TABLES `admins_details` WRITE;
/*!40000 ALTER TABLE `admins_details` DISABLE KEYS */;
INSERT INTO `admins_details` VALUES (1,'80ADMINS','admin_daffa.png','05/05/2019','05/05/2019');
/*!40000 ALTER TABLE `admins_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` char(12) NOT NULL,
  `file_path` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (3,'90sepatu','sepatu_1.png'),(4,'90sepatu','sepatu_2.png');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_promos`
--

DROP TABLE IF EXISTS `product_promos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_promos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` char(12) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `promo_type` enum('buy 1 get 1','discount','bonus') NOT NULL,
  `is_discount` enum('true','false') DEFAULT NULL,
  `discount` int(3) DEFAULT NULL,
  `bonus_item` varchar(255) DEFAULT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  `updatedAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id` (`product_id`),
  CONSTRAINT `product_promos_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_promos`
--

LOCK TABLES `product_promos` WRITE;
/*!40000 ALTER TABLE `product_promos` DISABLE KEYS */;
INSERT INTO `product_promos` VALUES (3,'90sepatu','Sepatu Sneakers','buy 1 get 1','',0,'tidak ada','05/05/2019','05/05/2019');
/*!40000 ALTER TABLE `product_promos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_solds`
--

DROP TABLE IF EXISTS `product_solds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_solds` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` char(12) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `product_category` varchar(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_count` int(11) NOT NULL,
  `amount_paid` int(11) NOT NULL,
  `is_paid_off` enum('lunas','hutang','sedekah','waiting') DEFAULT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_solds`
--

LOCK TABLES `product_solds` WRITE;
/*!40000 ALTER TABLE `product_solds` DISABLE KEYS */;
INSERT INTO `product_solds` VALUES (1,'90sepatu','Sepatu Sneakers','Sneakers',600000,1,600000,'lunas','05/05/2019');
/*!40000 ALTER TABLE `product_solds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` char(12) NOT NULL,
  `user_id` char(12) NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `product_category` varchar(100) NOT NULL,
  `product_count` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  `updatedAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('90sepatu','30naufal','Sepatu Sneakers','Sepatu',40,50000,'Sneakers','05/05/2019','05/05/2019');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopping_carts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` char(12) DEFAULT NULL,
  `username` char(12) DEFAULT NULL,
  `product_id` char(12) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_category` varchar(100) DEFAULT NULL,
  `product_count` int(11) DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
INSERT INTO `shopping_carts` VALUES (1,NULL,NULL,'90sepatu','Sepatu Sneakers','Sneakers',1,NULL,'Sneakers','05/05/2019');
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` char(12) NOT NULL,
  `fullname_transaction` varchar(255) NOT NULL,
  `transaction_name` varchar(200) NOT NULL,
  `transaction_product` varchar(255) NOT NULL,
  `product_count` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `amount_paid` int(11) NOT NULL,
  `is_paid_off` enum('lunas','hutang','sedekah','waiting') NOT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'90sepatu','Pembelian Sepatu Sneakers','Beli','Sepatu Sneakers',1,600000,600000,'lunas','05/05/2019');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` char(12) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `number_phone` varchar(20) NOT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  `updatedAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('30naufal','Naufal Daffa Rachmat','Daffa Naufal','$2a$12$z1yySsx0uWrOqdOzKZiYQ.WPgulOFm4kT68DriiVq5x4Y6db0cQ9G','naufalrachmat91@gmail.com','Jl. Suropati Residence','085712356420','05/05/2019','05/05/2019');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_details`
--

DROP TABLE IF EXISTS `users_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` char(12) NOT NULL,
  `profile_image` text,
  `budget_users` int(11) NOT NULL,
  `createdAt` varchar(200) DEFAULT NULL,
  `updatedAt` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `users_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_details`
--

LOCK TABLES `users_details` WRITE;
/*!40000 ALTER TABLE `users_details` DISABLE KEYS */;
INSERT INTO `users_details` VALUES (3,'30naufal','user_daffa.png',400000,'05/05/2019','05/05/2019');
/*!40000 ALTER TABLE `users_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-06 14:01:24
