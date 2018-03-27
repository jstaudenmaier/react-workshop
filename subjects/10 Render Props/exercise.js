////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
//
// Got extra time?
//
// - Now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure <GeoAddress> supports the user moving positions
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import LoadingDots from "./utils/LoadingDots";
import getAddressFromCoords from "./utils/getAddressFromCoords";


class GeoAddress extends React.Component {
    static defaultProps = {
        coordinds: {}
    };

    state = {
        address: null
    };

    doImperativeWork() {
        const{lattitude, longitude} = this.props.coordinds;
        if(lattitude && longitude){
            getAddressFromCoords(lattitude,longitude).then(address =>
                this.setState({address}));
        }
    }
    componentDidMount() {
        this.doImperativeWork();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.longitude !== this.props.longitude ||
            prevProps.latitude !== this.props.latitude
        )
            this.doImperativeWork();
    }

    render() {
        return this.props.children(this.state.address)
    }
}


class GeoPosition extends React.Component {
    state = {
        coords: {
            latitude: null,
            longitude: null
        },
        error: null
    };

    componentDidMount() {
        this.geoId = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    coords: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            error => {
                this.setState({error});
            }
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.geoId);
    }

    render() {
        return this.props.children(this.state.error, this.state.coords)
    }
}

class App extends React.Component {
    render() {
        return (
            <GeoPosition>
                {(error, coords) => (
                    <div>
                        <h1>Geolocation</h1>
                        {error ? (
                            <div>Error: {error.message}</div>
                        ) : (
                            <dl>
                                <dt>Latitude</dt>
                                <dd>{coords.latitude || <LoadingDots/>}</dd>
                                <dt>Longitude</dt>
                                <dd>{coords.longitude || <LoadingDots/>}</dd>
                            </dl>
                            // <div>
                            // <GeoAddress coordinds={coords}>
                            //
                            // </GeoAddress>
                            // </div>
                        )}
                    </div>)}
            </GeoPosition>

        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
