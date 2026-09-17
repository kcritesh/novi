import Image from "next/image";

import heroSky from "@/assets/hero-sky.jpeg";

export function SkyImage() {
  return (
    <Image
      src={heroSky}
      alt=""
      fill
      priority
      sizes="100vw"
      placeholder="blur"
      className="object-cover object-[50%_35%]"
    />
  );
}
