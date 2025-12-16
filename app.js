// Winter Road Trip Planner - JavaScript
// Data Storage
let tripData = {
    startingPoint: '',
    destination: '201 Park Ave, Melfort, SK S0E 1A0',
    primaryDriver: 'chance',
    currentDriver: 'chance',
    vehicle: '2019 Buick Encore',
    licensePlate: 'DATY 9990',
    departureDate: '',
    drivers: {
        chance: {
            name: 'Chance',
            totalDistance: 0,
            totalTime: 0 // in minutes
        },
        london: {
            name: 'London',
            totalDistance: 0,
            totalTime: 0 // in minutes
        }
    },
    route: [],
    hotels: [],
    gasStops: [],
    notes: [],
    safetyChecklist: []
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    initCarousel();
    
    // Setup form submission
    const setupForm = document.getElementById('setupForm');
    if (setupForm) {
        setupForm.addEventListener('submit', handleSetupSubmit);
    }
});

// Carousel Functions
let currentSlide = 0;
const totalSlides = 4;

function initCarousel() {
    const dotsContainer = document.getElementById('carouselDots');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = slideIndex;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function skipCarousel() {
    startSetup();
}

function startSetup() {
    document.getElementById('carouselContainer').style.display = 'none';
    document.getElementById('setupContainer').style.display = 'block';
    
    // Set default departure date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departureDate').value = today;
}

// Location Detection
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, we'd use reverse geocoding API
                // For now, just show a message
                alert('Location detected! You can manually enter your city for now.');
                document.getElementById('startingPoint').focus();
            },
            (error) => {
                alert('Unable to detect location. Please enter manually.');
                document.getElementById('startingPoint').focus();
            }
        );
    } else {
        alert('Geolocation not supported. Please enter manually.');
    }
}

// Setup Form Handler
function handleSetupSubmit(e) {
    e.preventDefault();
    
    tripData.startingPoint = document.getElementById('startingPoint').value;
    tripData.departureDate = document.getElementById('departureDate').value;
    tripData.primaryDriver = document.querySelector('input[name="primaryDriver"]:checked').value;
    tripData.currentDriver = tripData.primaryDriver;
    
    // Generate default route based on starting point
    generateRoute();
    
    // Initialize safety checklist
    initializeSafetyChecklist();
    
    // Save to localStorage
    saveToLocalStorage();
    
    // Show dashboard
    showDashboard();
}

// Generate Route
function generateRoute() {
    // Sample route data - in a real app, this would use a routing API
    const routeLegs = [
        {
            day: 1,
            from: tripData.startingPoint,
            to: 'Thunder Bay, ON',
            distance: 650,
            duration: 480, // 8 hours
            notes: 'First day - aim to arrive before dark. Check weather conditions.'
        },
        {
            day: 2,
            from: 'Thunder Bay, ON',
            to: 'Winnipeg, MB',
            distance: 700,
            duration: 420, // 7 hours
            notes: 'Long stretch across Northern Ontario. Gas up in Kenora.'
        },
        {
            day: 3,
            from: 'Winnipeg, MB',
            to: 'Yorkton, SK',
            distance: 450,
            duration: 360, // 6 hours
            notes: 'Prairie driving - watch for wind and blowing snow.'
        },
        {
            day: 4,
            from: 'Yorkton, SK',
            to: '201 Park Ave, Melfort, SK',
            distance: 200,
            duration: 150, // 2.5 hours
            notes: 'Final leg - you\'re almost there!'
        }
    ];
    
    tripData.route = routeLegs;
    
    // Split driving time between drivers (simple even split)
    const totalDistance = routeLegs.reduce((sum, leg) => sum + leg.distance, 0);
    const totalTime = routeLegs.reduce((sum, leg) => sum + leg.duration, 0);
    
    tripData.drivers.chance.totalDistance = Math.round(totalDistance / 2);
    tripData.drivers.chance.totalTime = Math.round(totalTime / 2);
    tripData.drivers.london.totalDistance = Math.round(totalDistance / 2);
    tripData.drivers.london.totalTime = Math.round(totalTime / 2);
}

