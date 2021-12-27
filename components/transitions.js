import React from 'react'
import { gsap } from 'gsap'

export function PageTransition({children, direction = 'down'}) {
  const ref     = React.useRef(null)
  const classes = direction === 'down' ? '-translate-y-5' : 'translate-y-5'

  React.useEffect(() => {
    gsap.to(ref.current, {
      duration: .2,
      y: 0,
      ease: 'easeOut.power2',
      autoAlpha: 1,
      delay: .15
    })
  })

  return (
    <div ref={ref} className={`opacity-0 invisible ${classes}`}>
      {children}
    </div>
  )
}