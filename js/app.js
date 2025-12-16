/**
 * Winter Road Trip Planner - JavaScript
 * Handles all UI interactions and AJAX calls
 */

// Global state
let currentTrip = null;
let currentSlide = 1;
let drivers = [];
let activeDriver = 1;

// API base URL (adjust for production)
const API_URL = 'php/api.php';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Winter Road Trip Planner initialized');
    
    // Set minimum date to today
    const dateInput = document.getElementById('departure-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }

    // Check if there's an existing trip
    checkExistingTrip();

    // Setup form handlers
    setupFormHandlers();
});

// Carousel functions
function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (currentSlide < slides.length) {
        slides[currentSlide - 1].classList.remove('active');
        indicators[currentSlide - 1].classList.remove('active');
        
        currentSlide++;
        
        slides[currentSlide - 1].classList.add('active');
        indicators[currentSlide - 1].classList.add('active');
    }
}

function skipCarousel() {
    showSetup();
}

function showSetup() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('setup-screen').classList.add('active');
}

// Location detection
function detectLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    showLoading();

    navigator.geolocation.getCurrentPosition(
        function(position) {
            // In a real app, would reverse geocode these coordinates
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // For demo, just update the input
            document.getElementById('start-location').value = `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            hideLoading();
        },
        function(error) {
            hideLoading();
            alert('Unable to retrieve your location');
        }
    );
}

// Check for existing trip
function checkExistingTrip() {
    fetch(`${API_URL}?action=trip`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.trip) {
                currentTrip = data.trip;
                // Skip to dashboard if trip exists
                // For demo, always show welcome screen first
            }
        })
        .catch(error => console.error('Error checking trip:', error));
}

// Setup form handlers
function setupFormHandlers() {
    // Setup form
    const setupForm = document.getElementById('setup-form');
    if (setupForm) {
        setupForm.addEventListener('submit', handleSetupSubmit);
    }

    // Add stop form
    const addStopForm = document.getElementById('add-stop-form');
    if (addStopForm) {
        addStopForm.addEventListener('submit', handleAddStop);
    }

    // Add note form
    const addNoteForm = document.getElementById('add-note-form');
    if (addNoteForm) {
        addNoteForm.addEventListener('submit', handleAddNote);
    }
}

// Handle setup form submission
function handleSetupSubmit(e) {
    e.preventDefault();
    
    const startLocation = document.getElementById('start-location').value;
    const departureDate = document.getElementById('departure-date').value;

    if (!startLocation) {
        alert('Please enter a starting location');
        return;
    }

    showLoading();

    const data = {
        start_location: startLocation,
        departure_date: departureDate,
        vehicle_id: 1
    };

    fetch(`${API_URL}?action=create_trip`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        hideLoading();
        if (data.success) {
            currentTrip = { id: data.trip_id, start_location: startLocation };
            showDashboard();
            loadTripData();
        } else {
            alert('Failed to create trip: ' + data.message);
        }
    })
    .catch(error => {
        hideLoading();
        console.error('Error:', error);
        alert('Failed to create trip');
    });
}

// Show dashboard
function showDashboard() {
    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('dashboard-screen').classList.add('active');
}

// Load trip data
function loadTripData() {
    if (!currentTrip) return;

    // Load drivers
    loadDrivers();

    // Load safety checklist
    loadSafetyChecklist();

    // Load notes
    loadNotes();

    // Update summary
    updateSummary();
}

// Load drivers
function loadDrivers() {
    fetch(`${API_URL}?action=drivers`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                drivers = data.drivers;
                updateDriverDisplay();
            }
        })
        .catch(error => console.error('Error loading drivers:', error));
}

// Update driver display
function updateDriverDisplay() {
    drivers.forEach((driver, index) => {
        const btn = document.querySelector(`[data-driver="${driver.id}"]`);
        if (btn) {
            btn.querySelector('.driver-name').textContent = driver.name;
            btn.querySelector('.driver-km').textContent = `${parseFloat(driver.current_trip_km).toFixed(1)} km`;
        }
    });
}

// Switch driver
function switchDriver(driverId) {
    activeDriver = driverId;

    // Update UI
    document.querySelectorAll('.driver-switch-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-driver="${driverId}"]`).classList.add('active');

    // Update in database if trip exists
    if (currentTrip) {
        fetch(`${API_URL}?action=switch_driver`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trip_id: currentTrip.id,
                driver_id: driverId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Driver switched successfully');
            }
        })
        .catch(error => console.error('Error switching driver:', error));
    }
}

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Load data for specific tabs
    if (tabName === 'safety' && currentTrip) {
        loadSafetyChecklist();
    } else if (tabName === 'notes' && currentTrip) {
        loadNotes();
    }
}

// Load safety checklist
function loadSafetyChecklist() {
    if (!currentTrip) return;

    fetch(`${API_URL}?action=safety_checklist&trip_id=${currentTrip.id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayChecklist(data.checklist);
            }
        })
        .catch(error => console.error('Error loading checklist:', error));
}

// Display checklist
function displayChecklist(items) {
    const categories = {
        vehicle: document.getElementById('vehicle-checklist'),
        supplies: document.getElementById('supplies-checklist'),
        documents: document.getElementById('documents-checklist'),
        clothing: document.getElementById('clothing-checklist')
    };

    // Clear existing items
    Object.values(categories).forEach(container => {
        if (container) container.innerHTML = '';
    });

    // Group items by category
    items.forEach(item => {
        const container = categories[item.category];
        if (!container) return;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'checklist-item' + (item.is_completed ? ' completed' : '');
        itemDiv.innerHTML = `
            <input type="checkbox" 
                   id="check-${item.id}" 
                   ${item.is_completed ? 'checked' : ''}
                   onchange="toggleChecklistItem(${item.id}, this.checked)">
            <label for="check-${item.id}">${item.item_name}</label>
        `;
        container.appendChild(itemDiv);
    });
}

// Toggle checklist item
function toggleChecklistItem(itemId, isChecked) {
    fetch(`${API_URL}?action=update_checklist`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_id: itemId,
            is_completed: isChecked ? 1 : 0
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update UI
            const itemDiv = document.querySelector(`#check-${itemId}`).closest('.checklist-item');
            if (isChecked) {
                itemDiv.classList.add('completed');
            } else {
                itemDiv.classList.remove('completed');
            }
        }
    })
    .catch(error => console.error('Error updating checklist:', error));
}

