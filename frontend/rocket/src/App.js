import React from 'react'
import Splash from './components/Splash'
import OrderDispatched from './components/OrderDispatched';
import { Container } from 'semantic-ui-react';
import RestaurantView from './components/RestaurantView';
import RestaurantMenu from './components/RestaurantMenu';
import OrderReceived from './components/OrderReceived';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Catalogue from './components/Catalogue';
import Checkout from './components/Checkout';
//import {BrowserRouter, Route, Link} from 'react-router-dom'


// const App = () => {
//   return (
  
//       <RestaurantMenu restaurant='Mos Burger' minOrder= '10' items= { [
//     {
//         name: 'MOS Burger',
//         price: '3.55',
//         img: '/mosburgersamplepics/mosburger.jfif'

//     },
//     {
//         name: 'MOS Cheeseburger',
//         price: '3.85',
//         img: '/mosburgersamplepics/cheese.jfif'
//     },
//     {
//         name: 'Teriyaki Burger',
//         price: '3.55',
//         img: '/mosburgersamplepics/teri.jfif'
//     },
//     {
//         name: 'Chicken Burger',
//         price: '3.45',
//         img: '/mosburgersamplepics/chx.jfif'
//     }
// ]}/>

//   );
// };

// const App = () => {
//   return (
  
//       <Splash />

//   );
// };

// const App = () => {
//   return (
//   <Container>
//       <OrderDispatched />
//       </Container>
//   );
// };

// const App = () => {
//   return (
//   <Container>
//       <OrderReceived />
//       </Container>
//   );
// };

// const App = () => {
//   return (
//   <Container>
//       <Signin />
//       </Container>
//   );
// };

// const App = () => {
//   return (
//   <Container>
//       <Signup />
//       </Container>
//   );
// };

// const App = () => {
//   return (
//   <Container>
//       <Catalogue />
//       </Container>
//   );
// };

// const App = () => {
//   return (
//   <Container>
//       <Checkout />
//       </Container>
//   );
// };

const App = () => {
  return (
  <Container>
      <RestaurantView />
      </Container>
  );
};
export default App;
