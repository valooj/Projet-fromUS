-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Lun 13 Mai 2013 à 07:45
-- Version du serveur: 5.5.8
-- Version de PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `demo_fromus`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_pseudo` varchar(25) NOT NULL,
  `user_password` varchar(8) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_fristName` varchar(100) NOT NULL,
  `user_addr1` varchar(100) NOT NULL COMMENT '1ere ligne dans l''adresse du client',
  `user_addr2` varchar(100) NOT NULL COMMENT '2eme ligne dans l''adresse du client',
  `usr_zipCode` int(5) NOT NULL,
  `user_city` varchar(100) NOT NULL,
  `user_country` varchar(100) NOT NULL,
  `user_point` int(6) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`user_id`, `user_pseudo`, `user_password`, `user_name`, `user_fristName`, `user_addr1`, `user_addr2`, `usr_zipCode`, `user_city`, `user_country`, `user_point`) VALUES
(1, 'monPseudo', 'monMDP', 'blabla', 'blabla', 'blabla', 'blabla', 12345, 'blabla', 'blabla', 104),
(2, 'monPseudo2', 'monMDP2', 'blabla', 'blabla', 'blabla', 'blabla', 54321, 'blabla', 'blabla', 4),
(3, 'monPseudo3', 'monMDP3', 'blabla', 'blabla', 'blabla', 'blabla', 65432, 'blabla', 'blabla', 2);
