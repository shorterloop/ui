## observeApiStatus - RxJS Operator for Button State Management

This README.md file describes the observeApiStatus operator, a utility function for RxJS that manages the state of a button element (or potentially other DOM elements) during asynchronous API calls.

### Installation

Assuming you're using a package manager:

```sh
npm install shorterloop
```
### Usage

```sh
import { ObserveApiStatus } from 'shorterloop';

this.apiService.post('/auth/register', payload)
  .pipe(
    ObserveApiStatus(target, {
      inProgress: 'Saving...'
    })
  )
  .subscribe((result: any) => {})
```

### APIs

| API | Default | Purpose |
| ------ | ------ | ------ |
| inProgress | Current text | Sets the text of buttons. If ' ' then makes empty
| hideLoader | false | Show circular loader in the button prefix |


### Behavior

- When the subscription starts:
  - The button text is changed to the inProgress value (if provided), or disabled visually.
  - The button is disabled to prevent further interactions.
- On successful API completion:
  - The button's text is reset to its original state.
  - The button is re-enabled.
- On API error:
  - The button's text is reset to its original state.
  - The button is re-enabled.

### Key Points

- `observeApiStatus` simplifies managing button state during asynchronous operations.
- It provides visual feedback and prevents user interaction while waiting.
- Customize the inProgress message to suit your needs.