import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal({
    selected: {
      '--background-color': '#1e1e1e',
      '--background-footer-color': '#1a2325',
      '--base-color': 'white',
    },
    notSelected: {
      '--background-color': '#89aaaf',
      '--background-footer-color': '#4f6b71',
      '--base-color': 'black',
    },
  });

  changeBackgroundColor(state: 'selected' | 'notSelected') {
    const themeVariables: Record<
      '--background-color' | '--background-footer-color' | '--base-color',
      string
    > = this.theme()[state];

    Object.keys(themeVariables).forEach((variable) => {
      document.documentElement.style.setProperty(
        variable,
        themeVariables[
          variable as
            | '--background-color'
            | '--background-footer-color'
            | '--base-color'
        ]
      );
    });
  }

  setTheme() {
    this.theme.set({
      selected: this.theme().notSelected,
      notSelected: this.theme().selected,
    });
  }
}
