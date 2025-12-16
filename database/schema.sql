-- Winter Road Trip Planner Database Schema
-- Database: winter_trip_planner

CREATE DATABASE IF NOT EXISTS winter_trip_planner;
USE winter_trip_planner;

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    total_km_driven DECIMAL(10, 2) DEFAULT 0.00,
    current_trip_km DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vehicle information table
CREATE TABLE IF NOT EXISTS vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_type VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_name VARCHAR(200),
    start_location VARCHAR(200) NOT NULL,
    start_lat DECIMAL(10, 8),
    start_lng DECIMAL(11, 8),
    destination VARCHAR(200) DEFAULT '201 Park Av Melfort, SK S0E 1A0',
    destination_lat DECIMAL(10, 8) DEFAULT 52.8561,
    destination_lng DECIMAL(11, 8) DEFAULT -104.6119,
    vehicle_id INT,
    departure_date DATE,
    arrival_date DATE,
    total_distance DECIMAL(10, 2),
    estimated_duration VARCHAR(50),
    status ENUM('planning', 'active', 'completed', 'cancelled') DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Trip drivers (many-to-many relationship)
CREATE TABLE IF NOT EXISTS trip_drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    driver_id INT NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    km_driven DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);

-- Daily stops/waypoints
CREATE TABLE IF NOT EXISTS trip_stops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    stop_type ENUM('overnight', 'gas', 'rest', 'food', 'scenic') NOT NULL,
    location_name VARCHAR(200) NOT NULL,
    address VARCHAR(300),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    day_number INT NOT NULL,
    stop_order INT NOT NULL,
    estimated_arrival TIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- Weather alerts
CREATE TABLE IF NOT EXISTS weather_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    location VARCHAR(200) NOT NULL,
    alert_type ENUM('snow', 'ice', 'blizzard', 'closure', 'delay', 'warning') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    description TEXT,
    alert_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- Road conditions
CREATE TABLE IF NOT EXISTS road_conditions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    highway_name VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    condition_type ENUM('clear', 'wet', 'snow_covered', 'icy', 'closed') NOT NULL,
    temperature DECIMAL(5, 2),
    visibility VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- Trip notes
CREATE TABLE IF NOT EXISTS trip_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    note_text TEXT NOT NULL,
    category ENUM('general', 'reminder', 'emergency', 'contact', 'other') DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- Safety checklist items
CREATE TABLE IF NOT EXISTS safety_checklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    item_name VARCHAR(200) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    category ENUM('vehicle', 'supplies', 'documents', 'clothing') NOT NULL,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- Insert default drivers
INSERT INTO drivers (name, total_km_driven, current_trip_km) VALUES
('Chance', 0.00, 0.00),
('London', 0.00, 0.00);

-- Insert default vehicle
INSERT INTO vehicles (vehicle_type, year, license_plate) VALUES
('Buick Encore', 2019, 'daTy 9990');

-- Insert default safety checklist items (will be copied per trip)
CREATE TABLE IF NOT EXISTS safety_checklist_template (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(200) NOT NULL,
    category ENUM('vehicle', 'supplies', 'documents', 'clothing') NOT NULL
);

INSERT INTO safety_checklist_template (item_name, category) VALUES
('Winter tires installed and in good condition', 'vehicle'),
('Spare tire and jack', 'vehicle'),
('Windshield washer fluid (winter formula)', 'vehicle'),
('Battery tested and fully charged', 'vehicle'),
('Brake system checked', 'vehicle'),
('Emergency kit (first aid, flashlight, batteries)', 'supplies'),
('Jumper cables or portable battery booster', 'supplies'),
('Ice scraper and snow brush', 'supplies'),
('Shovel', 'supplies'),
('Sand or kitty litter for traction', 'supplies'),
('Blankets and warm clothing', 'supplies'),
('Non-perishable snacks and water', 'supplies'),
('Phone charger (car adapter)', 'supplies'),
('Roadside flares or warning triangles', 'supplies'),
('Drivers license and registration', 'documents'),
('Insurance papers', 'documents'),
('Emergency contact list', 'documents'),
('Winter jacket', 'clothing'),
('Gloves and hat', 'clothing'),
('Winter boots', 'clothing');
