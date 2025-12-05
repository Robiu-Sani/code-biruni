export interface ITargetClient  {
  name: string;
  numbers: string[];
  address?: string;
  email?: string;
  isContacted: boolean;
  isResponsed: boolean;
  isConfirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}