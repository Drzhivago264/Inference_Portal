import { Variable } from '../../database/entities/Variable';
declare const _default: {
    createVariable: (newVariable: Variable) => Promise<Variable>;
    deleteVariable: (variableId: string) => Promise<any>;
    getAllVariables: () => Promise<Variable[]>;
    getVariableById: (variableId: string) => Promise<Variable | null>;
    updateVariable: (variable: Variable, updatedVariable: Variable) => Promise<Variable>;
};
export default _default;
