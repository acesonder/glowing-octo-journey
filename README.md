# Winter Road Trip Planner ❄️🚗

A comprehensive mobile-responsive web application designed for planning safe winter road trips across Canada, specifically optimized for the Ontario to Saskatchewan journey.

## 🎯 Overview

This application helps drivers prepare for long-distance winter travel with features focused on **pre-trip planning**, including route optimization, weather monitoring, safety checklists, and driver management.

**Fixed Destination:** 201 Park Av Melfort, SK S0E 1A0  
**Drivers:** Chance & London (switchable profiles with KM tracking)  
**Vehicle:** 2019 Buick Encore (License: daTy 9990)

## ✨ Key Features

- **Interactive Onboarding Carousel** - Beautiful 5-slide welcome experience
- **Smart Route Planning** - Multi-day itinerary with optimized stops (Thunder Bay, Winnipeg, Saskatoon)
- **Driver Management** - Easy switching between Chance & London with individual KM tracking
- **Weather & Road Conditions** - Monitor conditions along your entire route
- **Safety Checklist** - Comprehensive 20+ item winter safety verification
- **Trip Notes System** - Add reminders, contacts, and important information
- **GPS Location Detection** - Auto-detect starting point
- **Fully Responsive** - Mobile-first design that works on all devices

## 🚀 Quick Start

### Prerequisites
- PHP 7.4+
- MySQL 5.7+
- Web server (Apache/Nginx) or PHP built-in server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/acesonder/glowing-octo-journey.git
   cd glowing-octo-journey
   ```

2. **Set up the database**
   ```bash
   mysql -u root -p
   CREATE DATABASE winter_trip_planner;
   USE winter_trip_planner;
   SOURCE database/schema.sql;
   ```

3. **Configure database connection** (edit `php/config.php` if needed)

4. **Start the server**
   ```bash
   php -S localhost:8000
   ```

5. **Open in browser:** `http://localhost:8000`

For detailed installation instructions, see [INSTALLATION.md](INSTALLATION.md)

## 📁 Project Structure

```
├── index.html              # Main application
├── css/style.css          # Responsive styling
├── js/app.js              # Application logic & AJAX
├── php/
│   ├── config.php         # Database configuration
│   └── api.php            # RESTful API
├── database/schema.sql    # Database structure
├── FUTURE_UPGRADES.md     # 500+ feature ideas
└── INSTALLATION.md        # Detailed setup guide
```

## 🎨 Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), AJAX
- **Backend:** PHP, MySQL
- **Design:** Mobile-first responsive design, Font Awesome icons
- **API:** RESTful JSON API

## 🌟 Main Features Breakdown

### 1. Welcome Experience
- 5-slide carousel with winter theme
- Skip option for quick access
- Feature highlights and benefits

### 2. Trip Dashboard
- Overview with trip summary
- Quick action buttons
- Real-time driver information
- Vehicle status display

### 3. Route Planning
- Day-by-day itinerary (4 days)
- Suggested overnight stops
- Gas stations and rest areas
- Custom stop addition

### 4. Weather Monitoring
- Key location forecasts
- Road condition status
- Active weather alerts
- Provincial road report links

### 5. Safety Management
- Vehicle checks
- Emergency supplies
- Important documents
- Winter clothing
- Emergency contacts

### 6. Notes & Reminders
- Categorized notes
- Timestamp tracking
- Quick note creation
- Easy management

## 📱 Mobile Responsive

Fully optimized for:
- ✅ Smartphones (iOS & Android)
- ✅ Tablets
- ✅ Laptops
- ✅ Desktops

## 🔮 Future Vision

See [FUTURE_UPGRADES.md](FUTURE_UPGRADES.md) for 500+ potential features including:
- Real-time GPS navigation
- Live weather APIs
- Hotel/restaurant booking
- Community features
- AI route optimization
- And much more!

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Safe travels across Canada! 🍁 Stay warm this winter! ❄️**
