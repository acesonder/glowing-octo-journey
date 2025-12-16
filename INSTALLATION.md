# Winter Road Trip Planner 🚗❄️

A comprehensive web application for planning safe winter road trips across Canada. This app helps drivers prepare for long-distance winter travel from Ontario to Saskatchewan with real-time weather conditions, route planning, safety checklists, and more.

## 🌟 Features

### Welcome & Onboarding
- **Interactive Carousel** - Beautiful 5-slide onboarding experience
- **Skip Option** - Quick setup for returning users
- **Winter-Themed Design** - Stunning visual presentation

### Trip Planning
- **Smart Route Planning** - Multi-day itinerary with optimized stops
- **GPS Location Detection** - Auto-detect starting point
- **Fixed Destination** - Pre-set to 201 Park Av Melfort, SK S0E 1A0
- **Multi-Day Breakdown** - Suggested 3-4 day journey with daily waypoints

### Driver Management
- **Dual Driver System** - Chance & London profiles
- **Easy Driver Switching** - One-click driver toggle in header
- **KM Tracking** - Individual and total distance tracking per driver
- **Real-Time Updates** - Live display of each driver's kilometers

### Vehicle Information
- **2019 Buick Encore** - Pre-configured vehicle details
- **License Plate Display** - daTy 9990
- **Vehicle Status** - Quick reference panel

### Route Features
- **Day-by-Day Itinerary** - Detailed breakdown of each travel day
- **Overnight Stops** - Thunder Bay, Winnipeg, Saskatoon
- **Gas Stations** - Planned fuel stops along the way
- **Rest Areas** - Coffee and rest stop recommendations
- **Custom Stop Addition** - Add your own waypoints

### Weather & Road Conditions
- **Location-Based Weather** - Weather for key route cities
- **Temperature Display** - Real-time temperature readings
- **Road Status Indicators** - Clear, Snow Covered, Icy, Closed
- **Weather Alerts** - Active storm and hazard warnings
- **Provincial Road Links** - Direct links to official highway reports

### Safety Features
- **Comprehensive Checklist** - 20+ safety items
- **Category Organization** - Vehicle, Supplies, Documents, Clothing
- **Progress Tracking** - Check off items as completed
- **Emergency Contacts** - Quick access to emergency services
- **Provincial Emergency Numbers** - OPP, RCMP, roadside assistance

### Trip Notes
- **Note Taking System** - Add reminders and important info
- **Categories** - General, Reminder, Emergency, Contact, Other
- **Timestamp Tracking** - When notes were created
- **Easy Management** - Add, view, and organize trip notes

### Responsive Design
- **Mobile-First** - Optimized for smartphones and tablets
- **Desktop Compatible** - Works great on all screen sizes
- **Touch-Friendly** - Large buttons and easy navigation
- **Print Support** - Print trip details for offline reference

## 🛠️ Technology Stack

- **Frontend:**
  - HTML5
  - CSS3 (Responsive Design)
  - JavaScript (ES6+)
  - Font Awesome Icons

- **Backend:**
  - PHP 7.4+
  - MySQL 5.7+
  - RESTful API

- **Communication:**
  - AJAX for dynamic updates
  - JSON data format

## 📋 Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache or Nginx web server
- phpMyAdmin (recommended)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/acesonder/glowing-octo-journey.git
cd glowing-octo-journey
```

### 2. Database Setup

#### Using phpMyAdmin:
1. Open phpMyAdmin in your browser
2. Create a new database named `winter_trip_planner`
3. Import the database schema:
   - Click on the `winter_trip_planner` database
   - Go to the "Import" tab
   - Choose file: `database/schema.sql`
   - Click "Go" to execute

#### Using MySQL Command Line:
```bash
mysql -u root -p
CREATE DATABASE winter_trip_planner;
USE winter_trip_planner;
SOURCE database/schema.sql;
exit;
```

### 3. Configure Database Connection

Edit `php/config.php` and update the database credentials if needed:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'winter_trip_planner');
```

### 4. Web Server Setup

#### Using Apache:
1. Copy the project to your web server directory (e.g., `/var/www/html/` or `htdocs/`)
2. Ensure mod_rewrite is enabled
3. Make sure `.htaccess` is allowed (if using)

