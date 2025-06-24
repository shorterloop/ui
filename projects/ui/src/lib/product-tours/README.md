# ShorterLoop Product Tour

A powerful, customizable Angular product tour library with auto-triggering capabilities and localStorage persistence. Perfect for onboarding users and showcasing product features.

## Features

✅ **Auto-triggering tours** - Tours start automatically when components load

✅ **Permanent tracking** - Uses localStorage to ensure tours only auto-trigger once

✅ **Manual triggers** - Flexible manual tour controls

✅ **Customizable styling** - Easy to theme and customize

✅ **TypeScript support** - Full type safety

✅ **Responsive design** - Works on all devices

✅ **Accessibility friendly** - ARIA labels and keyboard navigation

✅ **Zero dependencies** - Only requires Angular

## Installation

```bash
npm install shorterloop
```

## Quick Start

### 1. Import the module

```typescript
import { ShorterLoopProductTourModule } from 'shorterloop';

@NgModule({
  imports: [
    ShorterLoopProductTourModule
  ]
})
export class AppModule { }
```

### 2. Add tour configuration

```typescript
import { ShorterLoopTourService } from 'shorterloop';

export class AppComponent implements OnInit {
  constructor(private tourService: ShorterLoopTourService) {}

  ngOnInit() {
    // Load tours from configuration
    this.tourService.loadToursFromConfig({
      'welcome-tour': {
        tourId: 'welcome-tour',
        title: 'Welcome Tour',
        description: 'Get started with our app',
        steps: [
          {
            title: 'Welcome!',
            text: 'Let\'s take a quick tour of the app.',
            target: '#welcome-section'
          },
          {
            title: 'Dashboard',
            text: 'This is your main dashboard.',
            target: '#dashboard'
          }
        ]
      }
    });
  }
}
```

### 3. Add components to your template

```html
<!-- Tour Modal (add once in your app) -->
<sl-tour-modal></sl-tour-modal>

<!-- Auto-trigger tour when component loads -->
<div id="welcome-section">
  <sl-auto-tour-trigger tourId="welcome-tour" [delay]="1500"></sl-auto-tour-trigger>
  <h1>Welcome to our app!</h1>
</div>

<!-- Manual trigger button -->
<sl-tour-trigger tourId="welcome-tour">
  Start Tour
</sl-tour-trigger>
```

## API Reference

### ShorterLoopTourService

#### Methods

- `loadToursFromConfig(config: ToursConfig)` - Load tours from configuration object
- `loadToursFromUrl(url: string)` - Load tours from external JSON file
- `startTour(tourId: string)` - Manually start a tour
- `stopTour()` - Stop current tour
- `autoTriggerTour(tourId: string)` - Auto-trigger tour (checks localStorage)
- `resetAutoTriggeredTours()` - Reset localStorage (for testing)
- `wasAutoTriggered(tourId: string)` - Check if tour was auto-triggered before

#### Observables

- `currentTour$` - Current active tour
- `currentStep$` - Current step number

### Components

#### sl-tour-modal

The main tour modal component.

**Inputs:**
- `customClass: string` - Additional CSS classes
- `showProgressCounter: boolean` - Show step counter (default: true)
- `showProgressDots: boolean` - Show progress dots (default: true)
- `allowClickOutsideToClose: boolean` - Allow closing by clicking overlay (default: true)

#### sl-auto-tour-trigger

Auto-triggers a tour when the component is loaded.

**Inputs:**
- `tourId: string` - ID of the tour to trigger
- `delay: number` - Delay before triggering (default: 1500ms)

#### sl-tour-trigger

Manual tour trigger button.

**Inputs:**
- `tourId: string` - ID of the tour to start
- `variant: 'primary' | 'outline' | 'ghost'` - Button style (default: 'outline')
- `customClass: string` - Additional CSS classes
- `disabled: boolean` - Disable the button

## Tour Configuration

```typescript
interface Tour {
  tourId: string;
  title: string;
  description: string;
  steps: TourStep[];
}

interface TourStep {
  title: string;
  text: string;
  target: string | null; // CSS selector for element to highlight
  image?: string;        // Optional image URL
}
```

## Styling

The library uses CSS custom properties for easy theming:

```css
:root {
  --sl-purple-primary: #7c3aed;
  --sl-purple-dark: #6d28d9;
  --sl-gray-600: #4b5563;
  /* ... other variables */
}
```

## Examples

### Loading tours from JSON file

```typescript
// Load from external JSON file
await this.tourService.loadToursFromUrl('/assets/tours.json');
```

### Custom styling

```html
<sl-tour-modal customClass="my-custom-tour"></sl-tour-modal>
```

```css
.my-custom-tour .sl-tour-modal {
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(0,0,0,0.3);
}
```

### Conditional auto-triggering

```typescript
// Only auto-trigger for new users
if (this.userService.isNewUser()) {
  // Tour will auto-trigger
} else {
  // Mark as already triggered to prevent auto-trigger
  this.tourService.setTourAsAutoTriggered('welcome-tour');
}
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

- 📧 Email: support@shorterloop.com
- 🐛 Issues: [GitHub Issues](https://github.com/shorterloop/shorterloop-product-tour/issues)
- 📖 Docs: [Documentation](https://shorterloop.com/docs/product-tour)
```
