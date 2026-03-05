import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Param } from "@/types/modules";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";

export const NumberField = ({param, number, setNumber}: {param: Param, number: number, setNumber: Dispatch<SetStateAction<number>>}) =>{
    return(
        <Field>
            <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
            <Input 
            id={`${param.name}-1`} 
            name={`${param.name}`}
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))} />
        </Field>
    )
};