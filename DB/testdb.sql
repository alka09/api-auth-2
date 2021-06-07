-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 08 2021 г., 00:54
-- Версия сервера: 5.7.29
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `testdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `surname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`id`, `firstname`, `surname`) VALUES
(1, 'Mike', 'Jackson'),
(2, 'Helen', 'Fell'),
(3, 'Thom', 'Hueston'),
(4, 'Alice', 'Moore'),
(5, 'Sam', 'Green'),
(6, 'Linda', 'Woolen'),
(7, 'Jack', 'Black'),
(8, 'Emily', 'Cage'),
(9, 'Alex', 'Brown'),
(10, 'Bob', 'Marley'),
(11, '1', '1'),
(12, '1', '1'),
(13, '1', '1'),
(14, '1', '1'),
(15, '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'Anna', '$2y$10$LiXs9sFEVNnQSgNAx9mmkugq/Pq03Yip5Y6jTVtted7hnoLdZlzJO'),
(2, 'Mike', '$2y$10$M3A8nSCPm.sMSeX8.6gqeOsI6VulR/Z4uZ5oRtH8u3kkHLGFlv0kS'),
(3, 'Gaz', '$2y$10$7RB3j1xE9o0z/TN3lMnS5OlkcmVIkQHiPPocsuA76xUGde7vl0LdS'),
(4, 'Frank', '$2y$10$JiMTlzlRbPssxaff.K2OW.x0Jmx1D7g59KG6LOSYJkzJ60nbOkVoW'),
(5, 'Amanda', '$2y$10$1v9EJk8/qOg5YcQBApuR5OezA.cxy7ilXSE7hUPUkuAmA8PPKHbx.'),
(6, 'alka', '$2y$10$.huLOuiQfflBYrRLMAZ4/eEb8WMCkHVfYrOiSny/yhHBa2XeG1B/O'),
(7, '', '$2y$10$4l0qgmoLmlhZgbNEHkLcw.R2PGfWFQi9d57ljVRltm0rL/Uy8xN8y'),
(8, 'buka', '$2y$10$holh3X.8G93bdFCV/axCqejU5hludDsQGolPAi4cQkdMUaaqKrUJq'),
(9, 'buka', '$2y$10$6XcNWuO..YDhgPVEmvIcZuLHq4BMgc164RegLQ0yq2djPfY0xb13S'),
(10, 'nansy', '$2y$10$dRcXOOQLNyFazot8hKJIaOcIrJIPZK60OBhIWEWg7VDwlZNjy8oHi'),
(11, 'alex', '$2y$10$P6PWwzxkbp3htb3OwvBeYuoO91abs7oILTYUDxSrqAeudYs8i6tYK'),
(12, 'Eva', '$2y$10$ER0i6EnjuExYG5sxXJo7dOdxqhI74G77cKlfXOIXnF1V8B51WI.vW');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_id_uindex` (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
