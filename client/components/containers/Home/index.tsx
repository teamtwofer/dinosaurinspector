import Grid from 'material-ui/Grid/Grid';
import * as React from 'react';
import { lang } from '../../../../lang';
import { measurements } from '../../../urls';
import { Button } from '../../ui/Button';
import { Heading, HeadingStyle } from '../../ui/Heading';

export class Home extends React.PureComponent<{}, {}> {
  render() {
    return (
      <article>
        <Heading center>{lang.IDEA()}</Heading>
        <Heading center headingStyle={HeadingStyle.Sub}>
          {lang.ENTER_YOUR_MEASUREMENTS()}
        </Heading>
        <Heading center headingStyle={HeadingStyle.Accent}>
          {lang.GET_STARTED_TODAY()}
        </Heading>
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <Button raised to={measurements()}>
              {lang.START()}
            </Button>
          </Grid>
        </Grid>
      </article>
    );
  }
}
