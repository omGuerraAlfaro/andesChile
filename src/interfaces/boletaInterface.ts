export interface BoletaDetalle {
    id: number;
    apoderado_id: number;
    rut_estudiante: string;
    rut_apoderado: string;
    pago_id: null | number;
    estado_id: number;
    detalle: string;
    fecha_vencimiento: string;
    subtotal: string;
    iva: string;
    total: string;
    descuento: string;
    nota: string;
  }
  
  // Suponiendo que las boletas se devuelven en un objeto con claves dinámicas como 'estudiante1', 'estudiante2', etc.
  export interface IBoleta {
    boletas: {
      [key: string]: BoletaDetalle[];
    };
  }
  