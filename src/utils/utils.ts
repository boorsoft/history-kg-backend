export const searchTransformForPrisma = (searchValue: string) =>
    searchValue.replace(/[\s\n\t]/g, '&');
