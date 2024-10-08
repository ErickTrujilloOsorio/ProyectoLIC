import './App.css';
import Inicio from './components/inicio';
import Nav from './components/nav';
import QuienesSomos from './components/quienesSomos'
import Contacto from './components/contacto';
import Servicios from './components/servicios';

function App() {
  let component
  switch (window.location.pathname) {
    case '/':
      component = <Inicio />
     break;
    case '/quienes-somos':
      component = <QuienesSomos />
    break;
    case '/contactanos':
      component = <Contacto />
    break;
    case '/servicios':
      component = <Servicios />
    break;
    default:
      component = <QuienesSomos/>
    break;
  }
  return (
    <>
      <Nav />
      <div className=''>
        {component}
      </div>
    </>
  );
}

export default App;
