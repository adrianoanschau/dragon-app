export const orderBy = (field: string, by: 'ASC' | 'DESC' = 'ASC') => (a: any, b: any) => {
    let res = 0;
    if (a[field] < b[field])
        res = -1;
    if (a[field] > b[field])
        res = 1;
    if (by === 'DESC') {
        res *= -1;
    }
    return res;
};
