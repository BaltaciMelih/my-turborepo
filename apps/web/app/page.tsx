import dynamic from "next/dynamic";

const RemoteTitle = dynamic(
  () => {
    return import("../../docs/components/exposedTitle");
  },
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <RemoteTitle></RemoteTitle>
    </>
  );
}
