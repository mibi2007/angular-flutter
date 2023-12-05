// Angular Component: HomeComponent
// Path: angular/src/app/components/home.component.ts
// Compare this snippet from angular/src/app/components/home.component.ts:
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.component.html',
  imports: [RouterModule],
})
export class HomeComponent implements OnInit {
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
