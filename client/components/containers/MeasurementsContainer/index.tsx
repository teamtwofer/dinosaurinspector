import Grid from 'material-ui/Grid/Grid';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Typography from 'material-ui/Typography/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Stores } from '../../../stores/';
import MeasurementsTable from './MeasurementsTable';

@inject(({ measurementsStore }: Stores) => ({ measurementsStore }))
@observer
export class MeasurementsContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.measurementsStore.getMeasurements();
  }

  render() {
    return this.props.measurementsStore.measurements.match({
      success: _ => (
        <MeasurementsTable
          measurements={this.props.measurementsStore.groupedMeasurements}
        />
      ),
      pending: () => (
        <Grid container alignItems="center" direction="column">
          <Grid item>
            <CircularProgress color="accent" />
          </Grid>
        </Grid>
      ),
      failure: e => <Typography>{e.message}</Typography>,
    });
  }
}

export interface Props {
  measurementsStore: Stores['measurementsStore'];
}
