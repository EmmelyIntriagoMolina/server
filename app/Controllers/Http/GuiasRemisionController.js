'use strict'

const Database = use('Database')
const moment = require('moment')

class GuiasRemisionController {

    //Ingresar
    async ingresarGuiaRemision({request, params, response}){
        try{

            let codigo=request.input('codigo').toUpperCase();
            let horaingreso=request.input('horaingreso');
            let placa=request.input('placa').toUpperCase();
            let chofer=request.input('chofer').toUpperCase();
            let peso=request.input('peso');
            let gavetas=request.input('gavetas');
            let id_OT = request.input('id_OT')
            let estado = 1;

            const guiaremision = await Database.raw("select codigo, horaingreso, placa chofer, peso, gavetas, id_OT from guiasremision where codigo='"+codigo+"'");

            if (existe[0].length >=1){

                return response.status(200).send({message: 'La guía de remisión que intenta ingresar ya existe'});
            }
            else {

                const guiaremision = await Database.raw("insert into guiasremision (codigo, horaingreso, placa, chofer, peso, gavetas, id_OT, estado) values ('"+codigo+"','"+horaingreso+"', '"+placa+"', '"+chofer+"', '"+peso+"', '"+gavetas+"', '"+id_OT+"', '"+estado+"')");
                return response.status(200).send({message: 'Se ha registrado la guía de remisión correctamente', guiaremision:guiaremision[0]});
            
            }

        }
        catch(error) {
            console.log("No añadido", error)
        }
    }

    //Consultar

    async consultarGuiasRemision({request, params, response}){

        try{

            const guiaremision = await Database.raw("select id, codigo, horaingreso, placa, chofer, peso, gavetas,muestra, estado from guiasremision where estado=1 order by 1 desc;");
            return response.status(200).send({guiaremision:guiaremision[0]});

        }
        catch (error) {
            console.log(error)

        }
    }

    // Consultar por ID 
    async consultarGuiaRemisionIdd({request, params, response}){

        try {

            const {guiaremisionId} = request.params;
            const guiaremision = await Database.raw("select id, codigo, horaingreso, placa, chofer, peso, gavetas, muestra, estado, id_OT from guiasremision where id='"+guiaremisionId+"' and estado=1 order by 1 desc;");
            return response.status(200).send({guiaremision:guiaremision[0]});
            
        } catch (error) {
             
            console.log(error)
            
        }
    }


    //Consultar por id_OT

    async consultarGuiaRemisionId({request, params, response}){

        try {

            const {guiaremisionId} = request.params;
            const guiaremision = await Database.raw("select id, codigo, horaingreso, placa, chofer, peso, gavetas, muestra, estado, id_OT from guiasremision where id_OT='"+guiaremisionId+"' and estado=1 order by 1 desc;");
            return response.status(200).send({guiaremision:guiaremision[0]});
            
        } catch (error) {
             
            console.log(error)
            
        }
    }

    //Actualizar

    async actualizarGuiaRemision({request, params, response}){

        try {

            const {guiaremisionId} = request.params
            let codigo=request.input('codigo').toUpperCase();
            let horaingreso=request.input('horaingreso').toUpperCase();
            let placa=request.input('placa').toUpperCase();
            let chofer=request.input('chofer').toUpperCase();
            let peso=request.input('peso').toUpperCase();
            let gavetas=request.input('gavetas').toUpperCase();
            
            const guiaremision = await Database.raw("update guiasremision set codigo='"+cdigo+"', horaingreso='"+horaingreso+"', placa='"+placa+"', chofer='"+chofer+"', peso='"+peso+"', gavetas='"+gavetas+"' where codigo='"+guiaremisionId+"'");
            return response.status(200).send({message: 'Guia de remisión '+codigo+ ' actualizada correctamente', guiaremision:guiaremision[0]});

        } catch (error) {

            console.log("Guía de remisión no actualizada", error)
            
        }
    }

    //Eliminar

    async eliminarGuiaRemision({request, params, response}){

        try {

            let estado = 0;
            const {guiaremisionId} = request.params;
            const guiaremision = await Database.raw("update guiasremision set estado='"+estado+"' where id='"+guiaremisionId+"';");
            return response.status(200).send({message:"Guía de remisión ha sido eliminada correctamente"})
            
        } catch (error) {

            console.log("No se ha podido elimiar la guía de remisión ", error)
            
        }
    }
}

module.exports = GuiasRemisionController;