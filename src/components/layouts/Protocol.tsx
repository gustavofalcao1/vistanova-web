import Image from "next/image";

interface ProtocolItemProps {
  protocol: {
    name: string;
    logo?: string;
  };
}

export default function ProtocolItem({ protocol }: ProtocolItemProps) {
  return (
    <div className="flex-shrink-0 w-48 h-24 mx-6 flex items-center justify-center bg-white rounded-lg shadow-sm">
      {protocol.logo ? (
        <Image 
          src={protocol.logo} 
          alt={protocol.name} 
          width={128}  // max-w-32 = 128px
          height={48}  // max-h-12 = 48px
          className="w-auto h-auto"
        />
      ) : (
        <span className="text-neutral-400 font-medium">{protocol.name}</span>
      )}
    </div>
  );
}
