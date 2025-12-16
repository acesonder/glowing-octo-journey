<?php
/**
 * Trip API Endpoints
 * Handles all trip-related operations
 */

require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];
$conn = getDBConnection();

if (!$conn) {
    sendJSON(['error' => 'Database connection failed'], 500);
}

// Get action from request
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($method) {
    case 'GET':
        handleGet($conn, $action);
        break;
    case 'POST':
        handlePost($conn, $action);
        break;
    case 'PUT':
        handlePut($conn, $action);
        break;
    case 'DELETE':
        handleDelete($conn, $action);
        break;
    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}

function handleGet($conn, $action) {
    switch ($action) {
        case 'drivers':
            getDrivers($conn);
            break;
        case 'trip':
            getTrip($conn);
            break;
        case 'trips':
            getTrips($conn);
            break;
        case 'trip_stops':
            getTripStops($conn);
            break;
        case 'weather_alerts':
            getWeatherAlerts($conn);
            break;
        case 'safety_checklist':
            getSafetyChecklist($conn);
            break;
        case 'trip_notes':
            getTripNotes($conn);
            break;
        case 'vehicle':
            getVehicle($conn);
            break;
        default:
            sendJSON(['error' => 'Invalid action'], 400);
    }
}

function handlePost($conn, $action) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    switch ($action) {
        case 'create_trip':
            createTrip($conn, $data);
            break;
        case 'add_stop':
            addStop($conn, $data);
            break;
        case 'add_note':
            addNote($conn, $data);
            break;
        case 'add_weather_alert':
            addWeatherAlert($conn, $data);
            break;
        case 'switch_driver':
            switchDriver($conn, $data);
            break;
        case 'update_km':
            updateKm($conn, $data);
            break;
        default:
            sendJSON(['error' => 'Invalid action'], 400);
    }
}

function handlePut($conn, $action) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    switch ($action) {
        case 'update_trip':
            updateTrip($conn, $data);
            break;
        case 'update_checklist':
            updateChecklist($conn, $data);
            break;
        case 'update_stop':
            updateStop($conn, $data);
            break;
        default:
            sendJSON(['error' => 'Invalid action'], 400);
    }
}

function handleDelete($conn, $action) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    switch ($action) {
        case 'delete_trip':
            deleteTrip($conn, $id);
            break;
        case 'delete_stop':
            deleteStop($conn, $id);
            break;
        case 'delete_note':
            deleteNote($conn, $id);
            break;
        default:
            sendJSON(['error' => 'Invalid action'], 400);
    }
}

// Implementation functions

function getDrivers($conn) {
    $sql = "SELECT * FROM drivers ORDER BY name";
    $result = $conn->query($sql);
    $drivers = [];
    
    while ($row = $result->fetch_assoc()) {
        $drivers[] = $row;
    }
    
    sendJSON(['success' => true, 'drivers' => $drivers]);
}

function getTrip($conn) {
    $tripId = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($tripId === 0) {
        // Get the most recent active trip
        $sql = "SELECT * FROM trips WHERE status IN ('planning', 'active') ORDER BY created_at DESC LIMIT 1";
    } else {
        $sql = "SELECT * FROM trips WHERE id = $tripId";
    }
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $trip = $result->fetch_assoc();
        
        // Get trip drivers
        $driverSql = "SELECT d.*, td.km_driven, td.is_active 
                      FROM drivers d 
                      JOIN trip_drivers td ON d.id = td.driver_id 
                      WHERE td.trip_id = " . $trip['id'];
        $driverResult = $conn->query($driverSql);
        $trip['drivers'] = [];
        
        while ($driver = $driverResult->fetch_assoc()) {
            $trip['drivers'][] = $driver;
        }
        
        sendJSON(['success' => true, 'trip' => $trip]);
    } else {
        sendJSON(['success' => false, 'message' => 'No trip found']);
    }
}

function getTrips($conn) {
    $sql = "SELECT * FROM trips ORDER BY created_at DESC";
    $result = $conn->query($sql);
    $trips = [];
    
    while ($row = $result->fetch_assoc()) {
        $trips[] = $row;
    }
    
    sendJSON(['success' => true, 'trips' => $trips]);
}

function getTripStops($conn) {
    $tripId = isset($_GET['trip_id']) ? intval($_GET['trip_id']) : 0;
    
    $sql = "SELECT * FROM trip_stops WHERE trip_id = $tripId ORDER BY day_number, stop_order";
    $result = $conn->query($sql);
    $stops = [];
    
    while ($row = $result->fetch_assoc()) {
        $stops[] = $row;
    }
    
    sendJSON(['success' => true, 'stops' => $stops]);
}

