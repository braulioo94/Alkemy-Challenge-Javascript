import React,{useContext, useState} from 'react'
import axios from 'axios'
import operacionContext from '../useContext/operacionContext' ;
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap' ;
import Error from './Error' ;





const ChangeCategory = () => {

   //useContext
    const operacionsContext = useContext(operacionContext) ;
    const {setCategoryInformation,setAllowPut,allowPut,categoryInformation,setError,error,categories,getTrades} = operacionsContext ;

    

    const {id, concept  ,amount  ,date ,categoryID } = categoryInformation ;

    //Envia mensaje Successful Entry
    const [successfulEntry, setsuccessfulEntry] = useState(false)

    const onChangeForm = e =>{
        setCategoryInformation({
            ...categoryInformation,
            [e.target.name]: e.target.value
        })
    }

    const submitPut = e =>{
        e.preventDefault()
        if(concept.trim()===''||amount === 0||date.trim()===''||categoryID.trim()===0){
            return setError(true)
        }
        setError (false)
        putOperation()
    }

    const cancelPut = () =>{
        setAllowPut(false)
    }

    

    const putOperation= () =>{
        const consultarAPI =async () =>{
            const url = `http://localhost:3000/operations/${id}`
            await axios.put(url,{
                concept:concept,
                amount:parseInt(amount),
                date:date,
                categoryID:parseInt(categoryID)
            })
            .then(respuesta => {
                setsuccessfulEntry(true)
                setTimeout(() => {
                    getTrades()
                    setAllowPut(false)
                }, 1200);
            })
            .catch(error => {
                console.log(error);
                
            })
        }
        consultarAPI()
    }  

    return (
        
            
        <Modal isOpen={allowPut }>
        <ModalHeader>
            <h2>Attention!</h2>
            <h5>Modify only what is necessary</h5>
        </ModalHeader>
        <ModalBody>
        <form >
                <label 
                    className='form-label'
                >Enter the new name concept</label>
                <input 
                    type="text" 
                    name="concept" 
                    placeholder={concept}
                    className='form-control'
                    value={concept}
                    onChange={onChangeForm}
                    
                />
                <label 
                    className='form-label'
                >Enter the new name amount</label>
                <input 
                    type="text" 
                    name="amount" 
                    placeholder={amount}
                    className='form-control'
                    value={amount}
                    onChange={onChangeForm}

                /><label 
                    className='form-label'
                >Enter the new name date</label>
                <input 
                    type="text" 
                    name="date" 
                    placeholder={date}
                    className='form-control'
                    value={date}
                    onChange={onChangeForm}
                />
                <br/>
                <label
                    className='form-label'
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
                
            </form>
            {successfulEntry ?<p className='message bg-success complet mt-2'>Successful Entry</p> :null}
            {error && <Error message='Invalid information was sent. Try again'/>}
        </ModalBody>
        <ModalFooter>
            
        <Button 
            className=  'btn btn-block btn-success'
            onClick={submitPut}
        > Submit changes </Button>
        <Button 
            className= 'btn btn-block btn-danger'
            onClick={cancelPut}
        > Cancel </Button>
        </ModalFooter>
    
    </Modal>
            
    );
}

export default ChangeCategory;