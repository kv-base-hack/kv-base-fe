import { Glow } from './glow'

/* eslint-disable @next/next/no-img-element */
export const ImageWithGlow = () => {
  return (
    <div className="relative">
      <img src="/images/ai-consolidation.png" alt="" />
      <Glow
        text="Balance"
        size={110}
        className="absolute -top-2 left-[38%] h-[110px] w-[110px]"
      />
      <Glow
        text="% Win"
        size={110}
        className="absolute left-[55%] top-7 h-[110px] w-[110px]"
        classNameText="left-9 top-10"
      />

      <Glow
        text="PnL"
        size={80}
        className="absolute left-[40%] top-[84px] h-20 w-20"
        classNameText="top-[26px] left-[30px]"
      />

      <Glow
        text="Risk"
        size={60}
        className="absolute left-[54%] top-[110px] h-[60px] w-[60px]"
        classNameText="top-[18px] left-[21px] text-[10px] leading-4"
      />

      <Glow
        text="ROI"
        size={100}
        className="absolute left-[47%] top-[150px] h-[100px] w-[100px]"
        classNameText="left-[42px] top-9"
      />
    </div>
  )
}
