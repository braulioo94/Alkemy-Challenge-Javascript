import React,{useContext,useState} from 'react';
import operacionContext from '../../../useContext/operacionContext' ;
import ChangeOperation from '../../ChangeOperation';
import DeleteOperation from '../../DeleteOperation' ;

const SearchCategory = () => {

    //useContext
    const operacionsContext = useContext(operacionContext) ;
    const {operations,categories,setCategoryInformation,setAllowDeletion,allowDeletion,setAllowPut,allowPut,setSearch,search} = operacionsContext ;

    //state local
    
    const [selectPut, setSelectPut] = useState(false)
    const [selectDelete, setSelectDelete] = useState(false)


    const onChange = operation  =>{
        setSearch(parseInt(operation))
    } 

    const onClickDelete = () =>{
        if(selectDelete) setSelectDelete(false)
        else {
            setSelectDelete(true)
            setSelectPut(false)
        }
    }
    
    const onClickPut = () =>{
        if(selectPut) setSelectPut(false)
        else {
            setSelectPut(true)
            setSelectDelete(false)
        }
    }

    //OnClick
    const onclick = (id, concept,amount,date,type) =>{
        if(selectPut){
            setAllowPut(true)
            setAllowDeletion(false)

        }if (selectDelete) {
            setAllowDeletion(true)
            setAllowPut(false)
        }


        setCategoryInformation({
            id:id,
            concept:concept,
            amount:amount,
            date:date,
            type:type
        }
        )
    }

    return (
            <>
                <div className="containerSelect">
                    <div className='selectButton'>
                        <select
                            name='categoryID'
                            onChange={ e => onChange(e.target.value)}
                            className='btn text-white bg-dark   '
                            required
                        >
                                <option value="">Select</option>

                                    {categories.map(category =>(
                                        <option 
                                            key={category.id} 
                                            value={category.id}
                                        > {category.name} </option>
                                    ))}
                            </select>
                            <div className="containerButton">
                                <button 
                                    className='btn col-5 btn-block btn-success'
                                    onClick={onClickPut}
                                >
                                    Edit
                                </button>
                                <button 
                                    className='btn col-5 btn-danger'
                                    onClick={onClickDelete}
                                >
                                    Delete 
                                </button>
                        </div>
                    </div>
                
                {search != '' ?
                <div className='containerTabla'>
                    {selectDelete ? <h5>Select the operation to delete</h5> : null}
                    {selectPut ? <h5>Select the operation to edit</h5> : null}
                    <table
                    className="table table-striped table-hover col-5 "
                    >
                        <thead>
                            <tr>
                                <th>Concept</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                    
                        {operations.filter(operation =>operation.categoryID === search).map(filteredOperation=>(
                            <tr 
                                key={filteredOperation.id}
                                    className={filteredOperation.type === 'entry' ?'bg-success'  :'bg-danger'  }
                                    onClick={(e =>onclick(filteredOperation.id,filteredOperation.concept,filteredOperation.amount,filteredOperation.date,filteredOperation.categoryID))}
                                >
                                <td>{filteredOperation.concept}</td>
                                <td>$ {filteredOperation.amount}</td>
                                <td>{filteredOperation.date}</td>
                                <td>{filteredOperation.type}</td> 
                            </tr>
                                    
                            ))} 
                        </tbody>
                    </table>

                    {allowDeletion ?<DeleteOperation />  :null}
                    {allowPut ?<ChangeOperation />  : null}
                </div>
                :
                null
        }
        </div>
    </>
    )
}
    export default SearchCategory;