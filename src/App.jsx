import './app.css';
import DisplayResults from './components/DisplayResults';






function App() {

  return (

    <div className="global-container">
    <h1 className="title">C🌎UNTRY FINDER</h1>
    <p className='ron-footer'>Powered by  <a href="https://www.reactjs.org" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://www.vitejs.dev" target="_blank" rel="noopener noreferrer"> Vite </a>  &  <a href="https://www.restcountries.com" target="_blank" rel="noopener noreferrer"> REST Countries</a>. | <a href="mailto:rontrias7@gmail.com" target="_blank" rel="noopener noreferrer">Ron Trias</a> </p>
    <DisplayResults />
    </div>
  );

}


export default App;
