/**
 * Generate random id every time it called
 * @return random as id, example sgs86tp1zo
 * */
export const randomId = () => Math.random().toString(36).slice(2);
