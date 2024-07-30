import { cn } from "@/util/cn.util";
import { motion, Variants } from "framer-motion";

export interface CircleProgressProps{
  percentage: number
  circleSize: number
}

export function CircleProgress({ percentage, circleSize }:CircleProgressProps) {
  const radius = 85
  
  const indicator = percentage >= 80 ? "strongBuy" 
                  : percentage >= 60 ? "buy"
                  : percentage >= 40 ? "neutral"
                  : percentage >= 20 ? "sell"
                  : "strongSell"

  const indicatorClassName = {
    strongSell: "text-rose-600",
    sell: "text-orange-600",
    neutral: "text-amber-400",
    buy: "text-teal-400",
    strongBuy: "text-emerald-700"
  }
  return (
    <div className="relative flex justify-center items-center">
      <motion.svg 
        key={percentage}
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx={circleSize/2}
          cy={circleSize/2}
          r={radius}
          className="stroke-[1rem] text-transparent stroke-current fill-none"
        />
        <motion.circle
          cx={circleSize/2}
          cy={circleSize/2}
          r={radius}
          className={ cn("stroke-[1rem] text-red-600 stroke-current fill-none", indicatorClassName[indicator] ) }
          variants={draw}
          custom={percentage}
          transform={`rotate(180 ${circleSize/2} ${circleSize/2})`}
        />
      </motion.svg>
      <p className="absolute text-3xl">
        {percentage}%
      </p>
    </div>
  )
}

export default CircleProgress

const draw:Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (percentage: number) => {
    const delay = 1
    return {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      pathLength: percentage/200,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};