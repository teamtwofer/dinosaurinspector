import * as React from 'react';
import { Route, Switch } from 'react-router';
import { editMeasurements } from '../../../urls';
import { MeasurementsContainer } from '../MeasurementsContainer/index';
import { MeasurementsForm } from '../MeasurementsForm/index';

export class MeasurementPageContainer extends React.Component {
  render() {
    return (
      <>
        <Switch>
          <Route path={editMeasurements()} component={MeasurementsForm} />
          <Route component={MeasurementsContainer} />
        </Switch>
      </>
    );
  }
}
