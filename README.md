# react-stream-builder
A React Component that builds itself based on the latest snapshot emitted by an Observable.

## Usage

Install the following npm package: https://www.npmjs.com/package/react-stream-builder

## Example

See ./example for a minimal example.

```javascript
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
```
