import React,{useContext,useState} from 'react';
import operacionContext from '../useContext/operacionContext' ;
import Error from './Error';
import axios from 'axios'


const NewCategory = () => {

    //useContext
    const operacionsContext = useContext(operacionContext) ;
    const {setError,error,setNewCategory,setChooseOption,getCategory} = operacionsContext ;

    //State Local
    const [newFormCategory,setNewFormCategory] = useState({
        name:''
    });

    const [existingCategoryError, setExistingCategoryError] = useState(false);
    
    const [successfulEntry, setsuccessfulEntry] = useState(false)

    const {name} = newFormCategory

    const postNewCategory = () =>{
        const consultAPI =async () =>{
            const url = `http://localhost:3000/category`
            await axios.post(url,{
                name:name
            })
            .then(respuesta => {
                
                setsuccessfulEntry(true)
                setTimeout(() => {
                    setNewCategory(false)
                    setChooseOption(true)
                    getCategory()
                }, 1200);
                
            })
            .catch(error => {
                setExistingCategoryError(true)
                
            })
        }
        consultAPI()
    } 


    //Submit Form
    const onSubmitForm = e =>{
        e.preventDefault()

        //Validate 
        if(name.trim()===''){
            return setError(true)
        }
        setError(false)
        setExistingCategoryError(false)

        postNewCategory()

    }

    const onChangeForm = e =>{
        setNewFormCategory({
            ...newFormCategory,
            [e.target.name]:e.target.value

        })
    }

    const onClickBack = () =>{
        setChooseOption(true)
        setNewCategory(false)
    }

    return(
        <div className='containerNewCategory'>  
        
                <h1>New Category</h1>
            
                
                <form 
                    className="containerFormNewCategory"
                    onSubmit={onSubmitForm}
                >
                    <label 
                        htmlFor="nameNewCategory"
                    > Enter the name of the new category</label>
                    
                    <input 
                        type="text"
                        onChange={onChangeForm}
                        id="nameNewCategory"
                        name="name"
                        placeholder='Enter the name of the new category'
                        value={name}
                        required
                    />

                    <div className='containerButton'>
                        <button  
                            className='btn col-6  btn-success'
                            type='submit'
                        > Send new category</button>
                        <button  
                            className='btn col-6 ms-1  btn-danger'
                            type='button'
                            onClick ={onClickBack}
                        >Back to Main Menu</button>
                    </div>
                    </form>
                    {error ?<Error  message={'All fields are required. Try again'}/>   : null}
                    {existingCategoryError ?<Error  message={'The category entered already exists. Try again'}/>   : null}
                    {successfulEntry ?<p className='message bg-success complet mt-2'>successful Entry</p> :null}
                    {/* AGREGAR LOGO DE TILDE CUANDO SALE BIEN */}
                    
                
                
            

        </div>
            );
}
 
export default NewCategory;