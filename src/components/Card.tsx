import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import CardModal from "./CardModal";

export default function Card({ title, description, imageUrl, }: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="flex flex-col max-w-sm rounded-lg border-1 min-h-80 overflow-hidden shadow-lg">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
        <div className="flex flex-col flex-1 p-4 gap-y-2">
          <div className="font-bold mb-2">{title}</div>
          <p className="text-gray-700 text-base flex-1">{description}</p>
          <Button onPress={onOpen} className="w-full mt-auto" color="secondary">View Property</Button>
        </div>
      </div>
      <CardModal
        title={title}
        description={description}
        imageUrl={imageUrl}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen} />
    </>
  );
}