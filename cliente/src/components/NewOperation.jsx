import React,{useContext,useState} from 'react';
import operacionContext from '../useContext/operacionContext' ;
import Error from './Error';
import axios from 'axios'

const NewOperation = () => {
    //useContext
    const operacionsContext = useContext(operacionContext) ;
    const { categories,setError,error,getTrades,setNewOperation,setChooseOption} = operacionsContext ;

    //State Local

    const [newOperation, setnewOperation] = useState({
        concept:'',
        amount:'',
        date:'',
        type:'',
        categoryID:''
    }) ;
    const [successfulEntry, setsuccessfulEntry] = useState(false)

    const postNewOperation= () =>{
        const consultAPI =async () =>{
            const url = `http://localhost:3000/operations`
            await axios.post(url,{
                concept:concept,
                amount:parseInt(amount),
                date:date,
                type:type,
                categoryID:parseInt(categoryID),
                
            })
            .then(respuesta => {
                setsuccessfulEntry(true)

                setTimeout(() => {
                    getTrades()
                    setChooseOption(true)
                    setNewOperation(false)
                }, 1200);
                
            })
            .catch(error => {
                console.log(error)
                
            })
        }
        consultAPI()
    } 

    const {concept,amount,date,type,categoryID} = newOperation ;

    const onChangeForm = e =>{
        setnewOperation({
            ...newOperation,
            [e.target.name]:e.target.value
        })
    };


    const onSubmitForm = e =>{
        e.preventDefault()

        //validate
        if(concept.trim()==='' || amount.trim()===''|| date.trim()===''|| type.trim()===''|| categoryID.trim()===''){
            return setError(true)
            
        }
        setError(false)

        postNewOperation()
    }

    const onClickBack = () =>{
        setChooseOption(true)
        setNewOperation(false)
    }

    return (
        <div className ='containerNewOperation'>
            <h1>New Operation</h1> 
            
            <form onSubmit={onSubmitForm}>
                <label 
                    htmlFor='conceptNewOperation'
                    className='form-label'
                    
                >Enter concept of new operation</label>
                <input 
                    type="text"
                    className='form-control'
                    id='conceptNewOperation'
                    placeholder='Enter concept of new operation'
                    name='concept'
                    value={concept}
                    onChange={onChangeForm}
                    required
                />

                <label 
                    className='form-label'
                    htmlFor='amountNewOperation'
                >Enter amount of the new operation</label>
                <input 
                    type="number"
                    className='form-control'
                    id='amountNewOperation'
                    placeholder='Enter amount of the new operation $'
                    name='amount'
                    onChange={onChangeForm}
                    value={amount}
                    required
                />

                <label 
                    className='form-label'
                    htmlFor='dateNewOperation'
                >Enter date of new operation</label>
                <input 
                    type="text"
                    className='form-control'
                    id='dateNewOperation'
                    placeholder='Enter date of new operation'
                    name='date'
                    onChange={onChangeForm}
                    value={date}
                    required
                />

                <label 
                >Choose the category of the new operation</label>
                <select
                    name='categoryID'
                    onChange={onChangeForm}
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

                            <br/>
                            <br/>

                <label 
                >Choose the type of the new operation</label>
                <select  
                    name='type'
                    onChange={onChangeForm}
                    required
                >
                    <option value="">Select</option>
                    <option value="entry">Entry</option>
                    <option value="egress">Egress</option>
                </select>
                            <br/>
                <button  
                    className='btn col-5 mt-2  btn-success btn-block'
                    type='submit'
                > Send information</button>
                <button  
                    className='btn col-5 mt-2  btn-danger btn-block'
                    type='button'
                    onClick ={onClickBack}
                >Back to Main Menu</button>
                
            </form>
            {successfulEntry ?<p className='message bg-success complet mt-2'>successful Entry</p> :null}
            {error ?<Error  message={'All fields are required. Try again'}/>   : null}
            
        </div>    
        )
    }
    
    
export default NewOperation;