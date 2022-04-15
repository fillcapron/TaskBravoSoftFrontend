import { GridValueGetterParams } from "@mui/x-data-grid";

export function getDate(params: GridValueGetterParams): Date {
    return new Date(params.value);
}

export function getAge(params: GridValueGetterParams): number {
    const today = new Date();
    const birthDate = new Date(params.row.birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}