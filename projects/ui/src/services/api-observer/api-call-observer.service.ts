
// import { ObserveApiStatus } from 'shorterloop';
import { Observable } from 'rxjs';

/**
 * Interface defining options for customizing button behavior during API calls.
 */
interface ObserveApiOptions {
  /**
   * Optional text to display on the button while the API call is in progress.
   * Defaults to disabling the button visually if not provided.
   */
  inProgress?: string;
  hideLoader?: boolean
}

/**
 * RxJS operator that manages the state of a button element during asynchronous operations.
 *
 * @param target The DOM element (typically a button) to manage state for.
 * @param options Configuration options for button behavior.
 * @returns An operator function that can be piped into an Observable.
 */
export function ObserveApiStatus(target: any, options?: ObserveApiOptions) {
  // Preserve the original button text for resetting later
  const originalValue = target.textContent;
  return <T>(source: Observable<T>): Observable<T> =>
    new Observable<T>((observer) => {
      // Handle inProgress behavior:
      if (options && options.inProgress) {
        target.textContent = options.inProgress;
      }
      // Disable the button when clicked
      target.disabled = true;

      let loadingSpan: any = document.createElement('span');

      if (!options || (options && !options.hideLoader)) {
        loadingSpan.className = 'buttonProgressLoadingState';
        loadingSpan.textContent = ' ';
        target.insertBefore(loadingSpan, target.firstChild);
      }

      const subscription = source.subscribe({
        next: (value) => observer.next(value),
        error: (error) => {
          observer.error(error);
          cleanup();
        },
        complete: () => {
          observer.complete();
          cleanup();
        },
      });

      const cleanup = () => {
        if (loadingSpan) {
          loadingSpan.remove();
          loadingSpan = null;
        }
        target.textContent = originalValue;
        target.disabled = false;
      };

      // Disable the button when clicked
      return () => {
        subscription.unsubscribe();
        cleanup();
      };
    });
}