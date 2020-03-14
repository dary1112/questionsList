# Host: localhost  (Version: 5.0.45-community-nt)
# Date: 2020-03-14 22:12:10
# Generator: MySQL-Front 5.3  (Build 4.43)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "questions"
#

DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `title` text NOT NULL,
  `answer` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

#
# Data for table "questions"
#

INSERT INTO `questions` VALUES (1,'熊哥帅吗？','帅'),(2,'明天要考试吗？','不考'),(3,'ajax是异步的吗?','不是'),(4,'圣诞节吃苹果吗？','不吃'),(5,'元旦还有几天？','10天');

#
# Structure for table "userinfo"
#

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Data for table "userinfo"
#

INSERT INTO `userinfo` VALUES (1,'zhangsan','123@qq.com','123456'),(2,'lisi','sss@w.c','ssss '),(3,'Dary','123@qq.com','123456');