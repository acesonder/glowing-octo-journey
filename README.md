# Winter Road Trip Planner 🚗❄️

A responsive web application for planning safe winter road trips across Canada, with a focus on Ontario to Saskatchewan routes during winter months.

## 🌟 Live Demo

Visit the app: [https://acesonder.github.io/glowing-octo-journey/](https://acesonder.github.io/glowing-octo-journey/)

## 📋 Features

### Welcome Experience
- Interactive onboarding carousel introducing key features
- Beautiful winter-themed design
- Skippable intro for returning users

### Trip Planning
- **Quick Setup** - Enter starting point (with GPS auto-detection option)
- **Fixed Destination** - 201 Park Ave, Melfort, SK S0E 1A0
- **Multi-Day Route Planning** - Automatically generates optimized 3-4 day itinerary
- **Weather & Road Conditions** - Winter travel advisories and condition checking
- **Hotel & Accommodation Planning** - Add and manage overnight stops
- **Gas Station Planning** - Plan fuel stops along the route
- **Trip Notes** - Collaborative note-taking for important reminders

### Driver Management
- **Two Drivers** - Chance and London (no authentication required)
- **Easy Driver Switching** - Click profile icon to switch drivers
- **Driver Statistics** - Track distance and time driven per person
- **Real-time Stats** - View km driven and time spent by each driver

### Vehicle Information
- **Pre-configured Vehicle** - 2019 Buick Encore
- **License Plate** - DATY 9990
- Vehicle details displayed throughout trip planning

### Safety Features
- **Winter Safety Checklist** - 15-point comprehensive checklist
  - Winter tires verification
  - Emergency kit preparation
  - Vehicle maintenance checks
  - Weather condition monitoring
- **Emergency Contacts** - Quick access to:
  - Emergency services (911)
  - Ontario road conditions (511)
  - Saskatchewan Highway Hotline
  - CAA Emergency Road Service

### Data Persistence
- **Local Storage** - All trip data saved automatically
- **Multi-Session Support** - Return to your trip anytime
- **No Account Required** - Get started immediately

## 🎨 Design Features

- **Fully Responsive** - Works on desktop, tablet, and mobile devices
- **Winter Theme** - Beautiful gradients and winter-inspired colors
- **Intuitive Interface** - Clean, modern UI with easy navigation
- **Accessibility** - Keyboard shortcuts, proper contrast, and semantic HTML

## 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. Complete the onboarding carousel (or skip)
3. Enter your starting location
4. Choose primary driver (Chance or London)
5. Set departure date
6. Click "Create My Trip Plan"

## 📱 How to Use

### Planning Your Trip
1. **Initial Setup** - Provide starting point and departure date
2. **Review Route** - Check the auto-generated 4-day itinerary
3. **Add Details** - Book hotels, plan gas stops, add notes
4. **Check Safety** - Complete the winter safety checklist
5. **Switch Drivers** - Click profile icon to alternate drivers and track stats

### Driver Switching
- Click the profile button in the top-left corner
- View statistics for both drivers
- Click on any driver card to switch
- Driver stats update automatically

### Managing Trip Elements
- **Hotels**: Add booking confirmations, addresses, and night numbers
- **Gas Stops**: Plan refueling points for each day
- **Notes**: Add reminders like "Call Mom with ETA"
- **Safety Items**: Check off completed preparation tasks

## 📊 Sample Route

The app generates a typical winter route:
- **Day 1**: Starting Point → Thunder Bay, ON (~650 km, 8 hours)
- **Day 2**: Thunder Bay → Winnipeg, MB (~700 km, 7 hours)
- **Day 3**: Winnipeg → Yorkton, SK (~450 km, 6 hours)
- **Day 4**: Yorkton → Melfort, SK (~200 km, 2.5 hours)

**Total Distance**: ~2,000 km
**Total Driving Time**: 23.5 hours (spread over 4 days)

## 🔮 Future Enhancements

See [FUTURE_UPGRADES.md](FUTURE_UPGRADES.md) for a comprehensive list of 325+ potential features including:
- Real-time GPS navigation
- Live weather radar integration
- Advanced route optimization
- Hotel booking integration
- Fuel price comparison
- And much more...

## 💻 Technical Details

- **Pure Vanilla JavaScript** - No frameworks required
- **HTML5 & CSS3** - Modern web standards
- **Local Storage API** - Client-side data persistence
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Works without JavaScript (basic functionality)

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 Files

- `index.html` - Main application structure
- `styles.css` - Responsive styling and winter theme
- `app.js` - Application logic and data management
- `FUTURE_UPGRADES.md` - Roadmap with 325+ feature ideas

## 🛠️ Development

No build process required! Simply edit the files and refresh your browser.

### Local Development
```bash
# Clone the repository
git clone https://github.com/acesonder/glowing-octo-journey.git

# Open in browser
open index.html
# or
python -m http.server 8000  # Then visit http://localhost:8000
```

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your own winter road trip planning needs!

## 📝 License

Open source - feel free to use and modify as needed.

## ⚠️ Safety Note

This app is for planning purposes. Always:
- Check real-time road conditions before and during travel
- Monitor weather forecasts closely
- Have emergency supplies in your vehicle
- Never drive in dangerous conditions
- Follow provincial travel advisories
- Ensure your vehicle is winter-ready

**Important Resources:**
- Ontario 511: 1-800-268-4686
- Saskatchewan Highway Hotline: 1-888-335-7623
- Emergency Services: 911

---

**Stay safe and happy travels! ❄️🚗**
