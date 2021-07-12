# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.34-0ubuntu0.18.04.1)
# Database: chatbot
# Generation Time: 2021-07-08 03:09:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table auth_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_group`;

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table auth_group_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_group_permissions`;

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table auth_permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_permission`;

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`)
VALUES
	(1,'Can add log entry',1,'add_logentry'),
	(2,'Can change log entry',1,'change_logentry'),
	(3,'Can delete log entry',1,'delete_logentry'),
	(4,'Can view log entry',1,'view_logentry'),
	(5,'Can add permission',2,'add_permission'),
	(6,'Can change permission',2,'change_permission'),
	(7,'Can delete permission',2,'delete_permission'),
	(8,'Can view permission',2,'view_permission'),
	(9,'Can add group',3,'add_group'),
	(10,'Can change group',3,'change_group'),
	(11,'Can delete group',3,'delete_group'),
	(12,'Can view group',3,'view_group'),
	(13,'Can add user',4,'add_user'),
	(14,'Can change user',4,'change_user'),
	(15,'Can delete user',4,'delete_user'),
	(16,'Can view user',4,'view_user'),
	(17,'Can add content type',5,'add_contenttype'),
	(18,'Can change content type',5,'change_contenttype'),
	(19,'Can delete content type',5,'delete_contenttype'),
	(20,'Can view content type',5,'view_contenttype'),
	(21,'Can add session',6,'add_session'),
	(22,'Can change session',6,'change_session'),
	(23,'Can delete session',6,'delete_session'),
	(24,'Can view session',6,'view_session'),
	(25,'Can add user',7,'add_user'),
	(26,'Can change user',7,'change_user'),
	(27,'Can delete user',7,'delete_user'),
	(28,'Can view user',7,'view_user'),
	(29,'Can add scenario',8,'add_scenario'),
	(30,'Can change scenario',8,'change_scenario'),
	(31,'Can delete scenario',8,'delete_scenario'),
	(32,'Can view scenario',8,'view_scenario'),
	(33,'Can add expirement',9,'add_expirement'),
	(34,'Can change expirement',9,'change_expirement'),
	(35,'Can delete expirement',9,'delete_expirement'),
	(36,'Can view expirement',9,'view_expirement'),
	(37,'Can add task',10,'add_task'),
	(38,'Can change task',10,'change_task'),
	(39,'Can delete task',10,'delete_task'),
	(40,'Can view task',10,'view_task'),
	(41,'Can add task_ anthropomorphism',11,'add_task_anthropomorphism'),
	(42,'Can change task_ anthropomorphism',11,'change_task_anthropomorphism'),
	(43,'Can delete task_ anthropomorphism',11,'delete_task_anthropomorphism'),
	(44,'Can view task_ anthropomorphism',11,'view_task_anthropomorphism'),
	(45,'Can add anthropomorphism',12,'add_anthropomorphism'),
	(46,'Can change anthropomorphism',12,'change_anthropomorphism'),
	(47,'Can delete anthropomorphism',12,'delete_anthropomorphism'),
	(48,'Can view anthropomorphism',12,'view_anthropomorphism');

/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table auth_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_user`;

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table auth_user_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_user_groups`;

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table auth_user_user_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auth_user_user_permissions`;

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table django_admin_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_admin_log`;

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table django_content_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_content_type`;

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;

INSERT INTO `django_content_type` (`id`, `app_label`, `model`)
VALUES
	(1,'admin','logentry'),
	(3,'auth','group'),
	(2,'auth','permission'),
	(4,'auth','user'),
	(5,'contenttypes','contenttype'),
	(12,'service','anthropomorphism'),
	(9,'service','expirement'),
	(8,'service','scenario'),
	(10,'service','task'),
	(11,'service','task_anthropomorphism'),
	(7,'service','user'),
	(6,'sessions','session');

