import React,{useContext, useState} from 'react'
import axios from 'axios'
import operacionContext from '../useContext/operacionContext' ;
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap' ;
import Error from './Error' ;





const DeleteOperation = () => {

   //useContext
    const operacionsContext = useContext(operacionContext) ;
    const {categoryInformation,getTrades,setAllowDeletion,
        allowDeletion,} = operacionsContext ;

    

    const {id } = categoryInformation ;


    const [successfulEntry, setsuccessfulEntry] = useState(false)

    

    const cancelPut = () =>{
        setAllowDeletion(false)
    }

    

    const deleteOperation= () =>{
        const consultarAPI =async () =>{
            const url = `http://localhost:3000/operations/${id}`
            await axios.delete(url)
            .then(respuesta => {
                setsuccessfulEntry(true)
                setTimeout(() => {
                    getTrades()
                    setsuccessfulEntry(false)
                    setAllowDeletion(false)
                }, 1200);
            })
            .catch(error => {
                console.log(error);
                
            })
        }
        consultarAPI()
    }  

    return (
        
     <div className="modal">       
        <Modal isOpen={allowDeletion }>
        
            <ModalHeader>
                <h2>Attention!</h2>
            </ModalHeader>
            <ModalBody>
                <h4>You are sure you want to delete the selected operation?</h4>

                {successfulEntry ?<p className='message bg-success complet mt-2'>Successful deletion</p> :null}
            </ModalBody>

            <ModalFooter>
            <div className='containerButton'>
                <Button 
                    className=  'btn btn-block btn-success'
                    onClick={deleteOperation}
                > Delete Operation </Button>
                <Button 
                    className= 'btn btn-block btn-danger'
                    onClick={cancelPut}
                > Cancel </Button>
            </div>
            </ModalFooter>
        
        </Modal>
    </div>        
    );
}

export default DeleteOperation;