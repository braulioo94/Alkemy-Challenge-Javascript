import React,{useContext} from 'react';
import operacionContext from '../useContext/operacionContext' ;
import NewCategory from './NewCategory' ;
import NewOperation from './NewOperation' ;

const Option = () => {

    //useContext
    const operacionsContext = useContext(operacionContext)
    const {setNewOperation,newOperation,setNewCategory,newCategory,setChooseOption,chooseOption} = operacionsContext


    const onClick = e =>{
        if(e ==='operation'){
            setNewOperation(true)
        }

        else {
            setNewCategory(true)
            setChooseOption(false)
        }

        setChooseOption(false)
    }

    return ( 
        <>
        {chooseOption 
            ?
                <div className='container-btn'>
                    <button 
                        className='btn  btn-success  '
                        onClick={e => onClick('operation')}
                    >Load new operation
                    </button>

                    <button 
                        className='btn  btn-success '
                        onClick={() =>onClick('category')}
                    >Load new category </button>
                </div> 
            :
            null}
            <div className="containerOption">
                {newOperation ? <NewOperation /> : null} 
                {newCategory ?  <NewCategory /> : null}
            </div>
        </>    
        );
}
    
export default Option;