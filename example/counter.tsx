import * as React from "react";
import * as ReactDOM from "react-dom";

import { Observable, timer } from "rxjs";
import { StreamBuilder, Snapshot, ConnectionState } from "react-stream-builder";

export interface CounterProps {
  count: Observable<number>;
}

// Counter is a react component that draws the current value of a counter
// passed in as an observable.
export class Counter extends React.Component<CounterProps, {}> {
  render() {
    return (
      <div>
        <h1>Example</h1>
        <StreamBuilder
          stream={this.props.count}
          builder={(snapshot: Snapshot<number>) => {
            // If the observable has not yet emitted any values print a message
            // indicating that we're still waiting.
            if (snapshot.state !== ConnectionState.active) {
              return "Loading...";
            }

            return `Count is now ${snapshot.data}`;
          }}
        />
      </div>
    );
  }
}

// count emits incrementing numbers every second, starting at zero.
let count = timer(1000, 1000);

ReactDOM.render(<Counter count={count} />, document.getElementById("app"));
