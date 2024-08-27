import { Glow } from './glow'

/* eslint-disable @next/next/no-img-element */
export const ImageWithGlow = () => {
  return (
    <div className="relative">
      <img src="/images/ai-consolidation.png" alt="" />
      <Glow text="Balance" size={110} className="absolute -top-2 left-[38%]" />
      <Glow
        text="% Win"
        size={110}
        className="absolute left-[55%] top-7"
        classNameText="left-10 top-10"
      />

      <Glow
        text="PnL"
        size={80}
        className="absolute left-[40%] top-[84px]"
        classNameText="top-[26px] left-[30px]"
      />

      <Glow
        text="Risk"
        size={60}
        className="absolute left-[54%] top-[110px]"
        classNameText="top-[18px] left-[23px] text-[10px] leading-4"
      />

      <Glow
        text="ROI"
        size={100}
        className="absolute left-[47%] top-[150px]"
        classNameText="left-[42px] top-9"
      />
    </div>
  )
}
