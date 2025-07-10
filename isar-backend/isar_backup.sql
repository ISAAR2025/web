-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: isar_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Young Learners','Fun and safe drone introduction! Kids learn basic flight and safety through hands-on activities.',0.00,'2025-06-30 10:45:59','https://example.com/o1.png'),(2,'Junior High','Explore how drones solve real-world problems and learn to pilot with confidence.',0.00,'2025-06-30 10:45:59','https://example.com/o2.png'),(3,'Senior High','From technical flight skills to real-world applications, this course equips you to succeed.',30.00,'2025-06-30 10:45:59','https://example.com/o3.png'),(4,'Advanced Training','Professional drone training! Master advanced technology and industry-specific applications.',5999.00,'2025-06-30 10:45:59','https://example.com/o4.png'),(5,'Test Course','Sample',199.99,'2025-06-30 17:14:01',NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `enrolled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_enrollment` (`user_id`,`course_name`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (1,5,'Young Learners',0.00,'2025-06-28 05:48:46'),(8,6,'Young Learners',1.00,'2025-06-28 10:08:09'),(9,6,'Junior High',0.00,'2025-06-28 10:17:59'),(10,5,'Junior High',0.00,'2025-06-28 12:02:44'),(11,7,'Junior High',0.00,'2025-06-30 05:08:16'),(12,1,'Test Course',199.99,'2025-06-30 11:44:04'),(13,9,'Junior High',0.00,'2025-07-02 05:54:25'),(14,7,'Young Learners',1.00,'2025-07-02 06:30:08'),(15,9,'Young Learners',1.00,'2025-07-02 06:42:05'),(16,10,'Junior High',0.00,'2025-07-04 06:11:53');
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `razorpay_order_id` varchar(100) NOT NULL,
  `razorpay_payment_id` varchar(100) DEFAULT NULL,
  `razorpay_signature` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'INR',
  `status` enum('created','paid','failed') DEFAULT 'created',
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `receipt_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_id` (`receipt_id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (2,1,2,'order_test','pay_test','signature_test',999.99,'INR','paid','2025-07-02 12:21:23',100001),(3,1,2,'order_manual_001','pay_manual_001','sig_manual_001',999.99,'INR','paid','2025-07-03 10:31:04',100102),(6,1,2,'order_manual_001','pay_manual_001','sig_manual_001',999.99,'INR','paid','2025-07-04 12:30:00',100105);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `reset_otp` varchar(6) DEFAULT NULL,
  `reset_otp_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sai','vallalashashi9848@gmail.com','$2b$10$QetumS0LJTtiBFbhFoRVKO3duq7nP12.f5V5y5QVuEs0Kfq5nj8ma','2025-06-27 11:37:22',NULL,NULL),(2,'nisha','qtsgssw23@gmail.com','$2b$10$4ceJoB8Rc5Gyaui7r.srY.CTLSXwn5MYytzxjkqN7/M283pjoGDh6','2025-06-27 11:37:22',NULL,NULL),(3,'ajc','xgsxdsgxedyj@GMAIL.COM','$2b$10$.H4ml1niI8oCTVRKEPLx.uxqaJJq15Obp6Lb2OUL5.kCjWr2ovBEm','2025-06-27 11:37:22',NULL,NULL),(4,'ajc','1234@GMAIL.COM','$2b$10$29HqmIM/HggqgmPZwRcxa.XWW51IFjGA74GaaLPeiMLscUSI.a/Ei','2025-06-27 11:37:22',NULL,NULL),(5,'nisha','ombhim36@gmail.com','$2b$10$QxhiS4sYAbdxJb1BRQQwG.TPDsHyAvLLT.TvXEopV71OXvPWqd/re','2025-06-27 11:37:22','413024','2025-07-04 17:46:52'),(6,'ajc','uppur469@gmail.com','$2b$10$SmBBPr9zqjnowKR9ySvjrObJfypsytTpRbFhPRvBKAAtK4D5dkWAC','2025-06-27 11:37:22',NULL,NULL),(7,'nagaraju','veeraboinanagaraju123@gmail.com','$2b$10$XoLDhBaQEY3tQxYqX.wE6eokqkdfXENyuPzuGQwpyqyT2VGJTXeIG','2025-06-27 11:41:30',NULL,NULL),(9,'karthik','karthikpuralasetty@gmail.com','$2b$10$kFRWiGXIppe32rFF.29VYeh0a43CC2umcNaPxdDltvLUbHopJXzo2','2025-07-02 11:23:17',NULL,NULL),(10,'july','yisagi868@GMAIL.COM','$2b$10$udh6US3LeyJ.GspTRbPgROkS0cH6/3wExbW9zm5Dcland21gvvg8K','2025-07-04 11:41:35',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07 11:12:33
