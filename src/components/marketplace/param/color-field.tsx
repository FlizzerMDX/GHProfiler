import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import ComponantColorPicker from "../color-picker";
import { Param } from "@/types/modules";
import { Color } from "react-aria-components";
import { Dispatch, SetStateAction } from "react";

export const ColorField = ({param, params, setParams, color, setColor}: {param: Param, params: object, setParams: Dispatch<SetStateAction<object>>, color: Color | undefined, setColor: Dispatch<SetStateAction<Color | undefined>>}) =>{
    return(
        <Field onBlur={() => setParams({...params, [param.key] : color?.toString("hex").replace("#", "") || ""})}>
            <Label htmlFor={`${param.name}-1`} className="capitalize">{param.name}</Label>
            <ComponantColorPicker color={color} setColor={setColor}/>
        </Field>
    )
};