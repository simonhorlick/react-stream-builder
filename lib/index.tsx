import * as React from "react";

import { Subscription, Observable } from "rxjs";
import { ReactNode } from "react";

// ConnectionState is the state of connection to an asynchronous computation.
export enum ConnectionState {
  // Not currently connected to any asynchronous computation.
  none,

  // Connected to an asynchronous computation and awaiting interaction.
  waiting,

  // Connected to an active asynchronous computation.
  //
  // For example, a Observable that has returned at least one value, but is not
  // yet done.
  active,

  // Connected to a terminated asynchronous computation.
  done,
}

// ActiveSnapshot enforces that data is present in this snapshot.
interface ActiveSnapshot<T> {
  state: ConnectionState.active;
  data: T;
}

// NoneSnapshot enforces that data is undefined in this snapshot.
interface NoneSnapshot<T> {
  state: ConnectionState.none;
  data: undefined;
}

// DoneSnapshot enforces that data is undefined in this snapshot.
interface DoneSnapshot<T> {
  state: ConnectionState.done;
  data: undefined;
}

// Snapshot is the state of an observable at a single point in time.
export type Snapshot<T> = ActiveSnapshot<T> | NoneSnapshot<T> | DoneSnapshot<T>;

interface StreamBuilderProps<T> {
  // stream is the observable that is subscribed to for changes.
  stream: Observable<T>;

  // builder is a user-supplied render function that takes a stream snapshot
  // and expects react UI to be returned.
  builder: (snapshot: Snapshot<T>) => ReactNode;
}

interface StreamBuilderState<T> {
  snapshot: Snapshot<T>;
}

// StreamBuilder is a Component that builds itself based on the latest snapshot
// emitted by an Observable. An example of its usage is the following:
//
//   <StreamBuilder
//     stream={this.props.bloc.places.pipe(map(filterByPlace(place)))}
//     builder={snapshot => (
//       <div>{snapshot.data ? snapshot.data.display_name : ""}</div>
//     )}
//   />
//
export class StreamBuilder<T> extends React.Component<
  StreamBuilderProps<T>,
  StreamBuilderState<T>
> {
  private subscription: Subscription;

  constructor(props: StreamBuilderProps<T>) {
    super(props);
    this.state = {
      snapshot: {
        data: undefined,
        state: ConnectionState.none,
      },
    };
    this.subscription = Subscription.EMPTY;
  }

  componentDidMount() {
    this.subscription = this.props.stream.subscribe(
      snapshot =>
        this.setState({
          snapshot: { data: snapshot, state: ConnectionState.active },
        }),
      error => {},
      () =>
        this.setState({
          snapshot: { data: undefined, state: ConnectionState.done },
        })
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    // Dispatch directly to the user-supplied render function.
    return this.props.builder(this.state.snapshot);
  }
}
