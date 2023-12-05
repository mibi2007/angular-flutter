// Angular Component: HomeComponent
// Path: angular/src/app/components/home.component.ts
// Compare this snippet from angular/src/app/components/home.component.ts:
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFlutterComponent } from '../ng-flutter/ng-flutter.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'counter.component.html',
  styleUrl: 'counter.component.scss',
  imports: [
    NgFlutterComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class CounterComponent implements OnInit {
  ngOnInit(): void {}
  title = 'ng-flutter';
  flutterState?: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  onFlutterAppLoaded(state: any) {
    this.flutterState = state;
    this.flutterState.onClicksChanged(() => {
      this.onCounterChanged();
    });
    this.flutterState.onTextChanged(() => {
      this.onTextChanged();
    });

    // Set the initial values of the Flutter app from enum DemoScreen in dart file
    this.flutterState.setScreen('counter');
  }

  onCounterSet(event: Event) {
    let clicks = parseInt((event.target as HTMLInputElement).value, 10) || 0;

    this.flutterState.setClicks(clicks);
  }

  onTextSet(event: Event) {
    this.flutterState.setText((event.target as HTMLInputElement).value || '');
  }

  // I need to force a change detection here. When clicking on the "Decrement"
  // button, everything works fine, but clicking on Flutter doesn't trigger a
  // repaint (even though this method is called)
  onCounterChanged() {
    this.changeDetectorRef.detectChanges();
  }

  onTextChanged() {
    this.changeDetectorRef.detectChanges();
  }
}
