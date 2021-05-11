import React,{useState, useContext,useEffect} from 'react' ;
import operacionContext from '../useContext/operacionContext' ;

const OperationsList = () => {


    //useContext
    const operacionsContext = useContext(operacionContext);
    const { operations,setCurrentBalance,currentBalance, categories,getTrades,getCategory} = operacionsContext ;



        useEffect(() => {
            getTrades()
            getCategory()
            
            
        }, [])
        
        useEffect(() => {
            seeOperations()
        }, [operations])


        //Calcula el resultante de los ingresos y egresos
        const calculateBudget = ( type , amount) =>{
            
            if(type === 'entry'){
                let totalEntry=operations.filter(operation =>operation.type ==='entry').reduce((total, producto) => total+ producto.amount,0)
                let totalEgress=operations.filter(operation =>operation.type ==='egress').reduce((total, producto) => total- producto.amount,0)
                let resultado = totalEgress + totalEntry
                
                setCurrentBalance(resultado)
            }
            
        }
        
        const [lastOperations, setLastOperations] = useState([{}])

        //Guarda las ultimas 10 operaciones
        const seeOperations =() =>{
            if(operations.length <= 10){
                let aNuevo = operations
                setLastOperations(aNuevo)
                
            }else {
                let aNuevo = operations.slice(operations.length-10)
                setLastOperations(aNuevo)
                
            }
        }
            
        
            
            
    return (
        <div className='containerTable'>

            <h3>Current budget :$ {currentBalance}</h3> 
            <h5>Last ten operations</h5>
            <table
                className="table table-striped table-hover col-5 "
            >
                <thead>
                    <tr>
                        <th>Concept</th>
                        <th>Amount </th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {lastOperations.map(operacion =>(
                        <tr
                            key={operacion.id}
                            className={operacion.type === 'entry' ?'bg-success'  :'bg-danger'  }
                            o
                        >
                            <td >{operacion.concept}</td>
                            <td>$ {operacion.amount}</td>
                            <td>{operacion.date}</td>
                            <td>{operacion.type}</td>
                            {categories.filter(category =>category.id ===operacion.categoryID).map(categoryFiltrado=>(<td>{categoryFiltrado.name}</td> ))}
                            
                            {calculateBudget(operacion.type, operacion.amount)} 
                        </tr>
                        
                    ))}
                </tbody>
                
            </table> 
        </div>
    );
}
export default OperationsList;