import { useRef, useEffect, useState } from 'react'
import { useRaf, useOnWindowResize } from 'rooks'

const random = (min, max) => Math.random() * (max - min) + min

class Particle {
  constructor(obj) {
    this.parent = obj.parent
    this.text = obj.text
    this.x = obj.x
    this.y = obj.y
    this.init()
  }

  init() {
    this.life = 1
    this.style = {
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      zIndex: -1
    }
    this.particle = document.createElement('div')
    this.particle.innerHTML = this.text
    Object.assign(this.particle.style, this.style)
    this.speedX = random(-10, 10)
    this.speedY = random(-3, -20)
    this.rotate = random(-30, 30)
    this.scale = random(1, 2.4)
    this.parent.appendChild(this.particle)
  }

  update() {
    this.life -= 0.01
    this.rotate *= 1.03
    this.speedX *= 0.99
    this.speedY += 0.6
    this.x += this.speedX
    this.y += this.speedY
    if (this.particle) {
      this.particle.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale}) rotate(${this.rotate}deg) `
      this.particle.style.opacity = this.life
    }

    if (this.life < 0) {
      this.parent.removeChild(this.particle)
    }
  }
}

const ParticleWrapper = () => {
  const Particles = []
  const $root = useRef()
  const bounds = useRef()
  const [click, setClick] = useState(false)

  const getBounds = () => {
    return $root.current.getBoundingClientRect()
  }

  useEffect(() => {
    // ???
  }, [click])

  useEffect(() => {
    bounds.current = getBounds()
  }, [])

  useOnWindowResize(() => {
    bounds.current = getBounds()
  })

  const createParticle = (e) => {
    const { left, top } = bounds.current
    const x = e.clientX || e.touches[0].clientX
    const y = e.clientY || e.touches[0].clientY
    Particles.push(
      new Particle({
        parent: $root.current,
        text: '🇺🇦',
        x: x - left,
        y: y - top
      })
    )
  }

  const handleMouseMove = (e) => {
    if (click) {
      createParticle(e)
    }
  }

  useRaf(() => {
    Particles.forEach((p, i) => {
      if (p.life > 0.1) {
        p.update()
      } else {
        Particles.splice(i, 1)
      }
    })
  }, true)

  return (
    <div
      ref={$root}
      onMouseDown={() => setClick(true)}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setClick(false)}
      className="Particle"
    />
  )
}

export default ParticleWrapper
