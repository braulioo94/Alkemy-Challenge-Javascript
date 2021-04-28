    const express = require('express') ;
    const mysql = require('mysql') ;
    const cors = require('cors') ;
    const util = require('util');
    const { json } = require('express');



    const app = express();
    app.use(cors()) ;
    const port = 3000 ;

    app.use(express.json()) ;


    const conexion = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'presupuesto'
    });

    conexion.connect((error)=>{
        if(error) {
            throw error;
        }

        console.log('Conexion con la base de datos mysql establecida');
    });

    const qy = util.promisify(conexion.query).bind(conexion);

    //Desarrollo Presupuesto


    app.post('/operations', async (req , res) => {

        try{
                let concept = [req.body.concept] ;
                let amount = [req.body.amount] ;
                let date = [req.body.date] ;
                let type = [req.body.type];
                let categoryID =[ req.body.categoryID] ;
                
                
                 if(!concept ||!amount ||!date ||!type ||!categoryID){
                    throw new Error('Falto enviar información')
                }

                if( isNaN(amount) ){
                    throw new Error('No se envio un monto valido')
                }

                

                query ='INSERT INTO operaciones(concept, amount, date, type , categoryID) VALUE (?,?,?,?,?) '
                respuesta=await qy(query,[concept,amount, date, type , categoryID])
                res.status(200).send('Operacion ingresada con exito') ;
            }
            catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        }
        );

        app.get('/operations', async (req , res) => {

            try {
                    let query ='SELECT * FROM operaciones' ;
                    let respuesta= await qy( query)
                    res.status(200).send({'respuesta':respuesta}) ;
        
                
            } catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
            })

        app.get('/operations/:id', async ( req , res) => {
            try{
                let id = req.params.id ;

                let query = 'SELECT * FROM operaciones WHERE id = ? '
                let respuesta = await qy(query, [id])
                if(respuesta.length === 0){
                    throw new Error('La operación indicada no existe')
                }
                res.status(200).send({'respuesta':respuesta})
            }
            catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        })

        app.put('/operations/:id', async ( req , res) => {
            try{
                let concept = req.body.concept ;
                let amount = req.body.amount ;
                let date = req.body.date ;
                let categoryID = req.body.categoryID ;
                let id = req.params.id ;
                
                if(concept.trim().length== 0||amount== 0||date.trim().length== 0||categoryID== 0){
                    throw new Error('No se envio la informacón necesaria')
                }

                query = 'SELECT * FROM operaciones WHERE id = ?'
                respuesta= await qy (query, [id])
                if(respuesta.length === 0){
                    throw new Error('La operación indicada no existe')
                }
                
                query = 'UPDATE operaciones SET concept = ?, amount = ?, date =?, categoryID=? WHERE id =?  '
                respuesta= await qy(query , [concept, amount, date,categoryID,id])
                res.status(200).send('Modificación hecha con exito')

            }catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }

        })

        app.delete('/operations/:id', async ( req , res) => {
            try{
                let id = req.params.id ;

                let query = 'SELECT * FROM operaciones WHERE id = ?' ;
                let respuesta = await qy(query,[id]) ;
                if(respuesta.length === 0){
                    throw new Error('No se encontro la operación  que se quiere borrar')
                }
                
                query = 'DELETE FROM operaciones WHERE id = ?' ;
                respuesta= await qy ( query,[id]);
                res.status(200).send('Borrado exitoso')
            }catch(e){
                console.error(e.message);   
                res.status(413).send({"Error": e.message});
            }
        })

        // FIN Desarrollo Presupuesto

        //Desarrollo Categoria
        app.post('/category', async (req , res) => {

            try{
                    let name = req.body.name.toUpperCase() ;
                    if(!name ){
                        throw new Error('Falto enviar información')
                    }
                    if(name.trim().length== 0){
                        throw new Error('Se envio información vacia')
                    }
                    let query ='SELECT * FROM categoria WHERE name = ?'
                    let respuesta = await qy ( query,[name])
                    if(respuesta.length > 0){
                        throw new Error ('Ya existe la categoria ingresada')
                    }
    
                    query ='INSERT INTO categoria(name) VALUE (?) '
                    respuesta=await qy(query,[name,])
                    res.status(200).send('Categoria ingresada con exito') ;
                }
                catch(e){
                    console.error(e.message);   
                    res.status(413).send({"Error": e.message});
                }
            }
            );

            app.get('/category', async (req , res) => {

                try {
                        let query ='SELECT * FROM categoria' ;
                        let respuesta= await qy( query)
                        res.status(200).send({'respuesta':respuesta}) ;
            
                    
                } catch(e){
                    console.error(e.message);   
                    res.status(413).send({"Error": e.message});
                }
                })
    
            app.get('/category/:id', async ( req , res) => {
                try{
                    let id = req.params.id ;
    
                    let query = 'SELECT * FROM categoria WHERE id = ? '
                    let respuesta = await qy(query, [id])
                    if(respuesta.length === 0){
                        throw new Error('La categoria indicada no existe')
                    }
                    res.status(200).send({'respuesta':respuesta})
                }
                catch(e){
                    console.error(e.message);   
                    res.status(413).send({"Error": e.message});
                }
            })
            app.delete('/categoria/:id', async ( req , res) => {
                try{
                    let id = req.params.id ;
    
                    let query = 'SELECT * FROM categoria WHERE id = ?' ;
                    let respuesta = await qy(query,[id]) ;
                    if(respuesta.length === 0){
                        throw new Error('No se encontro la categoria  que se quiere borrar')
                    }
                    
                    query = 'DELETE FROM categoria WHERE id = ?' ;
                    respuesta= await qy ( query,[id]);
                    res.status(200).send('Borrado exitoso')
                }catch(e){
                    console.error(e.message);   
                    res.status(413).send({"Error": e.message});
                }
            })
            // FIN Desarrollo Categoria




app.listen(port, ()=>{
    console.log("Escuchando en puerto", + port)
})
