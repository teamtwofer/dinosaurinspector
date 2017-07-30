import * as React from 'react';
import { Link } from 'react-router-dom';
import { lang } from '../../../../lang';
import { Heading, HeadingStyle } from '../../ui/Heading';

export class Home extends React.PureComponent<{}, {}> {
  render() {
    return (
      <article>
        <Heading center>
          {lang.IDEATION()}
        </Heading>
        <Heading center headingStyle={HeadingStyle.Sub}>
          {lang.THANKS_FOR_VISITING()}
        </Heading>
        <Heading center headingStyle={HeadingStyle.Accent}>
          {lang.WHY_NO_CONTENT()}
        </Heading>
        <Link to="/test">test</Link>
      </article>
    );
  }
}
