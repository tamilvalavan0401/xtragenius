import SvgIcons from '@/components/SvgIcons'
import PaymentsTable from '@/components/tables/PaymentsTable'
import React from 'react'


export const PaymentsView = () => {
  return (
    <div className='p-4 md:p-6 '>
        <div className='px-[16px] py-[24px] bg-white rounded-[8px] w-full'>
            <div >
                <h1 className="text-[#272727] mb-[16px] font-[Plus Jakarta Sans] text-xl font-bold leading-[20px]">Payments</h1>
               <p className="text-[#272727]  text-[14px] font-normal leading-[14px]  opacity-[0.8]">Track all customer payments in real time – from initiation to settlement.</p>
            </div>



        </div>
<div className='mt-[12px]'>
            <PaymentsTable/>

</div>

    </div>
  )
}

