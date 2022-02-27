import dynamic from 'next/dynamic'

const NoSsrParticle = dynamic(() => import('./Particle'), { ssr: false })

const wrapper = () => <NoSsrParticle />

export default wrapper
