////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
    static propTypes = {
        numRows: PropTypes.number.isRequired,
        rowHeight: PropTypes.number.isRequired,
        renderRowAtIndex: PropTypes.func.isRequired
    };

    state = {
        scrollTop: 0,
        scrollHeight: 0
    }

    handleScroll = event => {
        this.setState({scrollTop: event.target.scrollTop, scrollHeight: this.scroller.availableHeight});

        console.log(this.state.scrollTop)
    }


render()
{
    const {numRows, rowHeight, renderRowAtIndex} = this.props;
    const totalHeight = numRows * rowHeight;
    const firstIndex = Math.floor(this.state.scrollTop / rowHeight);
    console.log ("FirstIndex = " + firstIndex)
    const lastIndex = firstIndex + Math.ceil(this.state.availableHeight/rowHeight);
    console.log ("LastIndex = " + lastIndex)
    const items = [];

    //HINT HINT DON'T LOOP FROM 0 -> NumRows.  TRIM IT DOWN!!
    const startIndex = 0;
    const endIndex = numRows;

    let index = firstIndex;
    while (index < lastIndex) {
        items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
        index++;
    }

    return (

        <div style={{height: "100vh", overflowY: "scroll"}}
             onScroll={this.handleScroll}
            ref={node =>(this.scroller = node)}>
            <div style={{height: totalHeight,
            paddingTop: startIndex * rowHeight}}>
                <ol>{items}</ol>
            </div>
        </div>
            );
            }
            }

            ReactDOM.render(
        <ListView
            numRows={500}
            rowHeight={RainbowListDelegate.rowHeight}
            renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
        />,
            document.getElementById("app")
            );
