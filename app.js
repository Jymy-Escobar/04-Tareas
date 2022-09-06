require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar,confirmar,mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() =>{
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        // Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    
    do{
        //Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case '2':
                //listar opcion
                tareas.listadoCompleto();
                break;
            case '3':
                //listar tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                //listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                //Completar
                const ids = await mostrarListadoChecklist(tareas.ListadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                //Borrar tareas
                const id = await listadoTareasBorrar(tareas.ListadoArr);
                if( id != '0'){
                    const ok = await confirmar("¿Está seguro?");
                
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }       
                break;

        }
        
        guardarDB(tareas.ListadoArr);

        await pausa();

    } while( opt !== '0')
    
    // 
};

main();







 