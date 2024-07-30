"use client"

import { ChangeEvent, useState } from "react"
import CircleProgress from "./circle-progress";

function CircleProgressBar() {
  const [percentage, setPercentage] = useState<number>(50)

  const updatePercentage = (event: ChangeEvent<HTMLInputElement>) => {
    setPercentage(Number(event.target.value));
  };

  return (
    <div>
      <CircleProgress percentage={percentage} circleSize={200} />
      <input type="range" min="0" max="100" step="1" value={percentage} onChange={updatePercentage}/>
    </div>
  )
}
export default CircleProgressBar