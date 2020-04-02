import React from 'react';
import CatalogueItem from './components/Tiles/CatalogueItem';
var {cat} = require('./components/fakedata')


const App = () => {
  return (
      cat.map(i => <CatalogueItem text = {i}/>)
  );
};


export default App;