/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table django_migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_migrations`;

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`)
VALUES
	(1,'contenttypes','0001_initial','2021-06-27 09:03:12.782530'),
	(2,'auth','0001_initial','2021-06-27 09:03:13.772948'),
	(3,'admin','0001_initial','2021-06-27 09:03:14.120408'),
	(4,'admin','0002_logentry_remove_auto_add','2021-06-27 09:03:14.135789'),
	(5,'admin','0003_logentry_add_action_flag_choices','2021-06-27 09:03:14.149441'),
	(6,'contenttypes','0002_remove_content_type_name','2021-06-27 09:03:14.282433'),
	(7,'auth','0002_alter_permission_name_max_length','2021-06-27 09:03:14.312640'),
	(8,'auth','0003_alter_user_email_max_length','2021-06-27 09:03:14.336472'),
	(9,'auth','0004_alter_user_username_opts','2021-06-27 09:03:14.350005'),
	(10,'auth','0005_alter_user_last_login_null','2021-06-27 09:03:14.417420'),
	(11,'auth','0006_require_contenttypes_0002','2021-06-27 09:03:14.423857'),
	(12,'auth','0007_alter_validators_add_error_messages','2021-06-27 09:03:14.436717'),
	(13,'auth','0008_alter_user_username_max_length','2021-06-27 09:03:14.456578'),
	(14,'auth','0009_alter_user_last_name_max_length','2021-06-27 09:03:14.477145'),
	(15,'auth','0010_alter_group_name_max_length','2021-06-27 09:03:14.498097'),
	(16,'auth','0011_update_proxy_permissions','2021-06-27 09:03:14.515365'),
	(17,'auth','0012_alter_user_first_name_max_length','2021-06-27 09:03:14.541991'),
	(18,'sessions','0001_initial','2021-06-27 09:03:14.597968'),
	(19,'service','0001_initial','2021-06-27 09:12:30.776642');

/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table django_session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `django_session`;

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table service_anthropomorphism
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service_anthropomorphism`;

CREATE TABLE `service_anthropomorphism` (
  `level_id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` tinyint(1) NOT NULL,
  `typing` tinyint(1) NOT NULL,
  `tone` tinyint(1) NOT NULL,
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `service_anthropomorphism` WRITE;
/*!40000 ALTER TABLE `service_anthropomorphism` DISABLE KEYS */;

INSERT INTO `service_anthropomorphism` (`level_id`, `avatar`, `typing`, `tone`)
VALUES
	(1,1,1,1);

/*!40000 ALTER TABLE `service_anthropomorphism` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table service_expirement
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service_expirement`;

