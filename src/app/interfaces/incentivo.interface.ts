export interface ResponseIncentivoInterface {
  id:              number;
  cadenaComercial: string;
  region:          string;
  marca:           string;
  modelo:          string;
  color:           string;
  cantidad:        number;
  tipoDeProducto:  string;
  vigenciaInicio:  Date;
  vigenciaFin:     Date;
  nota:            string;
  regionEntity:    RegionEntity;
}

export interface RegionEntity {
  id:     number;
  nombre: string;
}
