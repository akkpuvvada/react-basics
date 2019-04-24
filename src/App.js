/*
Why to import React?

Although you don't explicitly use the React instance you've imported, 
JSX is transpiled to React.createElement() call, which uses it.

example: 
jsx -> 
(
<div>comp </div>
)

this jsx is transpiled to

React.createElement(
  "div",
  null,
  "comp "
);
*/
import React from 'react';

import {SetState} from './Components/SetState'
import Display from './Components/SetState'
import './App.css';

/* Which type of component are we creating here?
  Answer: we are creating a stateless or a classless component 
          where no state is being used and no need of extending component class as 
          of other stateful components. But this component can recieve props from
          parent component if any.*/

function App() {
  return (
    <div>
    <SetState/>
    <Display/>
    </div>
  );
}

export default App;
/* Why should we export a component?

*/

/*Why should we use default export?
by using default you express that's going to be member in that module which would be 
imported if no specific member name is provided. You could also express you want to import 
the specific member called App by doing so: 
import {App} from './App.jsx'; in this case, no default is needed*/ 