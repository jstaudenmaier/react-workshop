////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

class Option extends React.Component {
    static propTypes = {
        onSelect: PropTypes.func
    }

    render() {
        return <div onClick={this.props.onSelect} className="option">{this.props.children}</div>;
    }
}

class Select extends React.Component {
    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.any,
        defaultValue: PropTypes.any
    };

    state = {
        showOptions: false,
        value: this.props.defaultValue
    };

    isControlled() {
        return (this.props.value != null);
    }

    toggleOptions = () => {
        this.setState({showOptions: !this.state.showOptions})
    };

    selectValue = (value) => {
        if (this.isControlled()) {
            this.props.onChange(value);
        } else {
            this.setState({value});
        }
    }

    render() {
        const value = (this.isControlled() ? this.props : this.state).value;
        let label;
        React.Children.forEach(this.props.children, child => {
            if (child.props.value === this.state.value) {
                label = child.props.children;
            }
        });
        const children = React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
                onSelect: () => this.selectValue(child.props.value)
            }));
        return (

            <div className="select" onClick={this.toggleOptions}>
                <div className="label">
                    {label} <span className="arrow">▾</span>
                </div>
                {this.state.showOptions && (
                    <div className="options">{children}</div>
                )}
            </div>
        )
            ;
    }
}

class App extends React.Component {
    state = {
        selectValue: "dosa"
    };

    setToMintChutney = () => {
        this.setState({selectValue: "mint-chutney"});
    };

    render() {
        return (
            <div>
                <h1>Select + Option</h1>

                <h2>Controlled</h2>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <p>
                    <button onClick={this.setToMintChutney}>
                        Set to Mint Chutney
                    </button>
                </p>

                <Select
                    value={this.state.selectValue}
                    onChange={value => this.setState({selectValue: value})}
                >
                    <Option value="tikka-masala">Tikka Masala</Option>
                    <Option value="tandoori-chicken">Tandoori Chicken</Option>
                    <Option value="dosa">Dosa</Option>
                    <Option value="mint-chutney">Mint Chutney</Option>
                </Select>

                <h2>Uncontrolled</h2>
                <Select defaultValue="tikka-masala">
                    <Option value="tikka-masala">Tikka Masala</Option>
                    <Option value="tandoori-chicken">Tandoori Chicken</Option>
                    <Option value="dosa">Dosa</Option>
                    <Option value="mint-chutney">Mint Chutney</Option>
                </Select>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));
