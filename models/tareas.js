const Tarea = require('./tarea');
const colors = require('colors');

class Tareas{
    _listado = {};


    get ListadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);

        });


        return listado;
    }
 
    
    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;            
        });
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.ListadoArr.forEach((tarea, i) => {
            const indice = i + 1;
            const completado = tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red

            console.log(`${(indice + '.').green} ${tarea.desc} :: ${completado}`);
        });        
    }

    listarPendientesCompletadas( completadas = true){
        console.log();

        let tareasFiltradas;
        if (completadas){
            tareasFiltradas = this.ListadoArr.filter(tarea => tarea.completadoEn != null);
        }else{
            tareasFiltradas = this.ListadoArr.filter(tarea => tarea.completadoEn == null);
        }

        tareasFiltradas.forEach((tarea, i) => {
            const indice = i + 1;
            const completado = tarea.completadoEn ? tarea.completadoEn.green : 'Pendiente'.red

            console.log(`${(indice + '.').green} ${tarea.desc} :: ${completado}`);
        }); 
    }

    toggleCompletadas(ids =[]){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.ListadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }


}

module.exports = Tareas;


