export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message: string;
}

export interface PageResponse<T>{
    pageNumber: number;
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
    content: T;
}