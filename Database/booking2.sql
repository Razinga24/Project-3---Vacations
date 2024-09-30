-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2024 at 04:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking2`
--
CREATE DATABASE IF NOT EXISTS `booking2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `booking2`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(1, 1),
(1, 2),
(1, 4),
(1, 6),
(2, 3),
(2, 5),
(2, 7),
(3, 3),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 11);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'cd8bc8aa95ae766cdade8315f6d6ebef33ab598fcbd6d970e59b0f2877674096cecad8987fc0a4fd7b53e8b43afbbb4613964d767a84a405ddb09fac1a0842b3', 2),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'cd8bc8aa95ae766cdade8315f6d6ebef33ab598fcbd6d970e59b0f2877674096cecad8987fc0a4fd7b53e8b43afbbb4613964d767a84a405ddb09fac1a0842b3', 2),
(3, 'Raz', 'Benayoun', 'bnnraz@gmail.com', 'cd8bc8aa95ae766cdade8315f6d6ebef33ab598fcbd6d970e59b0f2877674096cecad8987fc0a4fd7b53e8b43afbbb4613964d767a84a405ddb09fac1a0842b3', 1),
(4, 'dana', 'levy', 'dana@gmail.com', 'cd8bc8aa95ae766cdade8315f6d6ebef33ab598fcbd6d970e59b0f2877674096cecad8987fc0a4fd7b53e8b43afbbb4613964d767a84a405ddb09fac1a0842b3', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(250) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `imageName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Paris', 'Discover the magic of Paris, the city of lights. Stroll along the Seine River, visit world-renowned landmarks like the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum. Indulge in gourmet French cuisine and shop in chic boutiques along the C', '2024-06-01', '2024-06-10', 999.99, 'paris.jpg'),
(2, 'New York', 'Experience the energy of New York City, the city that never sleeps. This 10-day vacation package includes visits to iconic attractions like the Statue of Liberty, Empire State Building, and Times Square. Enjoy world-class dining and Broadway shows, a', '2024-07-15', '2024-07-25', 999.99, 'newyork.jpg'),
(3, 'Tokyo', 'Explore the fascinating mix of ancient traditions and cutting-edge technology in Tokyo, Japan. Visit historic sites such as the Meiji Shrine, the Imperial Palace, and the Senso-ji Temple in Asakusa. Wander through vibrant districts like Shibuya and H', '2024-09-10', '2024-09-20', 999.99, 'tokyo.jpg'),
(4, 'Rome', 'Walk through the ancient ruins of Rome, the Eternal City, where history meets modern culture. Visit the Colosseum, the Roman Forum, and the Pantheon. Marvel at the beauty of the Vatican City, including St. Peter\'s Basilica and the Sistine Chapel. Enj', '2025-06-05', '2025-11-12', 999.99, '0b86c3b1-1914-43c6-84f8-ef32a27f7af4.jpg'),
(5, 'Sydney', 'Discover the natural beauty and vibrant culture of Sydney, Australia. This vacation includes visits to the iconic Sydney Opera House and the Harbour Bridge. Relax on the golden sands of Bondi Beach or take a day trip to the Blue Mountains. You\'ll als', '2024-08-05', '2024-08-15', 999.99, 'sydney.jpg'),
(6, 'Rio de Janeiro', 'Explore the vibrant energy of Rio de Janeiro, Brazil, famous for its stunning beaches and lively culture. Visit the iconic Christ the Redeemer statue, take a cable car up to Sugarloaf Mountain, and relax on the world-famous Copacabana and Ipanema bea', '2024-12-24', '2024-12-30', 999.99, '0479063c-4817-42e8-99ed-2ddbd58a5e05.jpg'),
(7, 'Cape Town', 'Journey to Cape Town, South Africa, a city known for its stunning landscapes and rich history. Explore the iconic Table Mountain, visit Robben Island where Nelson Mandela was imprisoned, and enjoy the scenic beauty of the Cape of Good Hope. Experienc', '2024-05-01', '2024-05-10', 999.99, 'capetown.jpg'),
(8, 'Dubai', 'Discover the ultramodern city of Dubai, UAE, where luxury meets tradition. Visit the towering Burj Khalifa, the tallest building in the world, and explore the lavish shopping malls, including the Dubai Mall. Take a desert safari with dune bashing, ca', '2024-11-15', '2024-11-25', 999.99, 'dubai.jpg'),
(9, 'Bali', 'Relax in the tropical paradise of Bali, Indonesia. This vacation offers a serene escape with visits to stunning beaches, vibrant coral reefs, and lush rice terraces. Discover the island’s spiritual side with temple tours to Uluwatu and Tanah Lot, and', '2024-12-01', '2024-12-10', 999.99, 'bali.jpg'),
(10, 'Santorini', 'Experience the breathtaking views of Santorini, Greece, famous for its white-washed buildings with blue-domed roofs overlooking the Aegean Sea. Enjoy romantic sunsets in the town of Oia, explore the ancient ruins of Akrotiri, and relax on the island\'', '2024-06-20', '2024-06-30', 999.99, 'santorini.jpg'),
(11, 'Barcelona', '\r\nBarcelona, the capital of Catalonia', '2024-11-28', '2024-11-30', 810.00, 'barcelona.jpg'),
(12, 'Amsterdam', '\r\nAmsterdam, the Netherlands\' capital, is known for its scenic canals, historic architecture, and rich cultural scene. Highlights include the Rijksmuseum, Van Gogh Museum, and Anne Frank House. Famous for its cycling culture and vibrant café life, th', '2024-12-09', '2024-12-20', 999.99, '25e098e7-3861-40f6-bb7d-63303bd23391.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
