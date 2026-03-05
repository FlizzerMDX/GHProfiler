import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Param } from "@/types/modules";
import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SelectField = ({param, setSelectValue}: {param: Param, setSelectValue: Dispatch<SetStateAction<string | undefined>>}) =>{
    return(
        <Field>
            <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
            <Select onValueChange={(e) => setSelectValue(e)}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder={`Select a ${param.name}`} />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectGroup>
                    <SelectLabel>{param.name}</SelectLabel>
                    {
                        param.options?.map((option) => <SelectItem key={option.key} value={option.key}>{option.name}</SelectItem>)
                    }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
    )
};