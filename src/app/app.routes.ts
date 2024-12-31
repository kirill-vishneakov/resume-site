import { Routes } from '@angular/router';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { DesktopComponent } from './components/desktop/desktop.component';

export const routes: Routes = [
  { path: '', component: LoadingScreenComponent },
  { path: 'desktop', component: DesktopComponent },
];
