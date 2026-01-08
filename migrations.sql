CREATE DATABASE IF NOT EXISTS mini_games;
USE mini_games;

-- Users table
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Memory Game Highscores
CREATE TABLE IF NOT EXISTS memory_highscores (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
level ENUM('easy','medium','hard') NOT NULL,
time_seconds INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
UNIQUE KEY unique_user_level (user_id, level)
);

-- Tabula visiem mēģinājumiem (Vēsturei)
CREATE TABLE IF NOT EXISTS memory_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    level ENUM('easy','medium','hard') NOT NULL,
    time_seconds INT NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Typing Game Highscores
CREATE TABLE IF NOT EXISTS typing_highscores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    level ENUM('easy','medium','hard','hardcore') NOT NULL,
    language VARCHAR(5) DEFAULT 'lv', -- Pievienota valodas kolonna
    wpm FLOAT NOT NULL,
    time_seconds INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    -- Atjaunota atslēga: lietotājam var būt viens rekords katram līmenim UN valodai
    UNIQUE KEY unique_user_level_lang (user_id, level, language) 
);

-- Typing Game Vēsture
CREATE TABLE IF NOT EXISTS typing_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    level ENUM('easy','medium','hard','hardcore') NOT NULL,
    language VARCHAR(5) DEFAULT 'lv', -- Pievienota valodas kolonna
    wpm FLOAT NOT NULL,
    time_seconds INT NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);