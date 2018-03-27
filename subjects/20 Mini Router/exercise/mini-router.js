////////////////////////////////////////////////////////////////////////////////
import React from "react";
import PropTypes from "prop-types";
import {createHashHistory} from "history";

/*
// read the current URL
history.location

// listen for changes to the URL
history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

class Router extends React.Component {
    history = createHashHistory();

    static childContextTypes = {
        router: PropTypes.shape({
                location: PropTypes.object.isRequired,
                history: PropTypes.object.isRequired
            }
        ).isRequired
    };

    getChildContext() {
        return {
            router: {
                location: this.state.location,
                history: this.history
            }
        }
    }

    state = {
        location: this.history.location
    };

    componentDidMount() {
        this.history.listen(() => {
            this.setState({location: this.history.location})
        })
    }

    render() {
        return this.props.children;
    }
}

class Route extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
                location: PropTypes.object.isRequired
            }
        ).isRequired
    }

    render() {
        const { path, render, component: Component } = this.props;
        const location = this.context.router.location;
        if ( location.pathname === path) {
            if (Component) {
                return <Component/>
            } else {
                return render();
            }
        } else {
            return null;
        }


    }
}

class Link extends React.Component {
    static contextTypes = {
        router: PropTypes.shape({
                history: PropTypes.object.isRequired
            }
        ).isRequired
    }

    handleClick = e => {
        e.preventDefault();
        const {history} = this.context.router;
        if ( history.location != this.props.to) {
            history.push(this.props.to)
        }

    };

    render() {
        return (
            <a href={`#${this.props.to}`} onClick={this.handleClick}>
                {this.props.children}
            </a>
        );
    }
}

export {Router, Route, Link};