function getWeatherAlerts($conn) {
    $tripId = isset($_GET['trip_id']) ? intval($_GET['trip_id']) : 0;
    
    $sql = "SELECT * FROM weather_alerts WHERE trip_id = $tripId ORDER BY alert_date DESC, created_at DESC";
    $result = $conn->query($sql);
    $alerts = [];
    
    while ($row = $result->fetch_assoc()) {
        $alerts[] = $row;
    }
    
    sendJSON(['success' => true, 'alerts' => $alerts]);
}

function getSafetyChecklist($conn) {
    $tripId = isset($_GET['trip_id']) ? intval($_GET['trip_id']) : 0;
    
    $sql = "SELECT * FROM safety_checklist WHERE trip_id = $tripId ORDER BY category, item_name";
    $result = $conn->query($sql);
    $items = [];
    
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    
    sendJSON(['success' => true, 'checklist' => $items]);
}

function getTripNotes($conn) {
    $tripId = isset($_GET['trip_id']) ? intval($_GET['trip_id']) : 0;
    
    $sql = "SELECT * FROM trip_notes WHERE trip_id = $tripId ORDER BY created_at DESC";
    $result = $conn->query($sql);
    $notes = [];
    
    while ($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }
    
    sendJSON(['success' => true, 'notes' => $notes]);
}

function getVehicle($conn) {
    $sql = "SELECT * FROM vehicles LIMIT 1";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $vehicle = $result->fetch_assoc();
        sendJSON(['success' => true, 'vehicle' => $vehicle]);
    } else {
        sendJSON(['success' => false, 'message' => 'No vehicle found']);
    }
}

function createTrip($conn, $data) {
    $startLocation = $conn->real_escape_string($data['start_location'] ?? '');
    $startLat = isset($data['start_lat']) ? floatval($data['start_lat']) : null;
    $startLng = isset($data['start_lng']) ? floatval($data['start_lng']) : null;
    $departureDate = $data['departure_date'] ?? date('Y-m-d');
    $vehicleId = isset($data['vehicle_id']) ? intval($data['vehicle_id']) : 1;
    
    $sql = "INSERT INTO trips (start_location, start_lat, start_lng, departure_date, vehicle_id, status) 
            VALUES ('$startLocation', " . ($startLat ? $startLat : 'NULL') . ", " . ($startLng ? $startLng : 'NULL') . ", '$departureDate', $vehicleId, 'planning')";
    
    if ($conn->query($sql)) {
        $tripId = $conn->insert_id;
        
        // Add both drivers to the trip
        $driverSql = "INSERT INTO trip_drivers (trip_id, driver_id, is_active) VALUES ($tripId, 1, 1), ($tripId, 2, 0)";
        $conn->query($driverSql);
        
        // Create safety checklist from template
        $checklistSql = "INSERT INTO safety_checklist (trip_id, item_name, category)
                         SELECT $tripId, item_name, category FROM safety_checklist_template";
        $conn->query($checklistSql);
        
        sendJSON(['success' => true, 'trip_id' => $tripId, 'message' => 'Trip created successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to create trip: ' . $conn->error], 500);
    }
}

function addStop($conn, $data) {
    $tripId = intval($data['trip_id']);
    $stopType = $conn->real_escape_string($data['stop_type']);
    $locationName = $conn->real_escape_string($data['location_name']);
    $address = $conn->real_escape_string($data['address'] ?? '');
    $dayNumber = intval($data['day_number']);
    $stopOrder = intval($data['stop_order']);
    $notes = $conn->real_escape_string($data['notes'] ?? '');
    
    $sql = "INSERT INTO trip_stops (trip_id, stop_type, location_name, address, day_number, stop_order, notes) 
            VALUES ($tripId, '$stopType', '$locationName', '$address', $dayNumber, $stopOrder, '$notes')";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Stop added successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to add stop'], 500);
    }
}

function addNote($conn, $data) {
    $tripId = intval($data['trip_id']);
    $noteText = $conn->real_escape_string($data['note_text']);
    $category = $conn->real_escape_string($data['category'] ?? 'general');
    
    $sql = "INSERT INTO trip_notes (trip_id, note_text, category) 
            VALUES ($tripId, '$noteText', '$category')";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Note added successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to add note'], 500);
    }
}

