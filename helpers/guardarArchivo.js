const fs = require('fs');
const ruta = './db/data.json';


const guardarDB = ( data ) => {
    fs.writeFileSync(ruta, JSON.stringify(data));
}

const leerDB = () =>{
    if(fs.existsSync(ruta)){
        const info = fs.readFileSync(ruta,{encoding: 'utf-8'});
        const data =  JSON.parse(info);

        return data;
    }else{
        return null;
    }
    
}

module.exports ={
    guardarDB,
    leerDB
}

