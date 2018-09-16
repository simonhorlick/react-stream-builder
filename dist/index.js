"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const rxjs_1 = require("rxjs");
// ConnectionState is the state of connection to an asynchronous computation.
var ConnectionState;
(function (ConnectionState) {
    // Not currently connected to any asynchronous computation.
    ConnectionState[ConnectionState["none"] = 0] = "none";
    // Connected to an asynchronous computation and awaiting interaction.
    ConnectionState[ConnectionState["waiting"] = 1] = "waiting";
    // Connected to an active asynchronous computation.
    //
    // For example, a Observable that has returned at least one value, but is not
    // yet done.
    ConnectionState[ConnectionState["active"] = 2] = "active";
    // Connected to a terminated asynchronous computation.
    ConnectionState[ConnectionState["done"] = 3] = "done";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
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
class StreamBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            snapshot: {
                data: undefined,
                state: ConnectionState.none,
            },
        };
        this.subscription = rxjs_1.Subscription.EMPTY;
    }
    componentDidMount() {
        this.subscription = this.props.stream.subscribe(snapshot => this.setState({
            snapshot: { data: snapshot, state: ConnectionState.active },
        }), error => { }, () => this.setState({
            snapshot: { data: undefined, state: ConnectionState.done },
        }));
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
    }
    render() {
        // Dispatch directly to the user-supplied render function.
        return this.props.builder(this.state.snapshot);
    }
}
exports.StreamBuilder = StreamBuilder;