// Initialize Safety Checklist
function initializeSafetyChecklist() {
    tripData.safetyChecklist = [
        { id: 1, text: 'Winter tires installed (mandatory in many provinces)', checked: false },
        { id: 2, text: 'Tire pressure checked and adjusted for cold weather', checked: false },
        { id: 3, text: 'Emergency kit: blankets, flashlight, first aid', checked: false },
        { id: 4, text: 'Snow brush and ice scraper', checked: false },
        { id: 5, text: 'Booster cables', checked: false },
        { id: 6, text: 'Traction aids (sand, salt, or traction mats)', checked: false },
        { id: 7, text: 'Extra windshield washer fluid (winter formula)', checked: false },
        { id: 8, text: 'Full tank of gas before departure', checked: false },
        { id: 9, text: 'Phone charger and power bank', checked: false },
        { id: 10, text: 'Warm clothing, boots, and gloves', checked: false },
        { id: 11, text: 'Non-perishable snacks and water', checked: false },
        { id: 12, text: 'Check weather forecast and road conditions', checked: false },
        { id: 13, text: 'Vehicle maintenance check (oil, antifreeze, battery)', checked: false },
        { id: 14, text: 'Share travel plans with family/friends', checked: false },
        { id: 15, text: 'Download offline maps for areas with poor cell service', checked: false }
    ];
}

// Show Dashboard
function showDashboard() {
    document.getElementById('setupContainer').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('userProfileBar').style.display = 'block';
    
    // Populate dashboard
    updateDashboard();
}

// Update Dashboard
function updateDashboard() {
    // Trip overview
    document.getElementById('tripStart').textContent = tripData.startingPoint;
    document.getElementById('tripDepartureDate').textContent = formatDate(tripData.departureDate);
    
    // Calculate arrival date
    const totalDays = tripData.route.length;
    const arrivalDate = new Date(tripData.departureDate);
    arrivalDate.setDate(arrivalDate.getDate() + totalDays);
    document.getElementById('tripArrivalDate').textContent = formatDate(arrivalDate.toISOString().split('T')[0]);
    
    // Update route timeline
    updateRouteTimeline();
    
    // Update hotels list
    updateHotelsList();
    
    // Update gas stations list
    updateGasStopsList();
    
    // Update notes
    updateNotesList();
    
    // Update safety checklist
    updateSafetyChecklist();
    
    // Update driver profile
    updateDriverProfile();
}

// Update Route Timeline
function updateRouteTimeline() {
    const timeline = document.getElementById('routeTimeline');
    timeline.innerHTML = '';
    
    tripData.route.forEach((leg, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-item';
        
        const date = new Date(tripData.departureDate);
        date.setDate(date.getDate() + index);
        
        dayDiv.innerHTML = `
            <div class="day-header">
                <h3>Day ${leg.day} - ${formatDate(date.toISOString().split('T')[0])}</h3>
                <span class="day-distance">${leg.distance} km | ${formatDuration(leg.duration)}</span>
            </div>
            <div class="day-route">
                <strong>Route:</strong> ${leg.from} → ${leg.to}
            </div>
            <div class="day-notes">
                ${leg.notes}
            </div>
        `;
        
        timeline.appendChild(dayDiv);
    });
}

