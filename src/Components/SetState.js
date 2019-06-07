//Class to demonstrate the setState concept by creating a stateful component
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import {Row} from 'react-bootstrap'
import Square from './Square/Square';
/*Why do we import Component
Answer: State i.e an object that determines how that component renders & behaves, is an 
instance of a React component class. Here Iam expicitly mentioning in import statement since
Component is a named import which otherwise has to be mentioned as react.Component in extends.
*/

/*Detailed example
import React from 'react'

The above is a default import. Default imports are exported with export default .
There can be only a single default export.

import { Component } from 'react'

But this is a member import (named import). Member imports are exported with export .
There can be many member exports.

You can import both by using this syntax:

import React, { Component } from 'react';

In JavaScript the default and named imports are split, so you can't import a named import 
like it was the default. The following, sets the name Component to the default export of 
the 'react' package (which is not going to be the same as React.Component:

import Component from 'react';
*/

var columns = []; //To be used to display squares

export class SetState extends Component {
    constructor() {
        super()
        this.state = {
            number: 0,
        }
    }
    updateNumber() {
        columns = []
        for (var j = 0; j < this.refs.number.value; j++) {
            columns.push(j)
        }
        this.setState({
            number: this.refs.number.value,
        })
    }
    renderSquare(ind) {
        return <Square index={ind} />
    }
    render() {
        return (
            <div>
                <h1>Heart of react</h1>
                <p>This updates the UI or the component.</p>
                <p>The virtual DOM is updated on changing the state through setstate as there is a change in DOM and VDOM the component will be rendered</p>
                <p>In below example as soon as you enter the number n x n squares are formed</p>
                <input type="number" ref="number" onChange={() => { this.updateNumber() }} />
                <p>{columns.length}</p>
                {columns.map((index) => {
                    return (
                        <p>
                            <p>
                                {
                                    columns.map((index) => {
                                        return <Square />
                                    })
                                }
                            </p>
                            <p>.</p>
                            </p>
                    )
                }
                )}
            </div>
        );
    }
}

export default class Display extends Component {
    render() {
        return (
            <div>
                <input type="number" />
            </div>
        )
    }
}