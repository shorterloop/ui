import { AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tour, TourStep } from '../../models/tour.model';
import { ShorterLoopTourService } from '../../services/tour.service';

@Component({
  selector: 'sl-tour-modal',
  templateUrl: './tour-modal.component.html',
  styleUrls: ['./tour-modal.component.scss']
})
export class TourModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() customClass = '';
  @Input() showProgressCounter = true;
  @Input() showProgressDots = true;
  @Input() allowClickOutsideToClose = true;
  @ViewChild('tourModal') modalElement!: ElementRef;
  private styleElement: HTMLStyleElement;

  currentTour: Tour | null = null;
  currentStep = 0;
  currentStepData: TourStep | null = null;
  isActive = false;
  isLastStep = false;
  modalWidth = 360;
  modalTop = 0;
  modalLeft = 0;
  showModal = false;
  modalHeight = 'auto';
  positionRecalculated = false;
  modalArrowDirection = 'arrow-top';
  private subscriptions = new Subscription();

  constructor(
    private tourService: ShorterLoopTourService,
    private renderer: Renderer2
  ) {
    this.styleElement = this.renderer.createElement('style');
    this.styleElement.textContent = `
      .sl-tour-highlight {
        background: #fff;
  position: relative !important; 
  z-index: 10000 !important;
      border: 2px solid #c4501c;
  animation: sl-tour-pulse-white 1.5s infinite !important; /*
      }

@keyframes sl-tour-pulse-white { /* New keyframes for a white pulsing effect */
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); } /* Start with a stronger white glow */
  70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); } /* Expand and fade out */
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); } /* Reset for infinite loop */
}

    `;
    this.renderer.appendChild(document.head, this.styleElement);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.tourService.currentTour$.subscribe(tour => {
        this.currentTour = tour;
        this.isActive = !!tour;
        this.updateCurrentStep();
      })
    );

    this.subscriptions.add(
      this.tourService.currentStep$.subscribe(step => {
        this.currentStep = step;
        this.updateCurrentStep();
        this.highlightTarget();
      })
    );
  }

  ngAfterViewChecked(): void {
    if (this.showModal && !this.positionRecalculated && this.modalElement) {
      this.recalculatePositionWithActualHeight();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.removeHighlights();
    this.renderer.removeChild(document.head, this.styleElement);
  }

  private updateCurrentStep(): void {
    if (this.currentTour && this.currentTour.steps[this.currentStep]) {
      this.currentStepData = this.currentTour.steps[this.currentStep];
      this.isLastStep = this.currentStep === this.currentTour.steps.length - 1;
    }
  }

  private getScrollOffsets(): { scrollX: number; scrollY: number } {
    return {
      scrollX: window.scrollX || document.documentElement.scrollLeft,
      scrollY: window.scrollY || document.documentElement.scrollTop
    };
  }

  private highlightTarget(): void {
    this.removeHighlights();
    this.showModal = false;
    this.positionRecalculated = false;

    if (!this.isActive || !this.currentStepData?.target) return;

    const element = document.querySelector(this.currentStepData.target) as HTMLElement;
    if (!element) return;

    this.renderer.addClass(element, 'sl-tour-highlight');
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

    // Wait for scroll to complete and DOM to update
    this.calculateInitialPosition(element);
  }

  private calculateInitialPosition(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const scroll = this.getScrollOffsets();
    const { modalWidth, gap } = this.calculateModalDimensions();

    this.modalWidth = modalWidth;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Calculate available space
    const space = {
      right: viewport.width - rect.right - gap,
      left: rect.left - gap,
      bottom: viewport.height - rect.bottom - gap,
      top: rect.top - gap
    };
    // Position priority: right → left → bottom → top → center
    if (space.right >= modalWidth) {
      this.positionRight(rect, scroll, gap);
    } else if (space.left >= modalWidth) {
      this.positionLeft(rect, scroll, gap);
    } else if (space.bottom >= 100) { // Minimum space for modal
      this.positionBottom(rect, scroll, gap);
    } else if (space.top >= 100) {
      this.positionTop(rect, scroll, gap);
    } else {
      this.positionCenter(viewport, scroll);
    }

    this.showModal = true;
  }

  private recalculatePositionWithActualHeight(): void {
    if (!this.modalElement) return;

    const modalHeight = this.modalElement.nativeElement.offsetHeight;
    if (modalHeight <= 0) return;

    const element = document.querySelector(this.currentStepData?.target || '');
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const scroll = this.getScrollOffsets();
    const gap = this.calculateModalDimensions().gap;

    // Recalculate with actual height
    if (this.modalLeft > rect.right + gap) {
      // Right position
      this.modalTop = this.clampVertical(rect, scroll.scrollY, modalHeight);
    } else if (this.modalLeft < rect.left - gap) {
      // Left position
      this.modalTop = this.clampVertical(rect, scroll.scrollY, modalHeight);
    } else if (this.modalTop > rect.bottom + gap) {
      // Bottom position
      this.modalTop = rect.bottom + gap + scroll.scrollY;
    } else {
      // Top position
      this.modalTop = rect.top - modalHeight - gap + scroll.scrollY;
    }

    this.modalHeight = modalHeight;
    this.positionRecalculated = true;
  }

  private calculateModalDimensions(): { modalWidth: number; modalHeight: number; gap: number } {
    const screenWidth = window.innerWidth;

    if (screenWidth < 480) {
      return { modalWidth: 280, modalHeight: 240, gap: 10 };
    } else if (screenWidth < 768) {
      return { modalWidth: 320, modalHeight: 260, gap: 15 };
    }
    return { modalWidth: 360, modalHeight: 300, gap: 20 };
  }

  private positionRight(
    rect: DOMRect,
    scroll: { scrollX: number; scrollY: number },
    gap: number
  ): void {
    this.modalLeft = rect.right + gap + scroll.scrollX - rect.width / 2 + 20;
    this.modalArrowDirection = 'arrow-left';
    this.modalTop = rect.top + scroll.scrollY - 20;
  }

  private positionLeft(
    rect: DOMRect,
    scroll: { scrollX: number; scrollY: number },
    gap: number
  ): void {
    this.modalLeft = rect.left - this.modalWidth - gap + scroll.scrollX - rect.width / 2 - 20;
    this.modalArrowDirection = 'arrow-right';
    this.modalTop = rect.top + scroll.scrollY - 20;
  }

  private positionBottom(
    rect: DOMRect,
    scroll: { scrollX: number; scrollY: number },
    gap: number
  ): void {
    this.modalTop = rect.bottom + gap + scroll.scrollY - rect.height / 2 - 20;
    this.modalLeft = this.clampHorizontal(rect, scroll.scrollX);
    this.modalArrowDirection = 'arrow-top';
  }

  private positionTop(
    rect: DOMRect,
    scroll: { scrollX: number; scrollY: number },
    gap: number
  ): void {
    const { modalHeight } = this.calculateModalDimensions();
    this.modalArrowDirection = 'arrow-bottom';
    this.modalTop = rect.top - modalHeight - gap + scroll.scrollY - rect.height / 2 -  20;
    this.modalLeft = this.clampHorizontal(rect, scroll.scrollX);
  }

  private positionCenter(
    viewport: { width: number; height: number },
    scroll: { scrollX: number; scrollY: number }
  ): void {
    this.modalLeft = scroll.scrollX + (viewport.width - this.modalWidth) / 2;
    this.modalTop = scroll.scrollY + 100; // Will be adjusted later
  }

  private clampVertical(
    rect: DOMRect,
    scrollY: number,
    modalHeight: number
  ): number {
    const viewportHeight = window.innerHeight;
    const MIN_GAP = 8;

    return Math.min(
      Math.max(
        rect.top + scrollY,
        scrollY + MIN_GAP
      ),
      scrollY + viewportHeight - modalHeight - MIN_GAP
    );
  }

  private clampHorizontal(
    rect: DOMRect,
    scrollX: number
  ): number {
    const viewportWidth = window.innerWidth;
    const MIN_GAP = 8;
    return Math.min(
      Math.max(
        rect.left + scrollX,
        scrollX + MIN_GAP
      ),
      scrollX + viewportWidth - this.modalWidth - MIN_GAP
    );
  }

  private removeHighlights(): void {
    const highlightedElements = document.querySelectorAll('.sl-tour-highlight');
    highlightedElements.forEach(el => {
      this.renderer.removeClass(el, 'sl-tour-highlight');
    });
  }

  onClose(): void {
    this.tourService.stopTour();
  }

  onNext(): void {
    this.tourService.nextStep();
  }

  onPrevious(): void {
    this.tourService.prevStep();
  }

  onOverlayClick(): void {
    if (this.allowClickOutsideToClose) {
      this.onClose();
    }
  }

  getProgressDots(): number[] {
    return this.currentTour ? Array(this.currentTour.steps.length).fill(0).map((_, i) => i) : [];
  }
}
