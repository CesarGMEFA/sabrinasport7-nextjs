import Link from 'next/link';
import { Button } from "@/components/ui/button";
import WhatsAppIcon from '../../icons/WhatsAppIcon';

interface WhatsAppButtonProps {
  url: string;
  text: string;
  buttonClass?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ url, text, buttonClass }) => (
  <Link href={url} target='_blank'>
    <Button className={`bg-whatsapp ${buttonClass}`}>
      <WhatsAppIcon />
      <p className="ml-2">{text}</p>
    </Button>
  </Link>
);