// Handle add stop
function handleAddStop(e) {
    e.preventDefault();

    if (!currentTrip) {
        alert('Please create a trip first');
        return;
    }

    const locationName = document.getElementById('stop-location').value;
    const stopType = document.getElementById('stop-type').value;
    const dayNumber = document.getElementById('stop-day').value;

    const data = {
        trip_id: currentTrip.id,
        stop_type: stopType,
        location_name: locationName,
        day_number: dayNumber,
        stop_order: 1 // Simplified for demo
    };

    fetch(`${API_URL}?action=add_stop`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('add-stop-form').reset();
            alert('Stop added successfully!');
            loadCustomStops();
        } else {
            alert('Failed to add stop: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add stop');
    });
}

// Load custom stops
function loadCustomStops() {
    if (!currentTrip) return;

    fetch(`${API_URL}?action=trip_stops&trip_id=${currentTrip.id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayCustomStops(data.stops);
            }
        })
        .catch(error => console.error('Error loading stops:', error));
}

// Display custom stops
function displayCustomStops(stops) {
    const container = document.getElementById('custom-stops-list');
    if (!container) return;

    if (stops.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = '<h5 style="margin-top: 20px;">Custom Stops</h5>';
    
    stops.forEach(stop => {
        const stopDiv = document.createElement('div');
        stopDiv.className = 'waypoint';
        stopDiv.innerHTML = `
            <i class="fas fa-${getStopIcon(stop.stop_type)}"></i>
            <span>Day ${stop.day_number}: ${stop.location_name}</span>
        `;
        container.appendChild(stopDiv);
    });
}

// Get icon for stop type
function getStopIcon(type) {
    const icons = {
        gas: 'gas-pump',
        food: 'utensils',
        rest: 'coffee',
        overnight: 'hotel',
        scenic: 'camera'
    };
    return icons[type] || 'map-marker-alt';
}

// Handle add note
function handleAddNote(e) {
    e.preventDefault();

    if (!currentTrip) {
        alert('Please create a trip first');
        return;
    }

    const noteText = document.getElementById('note-text').value;
    const category = document.getElementById('note-category').value;

    const data = {
        trip_id: currentTrip.id,
        note_text: noteText,
        category: category
    };

    fetch(`${API_URL}?action=add_note`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('add-note-form').reset();
            loadNotes();
        } else {
            alert('Failed to add note: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add note');
    });
}

// Load notes
function loadNotes() {
    if (!currentTrip) return;

    fetch(`${API_URL}?action=trip_notes&trip_id=${currentTrip.id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                displayNotes(data.notes);
            }
        })
        .catch(error => console.error('Error loading notes:', error));
}

// Display notes
function displayNotes(notes) {
    const container = document.getElementById('notes-list');
    if (!container) return;

    if (notes.length === 0) {
        container.innerHTML = '<p class="no-notes">No notes yet. Add your first note above!</p>';
        return;
    }

    container.innerHTML = '';
    
    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        const date = new Date(note.created_at).toLocaleString();
        noteDiv.innerHTML = `
            <div class="note-header">
                <span class="note-category">${note.category}</span>
                <span class="note-date">${date}</span>
            </div>
            <p class="note-text">${escapeHtml(note.note_text)}</p>
        `;
        container.appendChild(noteDiv);
    });
}

// Quick note
function addQuickNote() {
    switchTab('notes');
    document.getElementById('note-text').focus();
}

// Update summary
function updateSummary() {
    if (!currentTrip) return;

    const startElement = document.getElementById('summary-start');
    if (startElement && currentTrip.start_location) {
        startElement.textContent = currentTrip.start_location;
    }

    // Update route start in day 1
    const routeStartElement = document.getElementById('route-start-day1');
    if (routeStartElement && currentTrip.start_location) {
        routeStartElement.textContent = currentTrip.start_location;
    }
}

// Helper functions
function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Simulate demo data for testing without database
function loadDemoData() {
    // This function can be called to populate demo data
    const demoChecklist = [
        { id: 1, item_name: 'Winter tires installed', category: 'vehicle', is_completed: false },
        { id: 2, item_name: 'Emergency kit', category: 'supplies', is_completed: false },
        { id: 3, item_name: 'Drivers license', category: 'documents', is_completed: true },
        { id: 4, item_name: 'Winter jacket', category: 'clothing', is_completed: true }
    ];
    
    displayChecklist(demoChecklist);
}

// Export functions to global scope
window.nextSlide = nextSlide;
window.skipCarousel = skipCarousel;
window.showSetup = showSetup;
window.detectLocation = detectLocation;
window.switchDriver = switchDriver;
window.switchTab = switchTab;
window.toggleChecklistItem = toggleChecklistItem;
window.addQuickNote = addQuickNote;
