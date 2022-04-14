export interface User {
    email: string,
    password: string
}

export interface Employee {
    id: number | null;
    fio: string;
    timesheet_id: number | null;
    position: string;
    date_employment: Date | null;
    birth: Date | null;
    age: number | null;
    note: string;
}