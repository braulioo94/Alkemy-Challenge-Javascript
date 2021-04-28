
import './App.css';
import React from 'react';
import OperacionState from './useContext/operacionState' ;
import Header from './components/Header' ;
import OperationsList from './components/OperationsList' ;
import Option  from './components/Option' ;
import AdvancedSearch from './components/Search/AdvancedSearch'


function App() {

  

  return (
    <OperacionState>
      <div className='container'>
        <header>
          <Header />
        </header>
        <main>
          <OperationsList />

          <Option />
          
        </main>
        <section>
          <AdvancedSearch />
        </section>
        

      </div>
    </OperacionState>
  );
}

export default App;
