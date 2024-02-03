import Link from 'next/link';
import React, { MouseEventHandler } from 'react'

const Paginate = ({ limit, total, clickHandler }: { limit: number, total: number, clickHandler: MouseEventHandler<HTMLAnchorElement> }) => {
    const pages = Math.ceil(total / limit);
    const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

    return (
        <>
            {
                (total) > 0 && (pageNumbers.length > 0) &&
                (<div className='flex justify-center'>
                    {
                        pageNumbers.map(pageNumber => (
                            <Link
                                className='p-3 border border-slate-800 hover:bg-black hover:text-slate-200 focus:bg-black focus:text-slate-200'
                                href={`/?page=${pageNumber}&limit=${limit}`}
                                onClick={clickHandler}
                                key={pageNumber}
                            >{pageNumber}</Link>
                        ))
                    }
                </div>

                )
            }
        </>

    )
}

export default Paginate
