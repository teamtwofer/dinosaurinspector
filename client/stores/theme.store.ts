import amber from 'material-ui/colors/amber';
import indigo from 'material-ui/colors/indigo';
import { createMuiTheme, Theme } from 'material-ui/styles';
import { Service } from 'typedi/decorators/Service';

@Service()
export class ThemeStore {
  theme: Theme;
  constructor() {
    this.theme = createMuiTheme({
      palette: {
        primary: indigo,
        secondary: amber,
      },
    });
  }
}
