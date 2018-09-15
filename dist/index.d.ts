import * as React from "react";
import { Observable } from "rxjs";
import { ReactNode } from "react";
export declare enum ConnectionState {
    none = 0,
    waiting = 1,
    active = 2,
    done = 3
}
interface ActiveSnapshot<T> {
    state: ConnectionState.active;
    data: T;
}
interface NoneSnapshot<T> {
    state: ConnectionState.none;
    data: undefined;
}
interface DoneSnapshot<T> {
    state: ConnectionState.done;
    data: undefined;
}
export declare type Snapshot<T> = ActiveSnapshot<T> | NoneSnapshot<T> | DoneSnapshot<T>;
interface StreamBuilderProps<T> {
    stream: Observable<T>;
    builder: (snapshot: Snapshot<T>) => ReactNode;
}
interface StreamBuilderState<T> {
    snapshot: Snapshot<T>;
}
export declare class StreamBuilder<T> extends React.Component<StreamBuilderProps<T>, StreamBuilderState<T>> {
    private subscription;
    constructor(props: StreamBuilderProps<T>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