// Update Hotels List
function updateHotelsList() {
    const list = document.getElementById('hotelsList');
    list.innerHTML = '';
    
    if (tripData.hotels.length === 0) {
        list.innerHTML = '<p style="color: #64748b;">No hotels added yet. Click "+ Add Hotel Booking" to add one.</p>';
        return;
    }
    
    tripData.hotels.forEach((hotel, index) => {
        const hotelDiv = document.createElement('div');
        hotelDiv.className = 'hotel-item';
        hotelDiv.innerHTML = `
            <div class="item-content">
                <h4>${hotel.name}</h4>
                <p>${hotel.city} | Night ${hotel.night} | ${hotel.address || 'Address not specified'}</p>
                ${hotel.confirmationNumber ? `<p><strong>Confirmation:</strong> ${hotel.confirmationNumber}</p>` : ''}
            </div>
            <div class="item-actions">
                <button class="btn-icon" onclick="editHotel(${index})" title="Edit">✏️</button>
                <button class="btn-icon" onclick="deleteHotel(${index})" title="Delete">🗑️</button>
            </div>
        `;
        list.appendChild(hotelDiv);
    });
}

// Update Gas Stops List
function updateGasStopsList() {
    const list = document.getElementById('gasStationsList');
    list.innerHTML = '';
    
    if (tripData.gasStops.length === 0) {
        list.innerHTML = '<p style="color: #64748b;">No gas stops planned yet. Click "+ Add Gas Stop" to add one.</p>';
        return;
    }
    
    tripData.gasStops.forEach((stop, index) => {
        const stopDiv = document.createElement('div');
        stopDiv.className = 'gas-item';
        stopDiv.innerHTML = `
            <div class="item-content">
                <h4>${stop.location}</h4>
                <p>Day ${stop.day} | ${stop.notes || 'No additional notes'}</p>
            </div>
            <div class="item-actions">
                <button class="btn-icon" onclick="deleteGasStop(${index})" title="Delete">🗑️</button>
            </div>
        `;
        list.appendChild(stopDiv);
    });
}

// Update Notes List
function updateNotesList() {
    const list = document.getElementById('tripNotes');
    list.innerHTML = '';
    
    if (tripData.notes.length === 0) {
        list.innerHTML = '<p style="color: #64748b;">No notes yet. Click "+ Add Note" to add one.</p>';
        return;
    }
    
    tripData.notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        noteDiv.innerHTML = `
            <div class="item-content">
                <p>${note.text}</p>
                <p style="font-size: 12px; color: #94a3b8; margin-top: 5px;">${formatDateTime(note.timestamp)}</p>
            </div>
            <div class="item-actions">
                <button class="btn-icon" onclick="deleteNote(${index})" title="Delete">🗑️</button>
            </div>
        `;
        list.appendChild(noteDiv);
    });
}

// Update Safety Checklist
function updateSafetyChecklist() {
    const checklist = document.getElementById('safetyChecklist');
    checklist.innerHTML = '';
    
    tripData.safetyChecklist.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checklist-item' + (item.checked ? ' checked' : '');
        itemDiv.innerHTML = `
            <input type="checkbox" id="safety-${item.id}" ${item.checked ? 'checked' : ''} onchange="toggleSafetyItem(${index})">
            <label for="safety-${item.id}">${item.text}</label>
        `;
        checklist.appendChild(itemDiv);
    });
}

// Toggle Safety Checklist Item
function toggleSafetyItem(index) {
    tripData.safetyChecklist[index].checked = !tripData.safetyChecklist[index].checked;
    saveToLocalStorage();
    updateSafetyChecklist();
}

// Add Hotel
function addHotel() {
    const name = prompt('Hotel Name:');
    if (!name) return;
    
    const city = prompt('City:');
    if (!city) return;
    
    const night = prompt('Which night? (1, 2, 3, etc.)');
    if (!night) return;
    
    const address = prompt('Address (optional):');
    const confirmationNumber = prompt('Confirmation Number (optional):');
    
    tripData.hotels.push({
        name,
        city,
        night: parseInt(night),
        address,
        confirmationNumber
    });
    
    saveToLocalStorage();
    updateHotelsList();
}

// Delete Hotel
function deleteHotel(index) {
    if (confirm('Delete this hotel booking?')) {
        tripData.hotels.splice(index, 1);
        saveToLocalStorage();
        updateHotelsList();
    }
}

