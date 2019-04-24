//Class to demonstrate the setState concept by creating a stateful component
import React, { Component } from 'react';
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

export class SetState extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <input type="text" />
            </div>
        );
    }
}

export default class Display extends Component {
    constructor() {
        super()
    }
    render(){
        return(
            <div>
                <input type="number"/>
            </div>
        )
    }
}