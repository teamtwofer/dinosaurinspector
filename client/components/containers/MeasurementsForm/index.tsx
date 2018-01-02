import Grid from 'material-ui/Grid/Grid';
import Paper from 'material-ui/Paper/Paper';
import { inject } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { lang } from '../../../../lang';
import { Stores } from '../../../stores';
import { MeasurementsFormStore } from '../../../stores/measurements-form.store';
import { Button } from '../../ui/Button';
import { Heading, HeadingStyle } from '../../ui/Heading/index';
import { Input } from '../../ui/Input';

@inject(({ measurementsFormStore }: Stores) => ({ measurementsFormStore }))
export class MeasurementsForm extends React.PureComponent<Props, any> {
  render() {
    const { measurementsFormStore: { form, isLoading } } = this.props;
    return (
      <Paper className="padding-medium">
        <form>
          <Grid direction="column" container>
            <Grid direction="row" wrap="wrap" item justify="space-between">
              <Heading headingStyle={HeadingStyle.Sub}>
                Enter your measurements
              </Heading>
            </Grid>
            <Grid
              direction="row"
              wrap="wrap"
              container
              item
              justify="space-between"
            >
              {form.$.map((field, i) => (
                <Grid
                  direction="column"
                  wrap="wrap"
                  item
                  lg={1}
                  md={2}
                  sm={3}
                  xs={12}
                >
                  <Input
                    field={field}
                    name={lang.MEASUREMENT_NAME(i)}
                    type="number"
                  />
                </Grid>
              ))}
            </Grid>
            <Button
              center
              isLoading={isLoading}
              type="submit"
              disabled={isLoading}
            >
              {lang.SUBMIT_MEASUREMENTS()}
            </Button>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export interface Props extends RouteComponentProps<void> {
  measurementsFormStore: MeasurementsFormStore;
}
