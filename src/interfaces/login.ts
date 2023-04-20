export interface LoginInterface {
    id_user: number,
    name_user: string,
    email_user: string,
    password: string,
    roles: [
        {
            id_role: number,
            description: string,
        }
    ],
    personas: {
        id_persona: number,
        nombres: string,
        apellidos: string,
        telefono: number,
        fecha_nacimiento: Date,
        rut: string,
        estado_civil: string,
        nacionalidad: string
        actividad: string,
        escolaridad: string,
        correo: string,
    }
}
