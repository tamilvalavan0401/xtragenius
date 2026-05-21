

import SvgIcons from '@/components/SvgIcons'
import ReportsTable from '@/components/tables/ReportsTable'
import React, { useState } from 'react'

export const HelpSupportView = () => {

  return (
    <div className='p-4 md:p-6 container mx-auto'>
        <div className='px-[16px] py-[24px] bg-white rounded-[8px] w-full'>
            <div >
                <h1 className="text-[#272727] mb-[16px] font-[Plus Jakarta Sans] text-xl font-bold leading-[20px]">Help & Support</h1>
               <p className="text-[#272727] mb-[40px]  text-[14px] font-normal leading-[14px]  opacity-[0.8]">Find answers instantly or reach our support team 24/7 for quick assistance.</p>
            </div>

<div className='flex items-end gap-[8px] '>

                              <div>
                    <label htmlFor="" className="text-[#626C89]  text-[14px] font-normal mb-[8px]">Message</label>
                    <input className="flex h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch w-full md:w-[300px] lg:w-[500px] rounded-[4px] border border-[#EBEBEB] bg-white text-[#272727]  text-[14px] font-normal leading-[100%]" type="text" placeholder='Enter message here' name="" id="" />
                  </div>
                    <button className="inline-flex h-9 px-4 py-2 justify-center items-center gap-2 shrink-0 rounded bg-[#124CBE] text-white  text-[14px] font-medium leading-[15px]">
                   Send Message
                  </button>
</div>

        </div>

    </div>
  )
}

