import React,{useContext,useState} from 'react';
import operacionContext from '../../useContext/operacionContext' ;
import SearchType from './type/SearchType' ;
import SearchCategory from './category/SearchCategory' ;

const AdvancedSearch = () => {

    //useContext
    const operacionsContext = useContext(operacionContext) ;
    const {setError,error,setNewCategory,setChooseOption,getCategory} = operacionsContext ;

    const [searchType, setSearchType] = useState(false)
    const [searchCategory, setSearchCategory] = useState(false)
    
    const onChange = operation  =>{
        if(operation === 'type'){
            setSearchType(true) 
            setSearchCategory(false)
        }
        else {
            setSearchCategory(true)
            setSearchType(false)
        }
    }   

    return (
        <>
            <h2>Advanced Search</h2>
            
            <h4>Choose the search option you prefer</h4>
            <div className="containerSearch">
                <select  
                        name='type'
                        onChange={  e => onChange(e.target.value)}
                        className='btn text-white bg-dark me-3 '
                    >
                        <option value="">Select</option>
                        <option value="type" >Type of Operation</option>
                        <option value="category" >Category</option>
                    </select>

                    {searchType ?<SearchType /> : null}

                    {searchCategory ? <SearchCategory />: null}
            </div>
            


        </>
            )
}
 
export default AdvancedSearch;