import React,{useState,useEffect} from 'react';
import axios from "axios";

import operacionContext from "./operacionContext"

const OperacionState =   props =>{

    //Función llama a la api
    const getTrades = () =>{
        const consultAPI =async () =>{
            const url = `http://localhost:3000/operations`
            await axios.get(url)
            .then(respuesta =>{
                setsOperations(respuesta.data.respuesta)
                
            })
            .catch(error =>{
                return    console.log(error)
                })
            } 
            consultAPI()
        }

        

        //Funcion que trae las categorias
        const getCategory = id =>{
            const consultAPI =async () =>{
                const url = `http://localhost:3000/category`
                await axios.get(url)
                .then(respuesta =>{
                    setCategories(respuesta.data.respuesta)
                })
                .catch(error =>{
                    return    console.log(error)
                    })
                } 
                consultAPI()
        }

    //Guarda todas las operaciones existentes
    const [operations, setsOperations] = useState([{}]);

    //Guarda el resultante de egreso e ingreso
    const [currentBalance, setCurrentBalance] = useState(0) ;

    //Determina si se muestra el componente NewOperation
    const [newOperation, setNewOperation] = useState(false);

    //Determina si se muestra el componente NewCategory
    const [newCategory, setNewCategory] = useState(false);

    //Determina si se muestra el componente Option
    const [chooseOption, setChooseOption] = useState(true);

    //Guarda todas las categorias existentes
    const [categories, setCategories] = useState([{}]);

    //Determina si se muestra el componente Error
    const [error, setError] = useState(false) ;


    const [categoryInformation, setCategoryInformation] = useState({
        id:'',
        concept :'' ,
        amount : '' ,
        date: '' ,
        categoryID:0
    })

    //Permite hacer click en la operación que desea eliminar
    const [allowDeletion, setAllowDeletion] = useState(false);

    //Permite hacer click en la operación que desea cambiar
    const [allowPut, setAllowPut] = useState(false);

    const [search, setSearch] = useState('')

    


    return(
        <operacionContext.Provider 
        value = {{
            operations,
            currentBalance,
            newOperation,
            newCategory,
            chooseOption,
            categories,
            error,
            categoryInformation,
            allowDeletion,
            allowPut,
            search,
            setsOperations,
            setCurrentBalance,
            setNewOperation,
            setChooseOption,
            getTrades,
            getCategory,
            setCategoryInformation,
            setError,
            setCategories,
            setNewCategory,
            setAllowDeletion,
            setAllowPut,
            setSearch

        }}
        
        
        >

            {props.children}

        </operacionContext.Provider>
    )
}


export default OperacionState ;