// Edit Hotel
function editHotel(index) {
    const hotel = tripData.hotels[index];
    
    const name = prompt('Hotel Name:', hotel.name);
    if (name === null) return;
    
    const city = prompt('City:', hotel.city);
    if (city === null) return;
    
    const night = prompt('Which night?', hotel.night);
    if (night === null) return;
    
    const address = prompt('Address:', hotel.address || '');
    const confirmationNumber = prompt('Confirmation Number:', hotel.confirmationNumber || '');
    
    tripData.hotels[index] = {
        name: name || hotel.name,
        city: city || hotel.city,
        night: parseInt(night) || hotel.night,
        address: address || hotel.address,
        confirmationNumber: confirmationNumber || hotel.confirmationNumber
    };
    
    saveToLocalStorage();
    updateHotelsList();
}

// Add Gas Stop
function addGasStop() {
    const location = prompt('Gas Station Location (e.g., Kenora, ON):');
    if (!location) return;
    
    const day = prompt('Which day? (1, 2, 3, etc.)');
    if (!day) return;
    
    const notes = prompt('Notes (optional):');
    
    tripData.gasStops.push({
        location,
        day: parseInt(day),
        notes
    });
    
    saveToLocalStorage();
    updateGasStopsList();
}

// Delete Gas Stop
function deleteGasStop(index) {
    if (confirm('Delete this gas stop?')) {
        tripData.gasStops.splice(index, 1);
        saveToLocalStorage();
        updateGasStopsList();
    }
}

// Add Note
function addNote() {
    const text = prompt('Add a note:');
    if (!text) return;
    
    tripData.notes.push({
        text,
        timestamp: new Date().toISOString()
    });
    
    saveToLocalStorage();
    updateNotesList();
}

// Delete Note
function deleteNote(index) {
    if (confirm('Delete this note?')) {
        tripData.notes.splice(index, 1);
        saveToLocalStorage();
        updateNotesList();
    }
}

// Driver Profile Functions
function updateDriverProfile() {
    const driver = tripData.drivers[tripData.currentDriver];
    document.getElementById('currentDriverName').textContent = driver.name;
    document.getElementById('driverDistance').textContent = driver.totalDistance + ' km';
    document.getElementById('driverTime').textContent = formatDuration(driver.totalTime);
    
    // Update driver stats in modal
    document.querySelectorAll('.driver-total-km').forEach(el => {
        const driverName = el.getAttribute('data-driver');
        el.textContent = tripData.drivers[driverName].totalDistance;
    });
    
    document.querySelectorAll('.driver-total-time').forEach(el => {
        const driverName = el.getAttribute('data-driver');
        el.textContent = formatDuration(tripData.drivers[driverName].totalTime);
    });
    
    // Update active driver card
    document.querySelectorAll('.driver-card').forEach(card => {
        if (card.getAttribute('data-driver') === tripData.currentDriver) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Open Driver Modal
document.getElementById('profileButton')?.addEventListener('click', function() {
    document.getElementById('driverModal').classList.add('active');
});

// Close Driver Modal
function closeDriverModal() {
    document.getElementById('driverModal').classList.remove('active');
}

// Switch Driver
document.querySelectorAll('.driver-card').forEach(card => {
    card.addEventListener('click', function() {
        const driver = this.getAttribute('data-driver');
        tripData.currentDriver = driver;
        saveToLocalStorage();
        updateDriverProfile();
        closeDriverModal();
    });
});

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('winterTripData', JSON.stringify(tripData));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('winterTripData');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Check if we have a complete trip setup
            if (parsed.startingPoint && parsed.departureDate) {
                tripData = parsed;
                showDashboard();
            }
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Reset App (for development/testing)
function resetApp() {
    if (confirm('This will reset all trip data. Are you sure?')) {
        localStorage.removeItem('winterTripData');
        location.reload();
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('driverModal');
        if (modal.classList.contains('active')) {
            closeDriverModal();
        }
    }
});
