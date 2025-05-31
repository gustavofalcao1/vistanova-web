import Image from "next/image";

interface ProtocolItemProps {
  protocol: {
    name: string;
    logo?: string;
  };
}

export default function ProtocolItem({ protocol }: ProtocolItemProps) {
  return (
    <div className="flex-shrink-0 w-48 h-24 mx-6 flex items-center justify-center bg-white rounded-lg shadow-sm p-4">
      {protocol.logo ? (
        <div className="relative w-full h-full max-w-[128px] max-h-12">
          <Image 
            src={protocol.logo} 
            alt={protocol.name} 
            fill
            sizes="(max-width: 768px) 100vw, 128px"
            className="object-contain w-auto h-auto"
            priority={false}
          />
        </div>
      ) : (
        <span className="text-neutral-400 font-medium text-center">{protocol.name}</span>
      )}
    </div>
  );
}
