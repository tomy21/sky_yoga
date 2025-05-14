// components/IconSelect.tsx
import { useState } from "react";
import * as Icons from "@/icons"; // dari file index icon kamu

type IconKey = keyof typeof Icons;

interface IconSelectProps {
    value: IconKey;
    onChange: (value: IconKey) => void;
}

export default function IconSelect({ value, onChange }: IconSelectProps) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const iconKeys = Object.keys(Icons) as IconKey[];
    const filteredIcons = iconKeys.filter((key) =>
        key.toLowerCase().includes(search.toLowerCase())
    );

    const SelectedIcon = Icons[value];

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded border px-3 py-2 text-left"
            >
                <div className="flex items-center space-x-2">
                    {SelectedIcon && <SelectedIcon className="h-7 w-7" />}
                    <span>{value}</span>
                </div>
                <span className="text-gray-500">▾</span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded border bg-white shadow-md">
                    <input
                        type="text"
                        placeholder="Search icon..."
                        className="w-full border-b px-3 py-2 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ul className="max-h-48 overflow-y-auto">
                        {filteredIcons.map((key) => {
                            const Icon = Icons[key];
                            return (
                                <li
                                    key={key}
                                    className="flex cursor-pointer items-center space-x-2 px-3 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        onChange(key);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Icon className="h-7 w-7" />
                                    <span>{key}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
