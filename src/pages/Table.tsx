import { table } from '@/data/table';
import TableFullComponent from '@/components/TableFull';

export default function TableFull() {
    const sortedGlobalTable = table.global.slice().sort((a, b) => b.points - a.points);
    const sortedMatchDayTable = table.matchday.slice().sort((a, b) => b.points - a.points);

    return (
        <div>
        <h1 className='font-bold text-2xl mb-4'>Tablas de Posiciones</h1>
        <div className='flex flex-col lg:flex-row'>
          <section className='w-full mb-4 lg:mb-0 lg:w-1/2'>
            <label className="block text-xl font-medium leading-6 text-gray-900">Tabla global</label>
            <TableFullComponent
              headers={['Nombre', 'Pts', 'Pa', 'To', 'Fa', 'Fe']}
              data={sortedGlobalTable}
              isGlobalTable={true}
            />
          </section>
          <section className='w-full lg:w-1/2'>
            <label className="block text-xl font-medium leading-6 text-gray-900">Tabla de la fecha</label>
            <TableFullComponent
              headers={['Nombre', 'Pts', 'Pa', 'To', 'Fa', 'Ju']}
              data={sortedMatchDayTable}
              isGlobalTable={false}
            />
          </section>
        </div>
      </div>
    );
}
