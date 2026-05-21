import { Plus, Send, Download, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SvgIcons from "@/components/SvgIcons"

export default function BalanceCard() {
  return (
    <div className="bg-white p-4 rounded-[8px]">
      <div>
        <div className="text-[#737373] mb-[8px]  text-[14px] font-normal leading-[14px]">Balance</div>
      </div>
      <div className="">
        {/* Balance Amount */}
        <div className="self-stretch text-[#272727]  text-[32px] font-bold leading-[32px] mb-[24px]">₹32,100</div>

        {/* Action Buttons */}
        <div className="">
          <Button className="w-full py-[8px] mb-[8px] bg-[#124CBE] hover:bg-[#002f8b] text-white  text-[14px] font-medium leading-[15px] ">
            <Plus className="h-5 w-4 mr-2" />
            Add
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 text-[#272727]  text-[14px] font-medium leading-[15px] 
flex px-4 py-2 justify-center items-center gap-2 
rounded border border-[#EBEBEB] bg-white">
              <SvgIcons.DashboardSend/>
              Send
            </Button>
            <Button variant="outline" className="flex-1 text-[#272727]  text-[14px] font-medium leading-[15px] 
flex px-4 py-2 justify-center items-center gap-2 
rounded border border-[#EBEBEB] bg-white">
              <SvgIcons.DashboardRequest/>
              Request
            </Button>
            <Button variant="outline" size="icon">
              <SvgIcons.DashboardThreeDots/>
            </Button>
          </div>
        </div>

  
        <div className="relative mt-6">
          <div className="rounded-lg [background:radial-gradient(359.65%_135.28%_at_2.06%_97.46%,#284292_9.24%,#124CBE_47.54%,#033CAC_63.83%,#0E4C9D_76.13%,#376FF7_100%)] h-[177px] p-4 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="">
                <SvgIcons.Chip/>
              </div>
              <span className="font-semibold">PayQwick Card</span>
            </div>

            <div className="space-y-2">
              <p className="text-sm opacity-90">John Doe</p>
              <p className="font-mono text-lg">•••• •••• •••• 3560</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

