import React from 'react';
import Header from './header.jsx';
import Toolbar from './toolbar.jsx';
import Bookshelf from './bookshelf.jsx';


export default class App extends React.Component {
  render() {
    return (
     <div className='app'>
      <Header/>
      <Toolbar/>
      <Bookshelf/>
     </div>
      )
  }
}
 
