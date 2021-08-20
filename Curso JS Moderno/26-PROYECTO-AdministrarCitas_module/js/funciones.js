import Citas from './clases/Citas.js';
import UI from './clases/UI.js';
import { mascotaInput, 
        propietarioInput, 
        telefonoInput, 
        fechaInput, 
        horaInput, 
        sintomasInput,
        formulario 
 } from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando = false;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}


// Valida y agrega una nueva cita a la clase de citas

export function nuevaCita(e) {
    e.preventDefault();

    //Extraer la información del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // validar
    if( mascota === '' || propietario === '' || telefono === ''  || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    
    if(editando) {
        ui.imprimirAlerta('Editado correctamente');

        // Pasar el objeto de la cita a edición
        administrarCitas.editarCita({...citaObj});
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;
    } else {
    //generar id unico
    citaObj.id = Date.now();
    // Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});
    
    // Mensaje de agregado correctamente
    ui.imprimirAlerta('Se agrego correctamente');
    
    }
    //Reiniciar el objeto para la validación  
    reiniciarObjeto();
    
    //Reinciciar el formulario
    formulario.reset();

    // Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
    
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    // Muestrar mensaje

    ui.imprimirAlerta('La cita se elmino correctamente');

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // LLenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // LLenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

    nuevaCita();
}