function addWeatherAlert($conn, $data) {
    $tripId = intval($data['trip_id']);
    $location = $conn->real_escape_string($data['location']);
    $alertType = $conn->real_escape_string($data['alert_type']);
    $severity = $conn->real_escape_string($data['severity']);
    $description = $conn->real_escape_string($data['description']);
    $alertDate = $data['alert_date'];
    
    $sql = "INSERT INTO weather_alerts (trip_id, location, alert_type, severity, description, alert_date) 
            VALUES ($tripId, '$location', '$alertType', '$severity', '$description', '$alertDate')";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Weather alert added successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to add alert'], 500);
    }
}

function switchDriver($conn, $data) {
    $tripId = intval($data['trip_id']);
    $driverId = intval($data['driver_id']);
    
    // Set all drivers to inactive for this trip
    $sql1 = "UPDATE trip_drivers SET is_active = 0 WHERE trip_id = $tripId";
    $conn->query($sql1);
    
    // Set selected driver to active
    $sql2 = "UPDATE trip_drivers SET is_active = 1 WHERE trip_id = $tripId AND driver_id = $driverId";
    
    if ($conn->query($sql2)) {
        sendJSON(['success' => true, 'message' => 'Driver switched successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to switch driver'], 500);
    }
}

function updateKm($conn, $data) {
    $tripId = intval($data['trip_id']);
    $driverId = intval($data['driver_id']);
    $kmDriven = floatval($data['km_driven']);
    
    // Update trip_drivers
    $sql1 = "UPDATE trip_drivers SET km_driven = km_driven + $kmDriven 
             WHERE trip_id = $tripId AND driver_id = $driverId";
    $conn->query($sql1);
    
    // Update drivers total
    $sql2 = "UPDATE drivers SET total_km_driven = total_km_driven + $kmDriven,
             current_trip_km = current_trip_km + $kmDriven
             WHERE id = $driverId";
    
    if ($conn->query($sql2)) {
        sendJSON(['success' => true, 'message' => 'KM updated successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to update KM'], 500);
    }
}

function updateTrip($conn, $data) {
    $tripId = intval($data['trip_id']);
    $updates = [];
    
    if (isset($data['status'])) {
        $updates[] = "status = '" . $conn->real_escape_string($data['status']) . "'";
    }
    if (isset($data['total_distance'])) {
        $updates[] = "total_distance = " . floatval($data['total_distance']);
    }
    if (isset($data['estimated_duration'])) {
        $updates[] = "estimated_duration = '" . $conn->real_escape_string($data['estimated_duration']) . "'";
    }
    
    if (empty($updates)) {
        sendJSON(['success' => false, 'message' => 'No updates provided'], 400);
    }
    
    $sql = "UPDATE trips SET " . implode(', ', $updates) . " WHERE id = $tripId";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Trip updated successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to update trip'], 500);
    }
}

function updateChecklist($conn, $data) {
    $itemId = intval($data['item_id']);
    $isCompleted = intval($data['is_completed']);
    
    $completedAt = $isCompleted ? "NOW()" : "NULL";
    
    $sql = "UPDATE safety_checklist SET is_completed = $isCompleted, completed_at = $completedAt WHERE id = $itemId";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Checklist updated successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to update checklist'], 500);
    }
}

function updateStop($conn, $data) {
    $stopId = intval($data['stop_id']);
    $updates = [];
    
    if (isset($data['notes'])) {
        $updates[] = "notes = '" . $conn->real_escape_string($data['notes']) . "'";
    }
    if (isset($data['estimated_arrival'])) {
        $updates[] = "estimated_arrival = '" . $conn->real_escape_string($data['estimated_arrival']) . "'";
    }
    
    if (empty($updates)) {
        sendJSON(['success' => false, 'message' => 'No updates provided'], 400);
    }
    
    $sql = "UPDATE trip_stops SET " . implode(', ', $updates) . " WHERE id = $stopId";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Stop updated successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to update stop'], 500);
    }
}

function deleteTrip($conn, $id) {
    $sql = "DELETE FROM trips WHERE id = $id";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Trip deleted successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to delete trip'], 500);
    }
}

function deleteStop($conn, $id) {
    $sql = "DELETE FROM trip_stops WHERE id = $id";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Stop deleted successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to delete stop'], 500);
    }
}

function deleteNote($conn, $id) {
    $sql = "DELETE FROM trip_notes WHERE id = $id";
    
    if ($conn->query($sql)) {
        sendJSON(['success' => true, 'message' => 'Note deleted successfully']);
    } else {
        sendJSON(['success' => false, 'message' => 'Failed to delete note'], 500);
    }
}

$conn->close();
?>
