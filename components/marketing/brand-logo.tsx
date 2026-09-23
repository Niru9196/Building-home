import Image from "next/image";

interface BrandLogoProps {
  priority?: boolean;
}

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/propsoch-logo.svg"
      alt="Propsoch"
      width={184}
      height={43}
      preload={priority}
      className="brand-logo"
    />
  );
}
