import { Grouping } from 'bucketing';
import { StyledComponentProps } from 'material-ui';
import Paper from 'material-ui/Paper';
import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import { lang } from '../../../../lang/index';
import { Measurement } from '../../../stores/measurements.store';
import { editMeasurements } from '../../../urls';
import { Button } from '../../ui/Button';

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  flex: {
    flex: 1,
  },
});

export function MeasurementsTable({ classes, measurements }: Props) {
  return (
    <>
      {measurements.labels.map(label => (
        <Paper key={label.toLocaleDateString()} className={classes!.root}>
          <Toolbar>
            <Typography className={classes!.flex} type="title">
              {label.toLocaleDateString()}
            </Typography>
            <Button color="accent" raised={true} to={editMeasurements(label)}>
              EDIT
            </Button>
          </Toolbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Measurement Type</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {measurements.keyToItems[label.toLocaleDateString()].map(m => {
                return (
                  <TableRow key={m.id}>
                    <TableCell>{lang.MEASUREMENT_NAME(m.type)}</TableCell>
                    <TableCell>
                      {m.value}
                      {lang.MEASUREMENT_UNIT(m.type)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </>
  );
}

interface Props {
  classes?: StyledComponentProps['classes'];
  measurements: Grouping<Measurement, Date>;
}

export default withStyles(styles)(MeasurementsTable);
