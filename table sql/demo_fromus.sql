-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Lun 13 Mai 2013 à 09:09
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
-- Structure de la table `commande_det`
--

CREATE TABLE IF NOT EXISTS `commande_det` (
  `cmdd_id` int(11) NOT NULL AUTO_INCREMENT,
  `cmdd_libelle` varchar(150) NOT NULL,
  `cmdd_url` varchar(150) NOT NULL,
  `cmdd_desc` text NOT NULL,
  `cmdd_qte` int(11) NOT NULL,
  `cmdd_montant` decimal(10,0) NOT NULL,
  `cmdd_categ` int(11) NOT NULL,
  `cmdd_poids` decimal(10,0) NOT NULL,
  `cmdd_unitep` varchar(5) NOT NULL,
  `cmdd_larg` decimal(5,0) NOT NULL,
  `cmdd_long` decimal(5,0) NOT NULL,
  `cmdd_haut` decimal(5,0) NOT NULL,
  `cmdd_united` varchar(5) NOT NULL,
  `cmdd_proforma` varchar(100) NOT NULL,
  `cmdd_ent` int(11) NOT NULL,
  PRIMARY KEY (`cmdd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Contenu de la table `commande_det`
--


-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE IF NOT EXISTS `produits` (
  `prd_id` int(16) NOT NULL AUTO_INCREMENT,
  `prd_libelle` varchar(100) NOT NULL,
  `prd_site` varchar(100) NOT NULL,
  `prd_desc` varchar(200) NOT NULL,
  `prd_cat` int(16) NOT NULL,
  `prd_visu` varchar(100) NOT NULL,
  `prd_prix` decimal(10,2) NOT NULL,
  `prd_vis` int(1) NOT NULL,
  PRIMARY KEY (`prd_libelle`),
  UNIQUE KEY `key` (`prd_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=63 ;

--
-- Contenu de la table `produits`
--

INSERT INTO `produits` (`prd_id`, `prd_libelle`, `prd_site`, `prd_desc`, `prd_cat`, `prd_visu`, `prd_prix`, `prd_vis`) VALUES
(13, 'Android 4.0 (ICS) MID 9" Capacitive Touch Screen Wifi Webcam G-sensor HDMI 3D, 512MB DDR RAM, 8GB St', 'rakuten.com', 'dscnico', 99, 'visunico', '94.79', 1),
(12, 'Asics GT 2160 Women''s Running Shoes Sneakers Wide Width T156N-7401 Size 6.5', 'rakuten.com', 'dscnico', 99, 'visunico', '54.99', 1),
(61, 'Darksiders II (Limited Edition)', 'rakuten.com/prod/darksiders-ii-limited-edition/222393651.html', 'dscnico', 99, 'visunico', '49.30', 1),
(59, 'Directed 516U Universal Voice Module', 'rakuten.com/prod/directed-516u-universal-voice-module/90148203.html', 'dscnico', 99, 'visunico', '30.10', 1),
(46, 'Driveway Patrol Infrared Wireless Alert System', 'rakuten.com', 'dscnico', 99, 'visunico', '15.72', 1),
(11, 'English Laundry Floral Cuff Plaid Mens Dress Shirt Black Size S', 'rakuten.com', 'dscnico', 99, 'visunico', '29.99', 1),
(54, 'Kensington Desk Mount Cable Anchor', 'rakuten.com', 'dscnico', 99, 'visunico', '13.49', 1),
(53, 'Kensington Promixo Starter Kit', 'rakuten.com', 'dscnico', 99, 'visunico', '49.99', 1),
(48, 'Kguard All-in-One Surveillance Combo Kit - 8CH H.264 DVR with 8 CMOS Cameras - 8 x Camera, Digital V', 'rakuten.com', 'dscnico', 99, 'visunico', '517.99', 0),
(62, 'Samsung UN40EH6000 40" LED HDTV 1080p 120Hz', 'rakuten.com/prod/samsung-un40eh6000-40-led-hdtv-1080p-120hz/228474864.html', 'dscnico', 99, 'visunico', '638.99', 1),
(51, 'Zmodo 4CH H.264 Video CCTV Real-time Surveillance Security DVR - iPhone & Android Network - No Hard ', 'rakuten.com', 'dscnico', 99, 'visunico', '85.50', 1),
(42, 'Zmodo 4CH Security Surveillance System for Home with 4 Day Night Weatherproof Bullet Cameras', 'rakuten.com', 'dscnico', 99, 'visunico', '107.99', 1);

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
(2, 'monPseudo2', 'monMDP2', 'blabla', 'blabla', 'blabla', 'blabla', 54321, 'blabla', 'blabla', 3),
(3, 'monPseudo3', 'monMDP3', 'blabla', 'blabla', 'blabla', 'blabla', 65432, 'blabla', 'blabla', 2);
