import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.HTMLAttributes<HTMLImageElement>["className"];
  style?: React.HTMLAttributes<HTMLImageElement>["style"];
  width?: number;
  height?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  if (!src) {
    src = "/imgs/placeholder.jpg";
  }

  const isExternal = src.startsWith("http");
  const isBlob = src.startsWith("blob:");
  const isData = src.startsWith("data:");

  // ✅ Si es una imagen externa, blob o base64 → dejarla tal cual.
  const imageSrc =
    isExternal || isBlob || isData ? src : `/products/${src}`;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
