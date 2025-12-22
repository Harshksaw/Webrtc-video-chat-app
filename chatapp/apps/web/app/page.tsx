import Image, { type ImageProps } from "next/image";

import { SocketProvider } from "../context/SocketContext";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};



export default function Home() {
  return (
    <SocketProvider>
      <div>Home</div>

    </SocketProvider>
  );
}
