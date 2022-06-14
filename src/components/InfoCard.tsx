import Image from 'next/image'

interface InfoCardProps {
  headerText: string
  description: string
  imageSrc: string
  imageAlt: string
}

export default function InfoCard({ headerText, description, imageSrc, imageAlt }: InfoCardProps) {
  return (
    <div className="relative flex flex-col">
      <div className="absolute z-0 w-full h-1/2 bg-gradient-to-b to-primary-light/10 from-primary-light -bottom-4 blur-2xl" />
      <div className="relative flex flex-col items-center justify-center p-4 text-center align-middle bg-white shadow-2xl rounded-xl">
        <div className="relative w-20 h-20">
          <Image src={imageSrc} alt={imageAlt} layout="fill" objectFit="contain" />
        </div>

        <h3 className="mt-4">{headerText}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
