-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Nov 17. 20:15
-- Kiszolgáló verziója: 10.4.25-MariaDB
-- PHP verzió: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `2123szft_esvab`
--
CREATE DATABASE IF NOT EXISTS `2123szft_esvab` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `2123szft_esvab`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `spendings`
--

CREATE TABLE `spendings` (
  `spendingID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `typeID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `spendings`
--

INSERT INTO `spendings` (`spendingID`, `UID`, `typeID`, `amount`, `date`) VALUES
(1, 1, 1, 10000, '2022-11-13'),
(2, 1, 7, 5000, '2022-10-31'),
(3, 1, 5, 7000, '2022-11-02'),
(4, 1, 11, 5000, '2022-11-13'),
(5, 1, 9, 1400, '2022-11-15');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `spendingtypes`
--

CREATE TABLE `spendingtypes` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_hungarian_ci NOT NULL,
  `diff` tinyint(1) NOT NULL,
  `icon` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `color` varchar(20) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `spendingtypes`
--

INSERT INTO `spendingtypes` (`ID`, `name`, `diff`, `icon`, `color`) VALUES
(1, 'Fizetés', 1, 'bi-cash-stack', '20, 116, 111'),
(2, 'Egészségügy', 0, 'bi-heart-pulse', '100, 18, 32'),
(3, 'Gyógyszerek', 0, 'bi-capsule', '110, 20, 35'),
(4, 'Tisztálkodás', 0, 'bi-droplet', '133, 24, 42'),
(5, 'Élelmiszer', 0, 'bi-egg', '161, 29, 51'),
(6, 'Szórakozás', 0, 'bi-controller', '167, 30, 52'),
(7, 'Utazás', 0, 'bi-airplane', '178, 30, 53'),
(8, 'Tankolás', 0, 'bi-fuel-pump', '189, 31, 54'),
(9, 'Ruha', 0, 'bi-bag', '199, 31, 55'),
(10, 'Egyéb kiadások', 0, 'bi-three-dots', '218, 30, 55'),
(11, 'Egyéb keresetek', 1, 'bi-piggy-bank', '36, 130, 119');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `reg` date NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `password`, `reg`, `status`) VALUES
(1, 'admin', 'admin@admin.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '2022-11-02', 1),
(2, 'ZickyXD', 'ciki@mehu.net', 'c7114c6ae22b5fa7e5c060f09aea7eb19c09b5c2', '2022-11-17', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `spendings`
--
ALTER TABLE `spendings`
  ADD PRIMARY KEY (`spendingID`),
  ADD KEY `UID` (`UID`),
  ADD KEY `type` (`typeID`);

--
-- A tábla indexei `spendingtypes`
--
ALTER TABLE `spendingtypes`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `spendings`
--
ALTER TABLE `spendings`
  MODIFY `spendingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `spendingtypes`
--
ALTER TABLE `spendingtypes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `spendings`
--
ALTER TABLE `spendings`
  ADD CONSTRAINT `spendings_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `spendings_ibfk_2` FOREIGN KEY (`typeID`) REFERENCES `spendingtypes` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
