CREATE DATABASE `groupomania`;
USE `groupomania`;

CREATE TABLE `user` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `lastName` varchar(100) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `signinDate` datetime NOT NULL,
)

CREATE TABLE `post` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `author` varchar(120) NOT NULL,
  `post` text NOT NULL,
  `publishDate` datetime NOT NULL,
  `commentsNumber` int NULL,
  `likes` int NULL,
  `imageUrl` text NULL,
  `authorId` int NOT NULL,
) 

CREATE TABLE `likes` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `likeTime` datetime NOT NULL,
)

CREATE TABLE `comment` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `postId` int NOT NULL,
  `author`  varchar(50) NOT NULL,
  `comment` text NOT NULL,
  `publishDate` datetime NOT NULL,
  `authorId` int NOT NULL,
)