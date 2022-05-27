export const EMPLOYEE_MESSAGES = {
    NOT_FOUND: (cpf: string): string => `Employee with CPF ${cpf} was not found`,
}

export const COMPANY_MESSAGES = {
    NOT_FOUND: (cnpj: string): string => `Company with CNPJ ${cnpj} was not found`,
    NOT_FOUND_WORK_RELATION: (employeeCPF: string, companyCNPJ: string) => {
        return `No work relation between employee with CPF ${employeeCPF} and company with CNPJ ${companyCNPJ} was found`
    },
}