#### Using PHP Built-in Server (Development):
```bash
cd /path/to/glowing-octo-journey
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### 5. Verify Installation

1. Open the application in your web browser
2. You should see the welcome carousel
3. Complete the onboarding and create a test trip
4. Verify all features are working

## 📱 Usage

### Getting Started

1. **Launch the App** - Open `index.html` in your browser
2. **Welcome Screens** - View the carousel or skip to setup
3. **Enter Trip Details:**
   - Starting location (or use GPS detection)
   - Departure date
   - Review vehicle and driver information
4. **Create Trip** - Click "Create Trip" to begin

### Using the Dashboard

#### Switch Drivers
- Click on driver icons in the header
- See each driver's kilometers in real-time
- Active driver is highlighted

#### Navigate Tabs
- **Overview** - Trip summary and quick actions
- **Route** - Detailed day-by-day itinerary
- **Weather** - Weather and road conditions
- **Safety** - Complete safety checklist
- **Notes** - Add and manage trip notes

#### Add Custom Stops
1. Go to Route tab
2. Scroll to "Add Custom Stop" section
3. Enter location name, type, and day number
4. Click "Add Stop"

#### Complete Safety Checklist
1. Go to Safety tab
2. Check off items as you complete them
3. Progress is saved automatically

#### Add Trip Notes
1. Go to Notes tab
2. Type your note in the text area
3. Select a category
4. Click "Add Note"

## 🗂️ Project Structure

```
glowing-octo-journey/
├── index.html              # Main application file
├── css/
│   └── style.css          # All styling and responsive design
├── js/
│   └── app.js             # Application logic and AJAX calls
├── php/
│   ├── config.php         # Database configuration
│   └── api.php            # RESTful API endpoints
├── database/
│   └── schema.sql         # Database structure and initial data
├── FUTURE_UPGRADES.md     # 500+ future feature ideas
└── README.md              # This file
```

## 🔌 API Endpoints

### GET Requests
- `?action=drivers` - Get all drivers
- `?action=trip&id={id}` - Get trip details
- `?action=trips` - Get all trips
- `?action=trip_stops&trip_id={id}` - Get trip stops
- `?action=weather_alerts&trip_id={id}` - Get weather alerts
- `?action=safety_checklist&trip_id={id}` - Get safety checklist
- `?action=trip_notes&trip_id={id}` - Get trip notes
- `?action=vehicle` - Get vehicle information

### POST Requests
- `?action=create_trip` - Create new trip
- `?action=add_stop` - Add route stop
- `?action=add_note` - Add trip note
- `?action=add_weather_alert` - Add weather alert
- `?action=switch_driver` - Switch active driver
- `?action=update_km` - Update driver kilometers

### PUT Requests
- `?action=update_trip` - Update trip details
- `?action=update_checklist` - Update checklist item
- `?action=update_stop` - Update route stop

### DELETE Requests
- `?action=delete_trip&id={id}` - Delete trip
- `?action=delete_stop&id={id}` - Delete stop
- `?action=delete_note&id={id}` - Delete note

## 🎨 Customization

### Change Colors
Edit `css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #0ea5e9;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Add More Drivers
1. Edit `database/schema.sql`
2. Add INSERT statements for new drivers
3. Re-import the database or run INSERT manually

### Change Fixed Destination
1. Edit `index.html` - Update destination input value
2. Edit `database/schema.sql` - Update default destination in trips table
3. Update any hardcoded references in JavaScript

## 🐛 Troubleshooting

### Database Connection Failed
- Verify MySQL is running
- Check credentials in `php/config.php`
- Ensure database `winter_trip_planner` exists

### AJAX Requests Not Working
- Check browser console for errors
- Verify API URL in `js/app.js`
- Ensure PHP has permissions to execute

### Styles Not Loading
- Check CSS file path in `index.html`
- Clear browser cache
- Verify web server is serving CSS files

### GPS Detection Not Working
- Enable location permissions in browser
- Use HTTPS (required for geolocation)
- Try a different browser if issues persist

## 📈 Future Enhancements

See [FUTURE_UPGRADES.md](FUTURE_UPGRADES.md) for a comprehensive list of 500+ potential features including:

- Real-time GPS navigation
- Live weather radar
- Hotel booking integration
- Gas price comparison
- Community features
- AI-powered route optimization
- And much more!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Ace Sonder** - Initial work - [acesonder](https://github.com/acesonder)

## 🙏 Acknowledgments

- Inspired by the challenges of Canadian winter road trips
- Built for the Ontario to Saskatchewan journey
- Designed with safety as the top priority
- Special thanks to drivers Chance and London

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic trip planning
- ✅ Driver management
- ✅ Safety checklist
- ✅ Route planning
- ✅ Weather display
- ✅ Notes system

### Phase 2 (Next)
- ⏳ Real-time API integrations
- ⏳ Live weather data
- ⏳ Hotel booking
- ⏳ Gas price integration
- ⏳ User authentication
- ⏳ Trip history

### Phase 3 (Future)
- 📋 Mobile apps (iOS/Android)
- 📋 GPS navigation
- 📋 Real-time traffic
- 📋 Community features
- 📋 Advanced analytics
- 📋 AI recommendations

---

**Safe travels! 🚗 Stay warm! ❄️**
