export interface Transaction {
  id: number;
  amount: number;
  timestamp: string;
  type: string;
  accountNumber: string;
  accountId: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
