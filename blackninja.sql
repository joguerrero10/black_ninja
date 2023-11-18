-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2023 at 07:33 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blackninja`
--

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `identificador` int(50) NOT NULL,
  `primer_nombre` text NOT NULL,
  `foto` text NOT NULL,
  `nivel1` text NOT NULL,
  `puntaje_nivel1` int(11) NOT NULL,
  `nivel2` text NOT NULL,
  `puntaje_nivel2` int(11) NOT NULL,
  `nivel3` text NOT NULL,
  `puntaje_nivel3` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `identificador`, `primer_nombre`, `foto`, `nivel1`, `puntaje_nivel1`, `nivel2`, `puntaje_nivel2`, `nivel3`, `puntaje_nivel3`) VALUES
(1, 22222222, 'julio', 'views/img/intro/julio.png', 'ok', 200, 'ok', 200, 'ok', 300),
(3, 11111111, 'maria', 'views/img/intro/maria.png', 'ok', 345, 'ok', 340, 'ok', 0),
(4, 33333333, 'juan', 'views/img/intro/juan.png', 'ok', 120, 'ok', 500, 'ok', 0),
(7, 3333333, 'enrique', 'views/img/intro/enrique.png', 'ok', 500, 'ok', 60, 'ok', 0),
(8, 666666, 'miguel', 'views/img/intro/miguel.png', 'ok', 432, 'ok', 0, '', 0),
(9, 55555555, 'pedro', 'views/img/intro/pedro.png', 'ok', 0, '', 0, '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
