import pink from 'material-ui/colors/pink';
import teal from 'material-ui/colors/teal';
import { createMuiTheme, Theme } from 'material-ui/styles';
import { Service } from 'typedi/decorators/Service';

@Service()
export class ThemeStore {
  theme: Theme;
  constructor() {
    this.theme = createMuiTheme({
      palette: {
        primary: pink,
        secondary: teal,
      },
    });
  }
}
