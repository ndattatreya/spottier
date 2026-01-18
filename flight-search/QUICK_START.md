# 🚀 Quick Start Guide - Premium Flight Search UI

## Installation & Setup

### 1. Install Dependencies
```bash
cd flight-search
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

---

## Project Structure

```
flight-search/
├── src/
│   ├── components/
│   │   ├── Filters.jsx           (Advanced filter panel)
│   │   ├── FlightCard.jsx        (Premium flight card)
│   │   ├── MobileFilters.jsx     (Mobile filter drawer)
│   │   ├── PriceChart.jsx        (Interactive price chart)
│   │   └── SearchForm.jsx        (Hero search form)
│   ├── pages/
│   │   └── Home.jsx              (Main page layout)
│   ├── services/
│   │   └── amadeus.js            (Flight API service)
│   ├── store/
│   │   └── flightStore.js        (Zustand state management)
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
├── tailwind.config.js            (Extended with premium styles)
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## Key Features

### 🔍 Search Form
- Modern hero section with gradient background
- IATA code input with helper text
- Date picker for departure date
- Loading state with spinner
- Responsive layout (1 column on mobile, 5 columns on desktop)

### ✈️ Flight Cards
- Airline avatar with gradient colors
- Flight duration and stops information
- Price display in Indian currency format
- Selection state with visual feedback
- Star rating display
- Expandable details on mobile
- Smooth hover and active animations

### 🎚️ Advanced Filters
- **Price Range**: Interactive slider with gradient
- **Stops**: Color-coded options (Fast/Good/Budget)
- **Airlines**: With airline code avatars
- **Collapsible Sections**: Smooth expand/collapse animations
- **Reset Button**: Restore all filters to defaults

### 📊 Price Chart
- Interactive line chart showing price trends
- Statistics cards (Min, Average, Max)
- Responsive container
- Animated line with interactive dots
- Professional grid and labels

### 📱 Responsive Design
- Mobile-first approach
- Beautiful bottom drawer for filters
- Touch-friendly button sizes
- Optimized layouts for all screen sizes

---

## Component Usage

### SearchForm
```jsx
import SearchForm from "./components/SearchForm";

export default function App() {
  return <SearchForm />;
}
```

### FlightCard
```jsx
import FlightCard from "./components/FlightCard";

const flight = {
  id: "1",
  airline: "AI",
  price: 5500,
  stops: 0,
  duration: "PT2H30M"
};

export default function App() {
  return <FlightCard flight={flight} />;
}
```

### Filters
```jsx
import Filters from "./components/Filters";

export default function App() {
  return <Filters />;
}
```

### PriceChart
```jsx
import PriceChart from "./components/PriceChart";

export default function App() {
  return <PriceChart />;
}
```

---

## Styling Guidelines

### Tailwind Classes
All components use Tailwind CSS utility classes with these conventions:

```jsx
// Buttons
className="btn btn-primary"      // Primary action button
className="btn btn-secondary"    // Secondary button

// Cards
className="card"                 // Styled card container

// Badges
className="badge badge-primary"  // Primary badge
className="badge badge-success"  // Success badge
className="badge badge-warning"  // Warning badge

// Inputs
className="input"                // Styled input field
```

### Custom CSS Classes
Located in `src/index.css`:

```css
.btn              /* Base button styles */
.btn-primary      /* Primary button */
.btn-secondary    /* Secondary button */
.card             /* Card component */
.badge            /* Badge component */
.input            /* Input field */
.drawer           /* Drawer animation */
```

### Color Usage
```jsx
// Primary gradient
className="bg-gradient-to-r from-primary-600 to-primary-700"

// Secondary accent
className="bg-secondary-600"

// Status colors
className="bg-green-100 text-green-800"    // Success
className="bg-orange-100 text-orange-800"  // Warning
className="bg-blue-100 text-blue-800"      // Info
className="bg-red-100 text-red-800"        // Error
```

---

## State Management

### Zustand Store
Located in `src/store/flightStore.js`:

```javascript
// Get flights
const flights = useFlightStore((s) => s.flights);

// Get filtered flights
const filteredFlights = useFlightStore((s) => s.filteredFlights);

// Set flights
const setFlights = useFlightStore((s) => s.setFlights);

// Update filters
const updateFilters = useFlightStore((s) => s.updateFilters);

// Get current filters
const filters = useFlightStore((s) => s.filters);
```

---

## Customization

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: "#your-50",
    100: "#your-100",
    // ... etc
    600: "#your-primary-color",
  }
}
```

### Change Typography
Edit `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ["Your Font", "system-ui", "sans-serif"],
}
```

### Modify Animations
Edit `tailwind.config.js`:
```javascript
animation: {
  "fade-in": "fadeIn 0.5s ease-in", // Change duration
  "slide-up": "slideUp 0.5s ease-out",
}
```

---

## Performance Tips

1. **Images**: Use WebP format with fallbacks
2. **Lazy Loading**: Implement for price chart on mobile
3. **Code Splitting**: React lazy loading for routes
4. **Bundle Size**: Monitor with `npm run build` analysis
5. **Caching**: Browser cache headers for static assets

---

## Browser Support

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Troubleshooting

### Styles Not Applying
```bash
# Rebuild Tailwind CSS
npm run dev
# Or clear cache
rm -rf node_modules/.cache
```

### Build Issues
```bash
# Clear npm cache
npm cache clean --force
npm install
npm run build
```

### Mobile Not Responsive
- Check browser DevTools (F12)
- Verify viewport meta tag in `index.html`
- Test with `npm run preview` for production build

---

## API Integration

### Amadeus API Setup
Edit `src/services/amadeus.js`:

```javascript
const AMADEUS_CLIENT_ID = "your-api-key";
const AMADEUS_CLIENT_SECRET = "your-api-secret";
```

[Get API Key](https://developers.amadeus.com)

---

## Advanced Features

### Add Dark Mode
1. Install: `npm install next-themes`
2. Wrap app with theme provider
3. Add dark: prefixes to Tailwind classes

### Add Analytics
1. Install: `npm install react-ga4`
2. Initialize in App.jsx
3. Track key events

### Add Error Boundary
1. Create ErrorBoundary.jsx
2. Wrap Home component
3. Show error UI

### Add Loading Skeleton
1. Use @react-loading-skeleton
2. Show during fetch
3. Fade to real content

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

---

## Support & Documentation

- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev
- **Zustand**: https://github.com/pmndrs/zustand
- **Recharts**: https://recharts.org
- **Vite**: https://vitejs.dev

---

## License

MIT - Feel free to use this project for personal and commercial purposes.

---

## Next Steps

1. ✅ Customize colors and branding
2. ✅ Integrate with your API
3. ✅ Add user authentication
4. ✅ Implement booking flow
5. ✅ Deploy to production
6. ✅ Monitor analytics
7. ✅ Gather user feedback
8. ✅ Iterate and improve

---

**Happy Coding! 🎉**

Created: January 2026
