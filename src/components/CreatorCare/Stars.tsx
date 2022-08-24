/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random'

export default function StarsBG() {
	return (
		<Canvas camera={{ position: [0, 0, 1] }} className="absolute inset-0 w-full h-full">
			<Stars />
		</Canvas>
	)
}

function Stars() {
	const ref = useRef<any>()
	const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
	useFrame((state, delta) => {
		if (ref.current != null) {
			ref.current.rotation.x -= delta / 10
			ref.current.rotation.y -= delta / 15
		}
	})

	return (
		<group rotation={[0, 0, Math.PI / 4]}>
			{/*// @ts-ignore*/}
			<Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
				<PointMaterial
					transparent
					color="#ffffff"
					size={0.005}
					sizeAttenuation={true}
					depthWrite={false}
				/>
			</Points>
		</group>
	)
}
