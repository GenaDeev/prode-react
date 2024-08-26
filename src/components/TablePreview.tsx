import { Link } from 'react-router-dom';
import { table } from '@/data/table';

export default function TablePreview() {
    const sortedGlobalTable = table.global.slice().sort((a, b) => b.points - a.points);
    const sortedMatchDayTable = table.matchday.slice().sort((a, b) => b.points - a.points);

    return (
        <section className='mt-4'>
            <label className="block text-sm font-medium leading-6 text-gray-900">Tabla global (vista previa)</label>
            <div className="container mb-4">
                <table className="bg-white border border-gray-200">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-1 text-left">Nombre</th>
                            <th className="py-3 px-1 text-center">Pts</th>
                            <th className="py-3 px-1 text-center">Pa</th>
                            <th className="py-3 px-1 text-center">To</th>
                            <th className="py-3 px-1 text-center">Fa</th>
                            <th className="py-3 px-1 text-center">Fe</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {sortedGlobalTable.slice(0, 3).map((row) => (
                            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-1 text-center truncate max-w-20">{row.name}</td>
                                <td className="py-3 px-1 text-center">{row.points}</td>
                                <td className="py-3 px-1 text-center">{row.partial}</td>
                                <td className="py-3 px-1 text-center">{row.total}</td>
                                <td className="py-3 px-1 text-center">{row.fail}</td>
                                <td className="py-3 px-1 text-center">{(row.played / 14).toFixed()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/tabla" className="rounded-b-xl bg-white border border-gray-200 hover:bg-gray-100 text-blue-500 hover:underline flex justify-center w-full">Ver más</Link>
            </div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Tabla de la fecha (vista previa)</label>
            <div className="container">
                <table className="bg-white border border-gray-200">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-1 text-left">Nombre</th>
                            <th className="py-3 px-1 text-center">Pts</th>
                            <th className="py-3 px-1 text-center">Pa</th>
                            <th className="py-3 px-1 text-center">To</th>
                            <th className="py-3 px-1 text-center">Fa</th>
                            <th className="py-3 px-1 text-center">Ju</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {sortedMatchDayTable.slice(0, 3).map((row) => (
                            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-1 text-center truncate max-w-20">{row.name}</td>
                                <td className="py-3 px-1 text-center">{row.points}</td>
                                <td className="py-3 px-1 text-center">{row.partial}</td>
                                <td className="py-3 px-1 text-center">{row.total}</td>
                                <td className="py-3 px-1 text-center">{row.fail}</td>
                                <td className="py-3 px-1 text-center">{row.played}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/tabla" className="rounded-b-xl bg-white border border-gray-200 hover:bg-gray-100 text-blue-500 hover:underline flex justify-center w-full">Ver más</Link>
            </div>
        </section>
    );
}
