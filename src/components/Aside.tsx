import MatchDaySelector from '@/components/MatchDaySelector';
import TablePreview from '@/components/TablePreview';
import type { Context } from '@/types/main';
import { useLocation } from 'react-router-dom';
interface AsideProps {
    context: Context;
    isOpen: boolean;
}

export default function Aside({ context, isOpen }: AsideProps) {
    const { pathname } = useLocation();
    return (
        <aside className={`fixed pt-[80px] left-0 z-40 transition-transform lg:translate-x-0 transform ${isOpen ? '-translate-x-full' : 'translate-x-0'} bg-gray-100 p-4 w-64 h-full`}>
            <section>
                <MatchDaySelector context={context} />
            </section>
            {pathname !== "/table" &&
                <>
                    <TablePreview />
                </>
            }
        </aside>
    );
}
