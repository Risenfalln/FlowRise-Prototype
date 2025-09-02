import Card from "../../components/ui/Card";

export default function Library({ theme }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <h2 className="text-xl font-semibold">Library</h2>
      <Card theme={theme}>
        <div className="font-medium">Favourites & Materials</div>
        <div className="text-sm opacity-80">Stub: manage saved task presets, materials, and rule snippets.</div>
      </Card>
    </div>
  );
}
