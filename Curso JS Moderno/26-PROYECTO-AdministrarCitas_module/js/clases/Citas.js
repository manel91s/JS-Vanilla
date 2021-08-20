class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualitzada) {
        this.citas = this.citas.map(cita => cita.id === citaActualitzada.id ? citaActualitzada : cita );
    }
}

export default Citas;