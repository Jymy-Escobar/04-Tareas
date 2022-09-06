require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
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
                tareas.listadoTareas();
                break;
        }
        
        guardarDB(tareas.ListadoArr);

        await pausa();

    } while( opt !== '0')
    
    // 
};

main();







 