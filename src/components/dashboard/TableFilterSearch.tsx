import { Input } from "../ui/input"

interface TableFilterSearchProps {
    table: any;
    searchKey: string;
}

export const TableFilterSearch = ({table, searchKey}: TableFilterSearchProps) => {
    return (
        <div className="flex items-center">
            <Input
                placeholder={`Filter ${searchKey}...`}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
        </div>
    )
}
