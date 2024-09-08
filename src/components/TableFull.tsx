import type { TableProps } from "@/types"

export default function TableFull(props: TableProps) {
    const { headers, data, isGlobalTable } = props;
    return (
        <div className="container mb-4 flex justify-center lg:justify-normal">
            <table className="bg-white border border-gray-200">
                <thead className="bg-gray-100 text-gray-600 uppercase leading-normal">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="py-2 px-2 text-center">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 font-light">
                    {data.map((row) => (
                        <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-2 px-2 text-center">{row.name}</td>
                            <td className="py-2 px-2 text-center">{row.points}</td>
                            <td className="py-2 px-2 text-center">{row.partial}</td>
                            <td className="py-2 px-2 text-center">{row.total}</td>
                            <td className="py-2 px-2 text-center">{row.fail}</td>
                            <td className="py-2 px-2 text-center">
                                {isGlobalTable ? (row.played / 14).toFixed() : row.played}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}