"use client";
import PanelSidebar from "./PanelSidebar";
// this component is rendered only when the user is authenticated
// session is handled in src/app/panel/page.tsx
export default function Panel({ session }: { session: any }) {
  return (
    <>
      <PanelSidebar session={session} />
    </>
  );
}
