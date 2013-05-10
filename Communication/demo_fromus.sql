-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Ven 10 Mai 2013 à 07:26
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
  PRIMARY KEY (`prd_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Contenu de la table `produits`
--

INSERT INTO `produits` (`prd_id`, `prd_libelle`, `prd_site`, `prd_desc`, `prd_cat`, `prd_visu`, `prd_prix`, `prd_vis`) VALUES
(11, 'English Laundry Floral Cuff Plaid Mens Dress Shirt Black Size S', 'rakuten.com', 'dscnico', 99, 'visunico', '29.99', 1),
(12, 'Asics GT 2160 Women''s Running Shoes Sneakers Wide Width T156N-7401 Size 6.5', 'rakuten.com', 'dscnico', 99, 'visunico', '54.99', 1);
