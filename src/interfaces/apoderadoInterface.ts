import { BoletaDetalle } from "./boletaInterface";

export interface IApoderado {
    id: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: Date;
    rut: string;
    dv: string;
    telefono: string;
    correo_electronico: string;
    estado_civil: string;
    nacionalidad: string;
    actividad: string;
    escolaridad: string;
    descuento_asignado: number;
    estudiantes: IEstudiante[];
}


export interface IEstudiante {
    id: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    fecha_nacimiento: Date;
    rut: string;
    dv: string;
    telefono_contacto: string;
    genero: string;
    alergico: string;
    vive_con: string;
    enfermedad_cronica: string;
    apoderado_id: number;
    curso_id: number;
    apoderado: IApoderado;
    curso: ICurso[];
}

export interface ICurso {
    id: number;
    nombre: string;
    nivel_grado: string;
    descripcion: string;
}

export interface EstudianteConBoletas {
    estudiante: IEstudiante;
    boletas: BoletaDetalle[];
}
