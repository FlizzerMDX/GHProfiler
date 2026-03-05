import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Param } from "@/types/modules";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";

export const StringField = ({param, stringValue, setStringValue}: {param: Param, stringValue: string, setStringValue: Dispatch<SetStateAction<string>>}) =>{
    return(
        <Field>
            <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
            <Input
            id={`${param.name}-1`} 
            name={`${param.name}`}
            value={stringValue}
            onChange={(e) => setStringValue(e.target.value)} />
        </Field>
    )
};