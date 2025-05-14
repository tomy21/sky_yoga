import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectComponentProps {
    value: string | number;
    onChange: (value: string | number) => void;
    options: { label: string | number; value: string | number }[];
}

export function SelectComponent({ value, onChange, options }: SelectComponentProps) {
    return (
        <Select value={String(value)} onValueChange={(val) => onChange(val)}>
            <SelectTrigger className="">
                <SelectValue placeholder="Page" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={String(option.value)} value={String(option.value)}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