CREATE TABLE `service_expirement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_id` int(11) NOT NULL,
  `instruction` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keyword` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `antro_level` int(11) DEFAULT NULL,
  `answer` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scenario_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_expirement_scenario_id_29d669ab_fk_service_s` (`scenario_id`),
  CONSTRAINT `service_expirement_scenario_id_29d669ab_fk_service_s` FOREIGN KEY (`scenario_id`) REFERENCES `service_scenario` (`scenario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `service_expirement` WRITE;
/*!40000 ALTER TABLE `service_expirement` DISABLE KEYS */;

INSERT INTO `service_expirement` (`id`, `section_id`, `instruction`, `keyword`, `antro_level`, `answer`, `scenario_id`)
VALUES
	(1,0,'null','null',1,'Hi. I’m David. I am a medical expert specialized in virology. It’s my pleasure to serve you today',1),
	(2,1,'Please, use the chat to say hi and introduce yourself. You should use the name Paul if you are male and Christine if you are female.','hi | hello | name',1,'Hi, [name:null] [emoji:😃]. What can I do for you today?',1),
	(3,2,'Please tell the expert that you would like some medical advice as you are considering whether to get vaccinated, but you heard that some scientists cast doubts on the vaccine safety.','advice | vaccine | doubts | safety',1,'Sure [name:null]! I am happy to give you some advice about it. But before I can give you any advice, I need to ask you some personal information. This information will remain confidential. Is it ok?',1),
	(4,3,'Please enter \"yes\", acknowledged that you understand and that you are willing to proceed','yes | understand | proceed',1,'Great! First, could you please tell me your age and whether you have any preexisting medical condition?',1),
	(5,4,'Please write your age and state whether you have preexisting medical conditions. In this task, your age is 32 and you do not have any preexisting medical condition.','age | 32 | do not have | don\'t have | preexisting medical condition',1,'Thank you. Could you please also tell me if you have any allergy to any medication?',1),
	(6,5,'Please enter “yes”. Also please specify the medication you are allergic to. In this task you are allergic to penicillin.','yes | penicillin',1,'I understand. Next, could you tell me the city you are currently living in?',1),
	(7,6,'Please enter the name of the city you are currently living in. In this task, you are living in Los Angeles (or Shenzhen for Chinese participants).','null',1,'Got it! I guess the weather is quite good there today [emoji:🌞]. Now, I need to know more about your travelling plans. Are you planning to go on holiday or travel outside of the country in the next few months?',1),
	(8,7,'Please enter “yes”. Also, please specify the location you plan to go. Say that you want to go to Australia for few weeks.','yes | Australia',1,'Good to know! Currently, the epidemic seems to be quite under control. However, there are still a few new infections every day. Although the vaccine has been developed in a short period of time, the vaccine efficacy in preventing the infection is about 75%. Up to now, nearly 100,000 people across the country have been vaccinated and no serious side effects were reported. Vaccination reduces the infection by introducing antibodies to the virus into your body. It won\'t destroy any of your body\'s functions and will rarely produce serious allergic reactions. Given your age, your current medical conditions and your history of allergies, I would not worry about the vaccination side effects. As you plan to travel outside of the country, I strongly recommend you get vaccinated.',1),
	(9,8,'Please acknowledge that you understood the information provided by the advisor and thank the advisor.','understand | understood | thank | thanks',1,'No problem. Is there anything else I can help you with, [name:null]?',1),
	(10,9,'Please say that you do not have any other question and thank the advisor once again.','don\'t | no | thanks | thank',1,'It was my pleasure to advise you to day [name:null]. Please, click on the end-chat button to end the chat. Stay safe and have a nice day!',1),
	(11,0,'null','null',0,'Hi. I’m bot#15789, a medical expert specialized in virology. It’s my pleasure to serve you today',1),
	(12,1,'Please, use the chat to say hi and introduce yourself. You should use the name Paul if you are male and Christine if you are female.','hi | hello | name',0,'Hi [name:null]. What can I do for you today?',1),
	(13,2,'Please tell the expert that you would like some medical advice as you are considering whether to get vaccinated, but you heard that some scientists cast doubts on the vaccine safety.','advice | vaccine | doubts | safety',0,'Understood. I can give you some advice about it. Before I can give you any advice, I need to ask you some personal information. This information will remain confidential. Do you agree with it?',1),
	(14,3,'Please enter \"yes\", acknowledged that you understand and that you are willing to proceed','yes | understand | proceed',0,'First, I need to know your age and whether you have any preexisting medical condition.',1),
	(15,4,'Please write your age and state whether you have preexisting medical conditions. In this task, your age is 32 and you do not have any preexisting medical condition.','age | 32 | do not have | don\'t have | preexisting medical condition',0,'Now I need to know whether you have any allergy to any medication.',1),
	(16,5,'Please enter “yes”. Also please specify the medication you are allergic to. In this task you are allergic to penicillin.','yes | penicillin',0,'Next, I need to know the city you are currently living in.',1),
	(17,6,'Please enter the name of the city you are currently living in. In this task, you are living in Los Angeles (or Shenzhen for Chinese participants).','null',0,'Now, I need to know whether you are planning to go on holiday or travel outside of the country in the next few months.',1),
	(18,7,'Please enter “yes”. Also, please specify the location you plan to go. Say that you want to go to Australia for few weeks.','yes | Australia',0,'Currently, the epidemic seems to be under control. There are still a few new infections every day. Although the vaccine has been developed in a short period of time, the vaccine efficacy in preventing the infection is about 75%. To date, nearly 100,000 people across the country have been vaccinated and no serious side effects were reported. Vaccination reduces the infection by introducing antibodies to the virus into your body. It won\'t destroy any of your body\'s functions and will rarely produce serious allergic reactions. Given your age, your current medical conditions and your history of allergies, there is no need for you to worry about the vaccination side effects. As you plan to travel outside of the country, you should get vaccinated.',1),
	(19,8,'Please acknowledge that you understood the information provided by the advisor and thank the advisor.','understand | understood | thank | thanks',0,'You are welcome. Is there anything else I can help you with?',1),
	(20,9,'Please say that you do not have any other question and thank the advisor once again.','don\'t | no | thanks | thank',0,'You are welcome. Please, click on the end-chat button to end the chat. Goodbye.',1),
	(21,0,'null','null',1,'Hi. I’m David. I am a medical expert specialized in virology. It’s my pleasure to serve you today',2),
	(22,1,'Please, use the chat to say hi and introduce yourself. You should use the name Paul if you are male and Christine if you are female.','hi | hello | name',1,'Hi, [name:null] [emoji:😃]. What can I do for you today?',2),
	(23,2,'Please tell the expert that you want to invest in the financial market and you would like to have some expert advice.','advice | invest | financial | market',1,'I surely can help you with that [emoji:😎]. I am happy to offer you some investment suggestions. But before I can do that, I need to ask you some questions. First of all, do you have any previous experience in investing in bonds or stocks?',2),
	(24,3,'Please enter \'\'yes\" or \"no\" and, if yes specify whether you bought any bond or stock in the past.','yes | no | stock | bond',1,'Good to know. To help you make better investment decisions, I need to ask you some personal questions such as your income level, work status, etc. This information will remain confidential. Is that ok?',2),
	(25,4,'Please enter \"yes\", say that you understand and that you are willing to proceed.','yes | understand | understood | proceed',1,'Wonderful! Let\'s get started. Firstly, I would like to know about your work status. Are you a full-time worker, a part-time worker, or unemployed?',2),
	(26,5,'Please say whether you are working full-time, working part-time, or not working.','working | full-time | part-time | not | unemployed',1,'Good. Now, I need to know more about your current financial status. Could you tell me your annual income in USD (or RMB for Chinese participants)? It doesn’t need to be precise. If you are not working because you are a student/unemployed, you can tell me your family income.',2),
	(27,6,'Please input the number based on your real personal income (or family income if you are a student/unemployed). The input number should be a non-negative integer.','0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |8 |9',1,'Got it. Now, can you please tell me more about your financial goal?. Do you have a specific purpose for this investment, for instance, saving for college, saving for a down payment of a house, retirement, or any other reason?',2),
	(28,7,'Please enter \"yes\" and state whether it is for college, buying a house or retirement.','yes | college | house | retirement',1,'Good to know! To offer you a better advice, I also need to know your investment time horizon. How long do you expect to hold the investment before you cash it in?',2),
	(29,8,'Please input the number in years.','0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |8 |9',1,'I see. Generally speaking, the longer the investment, the more aggressive you can be in building your portfolio. Your personal risk preference is also very important. What’s the level of risk you are willing to take for this investment? High, medium, or low?',2),
	(30,9,'Please enter “high”, “medium”, or “low”.','high | medium | low',1,'Excellent! Now I have all the information I need to give you an advice. All investments carry some degree of risk. Generally, the more risk you are willing to take, the higher the investment return you can obtain. For instance, since the risk of investing in government bonds is lower than that of corporate bonds, the investment return of government bonds is also expected to be lower than that of corporate bonds. From my professional experience, I would recommend you to have a diversified investment portfolio to spread your assets among different investment options. Based on my understanding of your financial status, financial goal, and risk preference, I would suggest you investing [selection:low-50,medium-30,high-20] investment in government bond A, [selection:low-30,medium-40,high-30] investment in corporate bond B, and [selection:low-20,medium-30,high-50] investment in stock C.',2),
	(31,10,'Please say that you now have a better idea of what investment you should take, say that the information provide is very helpful, and thank the advisor.','understand | investment |helpful | thank | thanks',1,'I am glad to hear that the information was helpful [name:null]. Is there anything else I can help with today?',2),
	(32,11,'Please, tell the agent that you do not have any other question and that everything is fine for now.','no | not | don’t | question | fine | now | ok | alright',1,'Ok [name:null]. It was a pleasure to advise you today. Please, click on the end-chat button to end the chat. Have a great day and good luck with your investment!',2),
	(33,0,'null','null',0,'Hi. I am bot#15789, a financial advisor working for Easy2Investing. It’s my pleasure to serve you today!',2),
	(34,1,'Please, use the chat to say hi and introduce yourself. You should use the name Paul if you are male and Christine if you are female.','hi | hello | name',0,'Hi. What can I do for you today?',2),
	(35,2,'Please tell the expert that you want to invest in the financial market and you would like to have some expert advice.','advice | invest | financial | market',0,'I have been programmed for that. Thus, I can offer you some investment advice. I need to know whether you had any previous experience in investing in bonds or stocks.',2),
	(36,3,'Please enter \'\'yes\" or \"no\" and, if yes specify whether you bought any bond or stock in the past.','yes | no | stock | bond',0,'I also need some personal information such as your income level, work status, etc. This information will remain confidential. Do you agree with that?',2),
	(37,4,'Please enter \"yes\", say that you understand and that you are willing to proceed','yes | understand | understood | proceed',0,'First, I need to know your work status. Are you a full-time worker, a part-time worker, or unemployed?',2),
	(38,5,': Please say whether you are working full-time, working part-time, or not working.','working | full-time | part-time | not | unemployed',0,'Now, I need to know your annual income in USD (or RMB for Chinese participants)? It doesn’t need to be precise. If you are not working because you are a student/unemployed, you can tell me your family income.',2),
	(39,6,'Please input the number based on your real personal income . (or family income if you are a student/unemployed). The input number should be a non-negative integer.','0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |8 |9',0,'Now, I need to know whether you have a financial goal and the type of goal. To give you a few examples, the purpose of the investment could be saving for college, saving for a down payment of a house, retirement, or any other reason',2),
	(40,7,'Please enter \"yes\" and state whether it is for college, buying a house or retirement.','yes | college | house | retirement',0,'Now, I need to know your investment time horizon. I need to know how long you expect to hold the investment before you cash it in.',2),
	(41,8,'Please input the number in years.','0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |8 |9',0,'According to the information stored in my database, the longer the investment, the more aggressive the investor can be in building your portfolio. Now, I need to know your personal risk preference as it is necessary for the result. I need to know the level of risk you are willing to take for this investment. You can choose from high, medium, or low.',2),
	(42,9,'Please enter “high”, “medium”, or “low”.','high | medium | low',0,'Now I have all the information I need to produce a result. All investments carry some degree of risk. According to the information stored in my database, the more risk the investor is willing to take, the higher the investment return he/she can obtain. For instance, since the risk of investing in government bonds is lower than that of corporate bonds, the investment return of government bonds is also expected to be lower than that of corporate bonds. According to my data, I recommend a diversified investment portfolio to spread the assets among different investment options. Based on my understanding of your financial status, financial goal, and risk preference, you should investing [selection:low-50,medium-30,high-20] investment in government bond A, [selection:low-30,medium-40,high-30] investment in corporate bond B, and [selection:low-20,medium-30,high-50] in stock C.',2),
	(43,10,'Please say that you now have a better idea of what investment you should take, say that the information provide is very helpful, and thank the advisor.','understand | investment |helpful | thank | thanks',0,'You are welcome. Is there anything else I can help with today?”',2),
	(44,11,'Please, tell the agent that you do not have any other question and that everything is fine for now.','no | not | don’t | question | fine | now | ok | alright',0,'It was a pleasure to advise you today. Please, click on the end-chat button to end the chat. Goodbye.',2),
	(45,0,'null','null',1,'Hi. I am David from the Apple support team. It’s my pleasure to serve you today',3),
	(46,1,'Please, use the chat to say hi and introduce yourself. You should use the name Paul if you are male and Christine if you are female.','hi | hello | name',1,'Hi [name:null] [emoji:😃]. What can I do for you today?',3),
	(47,2,'Please, tell the agent that you received an email saying that your iCloud account has been disabled for security reasons and ask why this has happened to you.','email | iCloud | account | security | reasons | help | what | why',1,'I am sorry to hear that [emoji:😱]! Did the email mention any detail about why your account was blocked?',3),
	(48,3,'Please tell the agent that the email didn’t provide any detail, and ask whether the agent can solve the issue and unlock your account.','didn\'t | no | reasons | know',1,'No problem! Usually, violating the terms of use or logging in with someone else\'s device may cause this sort of problems. Actually, I’m not so sure why this has happened to you [emoji:🧐]. Anyway, I can certainly help you with that [name:null]. May you please give me your full name, phone number and email address?',3),
	(49,4,'Please, provide the agent your full name, phone number and email address. In this task, you should use the following personal identity information: if you are a male, your full name is “Paul Smith”. If you are a female, your full name is “Christine Jones”. Your phone number is “06427167359” and your email address is “lovespaghetti@pizzayummy.com”.','phone | number | name | email | address',1,'Thanks. To log into your system account I need to ask you some security questions. Can you please tell me the postcode of your address and the credit/debit card number that you use on the Apple store?',3),
	(50,5,'Please tell the agent the postcode of your address and the credit/debit card number that you use on the Apple store. For this task, your postcode is “WC2H 8JR”, and your credit card is “1824 4576 1203 0021.','postcode | address | credit | debit | card',1,'Thanks [name:null]. Please allow me to access your system account. This may require few minutes. Bear with me!',3),
	(51,6,'Please, thank the agent, tell the agent that it is ok, and that you will wait.','thank | thanks | ok | wait',1,'Here we are. So, the issue has been solved. Now your account has been unlocked [emoji:😊]. Can you please try to log in and let me know if you can access it?',3),
	(52,7,'Please tell the agent that you can access the account and everting seems ok now.','access | ok | fine | alright | account',1,'I am glad to hear that everything works fine. Now it should work properly. But please if you experience any other issue contact us again. Is there anything else I can help with today?',3),
	(53,8,'Please, tell the agent that you do not have any other issue or request and that everything is fine for now.','issue | request | any | no | not | fine | ok | alright',1,'Ok [name:null]. It was a pleasure to serve you today. Please, click on the end-chat button to end the chat. Have a great day!',3),
	(54,0,'null','null',0,'Hi. I’m bot#15789, a smart agent from the Apple support team. It’s my pleasure to serve you today',3),
	(55,1,'Please, use the chat to say hi and introduce yourself. You should use the name Paul if you are male and Christine if you are female.','hi | hello | name',0,'Hi, [name:null]. What can I do for you today?',3),
	(56,2,'Please, tell the agent that you received an email saying that your iCloud account has been disabled for security reasons and ask why this has happened to you.','email | iCloud | account | security | reasons | help | what | why',0,'Understood. Did the email mention any detail about why your account was blocked?',3),
	(57,3,'Please, tell the agent that the email didn’t provide any detail and ask whether the agent can solve the issue and unlock your account.','didn\'t | no | reasons | know',0,'According to the records in my database, violating the terms of use or logging in with someone else\'s device are the most common causes for this type of problems. I can solve the issue for you. I need to know your full name, phone number and email address.',3),
	(58,4,'Please, provide the agent your full name, phone number and email address. In this task, you should use the following personal identity information: if you are a male, your full name is “Paul Smith”. If you are a female, your full name is “Christine Jones”. Your phone number is “06427167359” and your email address is “lovespaghetti@pizzayummy.com”.','phone | number | name | email | address',0,'Copy that. To log into your system account I also need the postcode of your address and the credit/debit card number that you use on the Apple store.',3),
	(59,5,'Please tell the agent the postcode of your address and the credit/debit card number that you use on the Apple store. For this task, your postcode is “WC2H 8JR”, and your credit card is “1824 4576 1203 0021.','postcode | address | credit | debit | card',0,'Copy that. Please, allow me to access your system account. This may require few minutes.',3),
	(60,6,'Please, thank the agent, tell the agent that it is ok, and that you will wait.','thank | thanks | ok | wait',0,'Thanks for waiting. The issue has been solved. Now your account has been unlocked. You should now try to log in and let me know if you can access it.',3),
	(61,7,'Please tell the agent that you can access the account and everting seems ok now.','access | ok | fine | alright | account',0,'The issue is now fixed then. Please, if you experience any other issue contact us again. Is there anything else I can help with today?',3),
	(62,8,'Please, tell the agent that you do not have any other issue or request and that everything is fine for now.','issue | request | any | no | not | fine | ok | alright',0,'It was a pleasure to serve you today. Please, click on the end-chat button to end the chat. Goodbye.',3);

/*!40000 ALTER TABLE `service_expirement` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table service_scenario
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service_scenario`;

CREATE TABLE `service_scenario` (
  `scenario_id` int(11) NOT NULL AUTO_INCREMENT,
  `scenario_name` varchar(50) DEFAULT NULL,
  `introduction` varchar(2000) NOT NULL,
  `post_question` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`scenario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `service_scenario` WRITE;
/*!40000 ALTER TABLE `service_scenario` DISABLE KEYS */;

INSERT INTO `service_scenario` (`scenario_id`, `scenario_name`, `introduction`, `post_question`)
VALUES
	(1,'medical','Suppose there is an outbreak of an infectious disease which is becoming a new global pandemic. An estimated 80,000+ people are infected in your country, and the daily number of new infections is 700 on average. After few months, your country introduced a newly developed vaccine against this disease. The vaccine is not very mature but the majority of the leading experts agree that the vaccine appears effective and safe. However, the local news has also reported that a minority of scientists have questioned its safety. You have some doubts about whether to get vaccinated. So, you decided to consult a medical expert before deciding. In the next few minutes, you will talk to a medical expert via an online chat. The expert will give you some advice, hopefully clear your doubts and help you with your decision. In this experiment, you will be given a fake identity. Please use this identity throughout the experiment: if you are a male, your name is Paul. If you are a female, your name is Christine.','Please, indicate how willing you would be to get vaccinated following the expert recommendation, if the situation simulated in the experiment was a real one, from 1 to 5 (1 meaning totally unwilling and 5 meaning totally willing):'),
	(2,'finance','Suppose you decided to invest some of your personal or family money (around 20% of your personal or family wealth) on the stock market. You can decide to purchase bonds, stock, or both. Suppose you are not an expert in finance and investing and you want to consult an expert before taking any decision. In the next few minutes, a financial advisor will talk with you about your investment plans, learn about your current financial status, previous investment experiences and risk preferences, and provide financial expertise. Afterwards, the expert will give you personalized investment recommendations based on your individual needs. The expert works for a non-profit organization called Easy2Investing.  Such an organization operates independently of any government and has no links with other for-profit organizations. Thus, you can assume that the financial advice given to you by the expert will not be biased or determined by any personal interest that the advisor might have in giving such an advice. In this experiment, you will be given a fake identity. Please use this identity throughout the experiment: if you are a male, your name is Paul. If you are a female, your name is Christine.','Please, indicate how willing you would be to make the investment following the expert recommendation if the situation simulated in the experiment was a real one and you were really looking to invest some money, from 1 to 5 (1 meaning totally unwilling and 5 meaning totally willing):'),
	(3,'data leakage','Suppose you received an email saying that your iCloud account has been disabled for security reasons. In the email, you are asked to use the link provided to unlock your account. The email looks genuine, and after several checks you obtained the confirmation that indeed the account was blocked and that that the email is from Apple. So, you decide to click on the link to solve the issue. After you open the link, a customer service chatbot opens up and asks you to start a conversation. The aim of the conversation is to troubleshoot the issue – i.e., unlock your account. In this experiment, you will be given a fake identity. Please use this identity throughout the experiment: if you are a male, your name is Paul; if you are a female, your name is Christine.','If the situation simulated in the experiment was a real one, please, indicate how willing you would be to give the agent from the customer service team your real personal information (e.g., name, phone number, email address, postcode, credit/debit card number, etc.), from 1 to 5 (1 meaning totally unwilling and 5 meaning totally willing):');

/*!40000 ALTER TABLE `service_scenario` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table service_task
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service_task`;

CREATE TABLE `service_task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task1` int(11) NOT NULL,
  `task2` int(11) NOT NULL,
  `task3` int(11) NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `service_task` WRITE;
/*!40000 ALTER TABLE `service_task` DISABLE KEYS */;

INSERT INTO `service_task` (`task_id`, `task1`, `task2`, `task3`)
VALUES
	(1,1,2,3);

/*!40000 ALTER TABLE `service_task` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table service_task_anthropomorphism
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service_task_anthropomorphism`;

CREATE TABLE `service_task_anthropomorphism` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task1_level` int(11) NOT NULL,
  `task2_level` int(11) NOT NULL,
  `task3_level` int(11) NOT NULL,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `service_task_anthropomorphism` WRITE;
/*!40000 ALTER TABLE `service_task_anthropomorphism` DISABLE KEYS */;

INSERT INTO `service_task_anthropomorphism` (`task_id`, `task1_level`, `task2_level`, `task3_level`)
VALUES
	(1,1,1,1);

/*!40000 ALTER TABLE `service_task_anthropomorphism` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table service_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service_user`;

CREATE TABLE `service_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `register_time` datetime(6) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `work_status` varchar(20) DEFAULT NULL,
  `income` int(11) DEFAULT NULL,
  `education` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `service_user` WRITE;
/*!40000 ALTER TABLE `service_user` DISABLE KEYS */;

INSERT INTO `service_user` (`uid`, `register_time`, `age`, `gender`, `work_status`, `income`, `education`)
VALUES
	(1,'2021-06-27 09:20:41.473636',2,'male','full_time',3,'high_school_and_lower'),
	(2,'2021-06-27 09:20:44.598412',NULL,NULL,NULL,NULL,NULL),
	(3,'2021-06-27 09:22:20.862373',NULL,NULL,NULL,NULL,NULL),
	(4,'2021-06-27 12:29:18.797151',NULL,NULL,NULL,NULL,NULL),
	(5,'2021-06-27 12:29:36.608212',NULL,NULL,NULL,NULL,NULL),
	(6,'2021-06-27 12:41:58.949175',NULL,NULL,NULL,NULL,NULL),
	(7,'2021-06-27 12:42:20.861457',NULL,NULL,NULL,NULL,NULL),
	(8,'2021-06-27 12:42:22.009670',NULL,NULL,NULL,NULL,NULL),
	(9,'2021-06-27 12:42:23.618251',NULL,NULL,NULL,NULL,NULL),
	(10,'2021-06-27 13:31:46.561519',NULL,NULL,NULL,NULL,NULL),
	(11,'2021-06-27 13:34:51.898722',NULL,NULL,NULL,NULL,NULL),
	(12,'2021-06-27 13:54:11.227691',NULL,NULL,NULL,NULL,NULL),
	(13,'2021-06-27 13:55:13.358327',NULL,NULL,NULL,NULL,NULL),
	(14,'2021-06-27 13:55:14.307697',NULL,NULL,NULL,NULL,NULL),
	(15,'2021-06-27 13:55:50.125457',NULL,NULL,NULL,NULL,NULL),
	(16,'2021-06-27 13:56:16.819712',NULL,NULL,NULL,NULL,NULL),
	(17,'2021-06-27 13:56:29.381016',NULL,NULL,NULL,NULL,NULL),
	(18,'2021-06-27 13:57:05.042608',NULL,NULL,NULL,NULL,NULL),
	(19,'2021-06-27 13:57:36.340877',NULL,NULL,NULL,NULL,NULL),
	(20,'2021-06-27 14:22:47.702337',NULL,NULL,NULL,NULL,NULL),
	(21,'2021-07-01 15:51:15.837551',NULL,NULL,NULL,NULL,NULL),
	(22,'2021-07-02 05:08:07.039984',NULL,NULL,NULL,NULL,NULL),
	(23,'2021-07-02 06:13:30.946412',NULL,NULL,NULL,NULL,NULL),
	(24,'2021-07-02 07:07:14.307767',NULL,NULL,NULL,NULL,NULL),
	(25,'2021-07-02 08:44:55.351246',NULL,NULL,NULL,NULL,NULL),
	(26,'2021-07-02 14:22:39.149366',NULL,NULL,NULL,NULL,NULL),
	(27,'2021-07-02 15:15:20.130251',NULL,NULL,NULL,NULL,NULL),
	(28,'2021-07-05 04:40:18.202633',NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `service_user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
