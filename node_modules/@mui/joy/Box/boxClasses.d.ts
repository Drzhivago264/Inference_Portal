export interface BoxClasses {
    /** Class name applied to the root element. */
    root: string;
}
export type BoxClassKey = keyof BoxClasses;
declare const boxClasses: BoxClasses;
export default boxClasses;
