export interface EventData {
  id: string | number;
  nome: string;
  eventDate: Date;
  price: number;
  eventCapacity: number;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  emailInscritos?: string[];
}
