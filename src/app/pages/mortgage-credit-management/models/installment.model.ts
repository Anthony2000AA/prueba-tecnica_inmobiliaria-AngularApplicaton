export interface Installment {
    id: number;
    mortgageCreditId: number;
    amount: number;
    paid: boolean;
    paymentDate: string;
    archivePath: string;
}