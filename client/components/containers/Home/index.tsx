import * as React from 'react';
import { Heading, HeadingStyle } from '../../ui/Heading';

export class Home extends React.PureComponent<{}, {}> {
  render() {
    return (
      <article>
        <Heading center>Twofer is still under ideation.</Heading>
        <Heading center headingStyle={HeadingStyle.Sub}>
          Thank you for checking out our site!
        </Heading>
        <Heading center headingStyle={HeadingStyle.Accent}>
          We are currently in the process of ethnography to determine what we
          are going to build. We should have some updates soon.
        </Heading>
      </article>
    );
  }
}
