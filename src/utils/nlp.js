export function parseTaskFromText(input) {
  const raw = String(input || "").trim().toLowerCase();
  const id = Date.now() + Math.floor(Math.random() * 1000);

  const area = raw.match(/^(deck|decking|slab|tiles?)\s+(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)(?:\s*@\s*(\d+))?/);
  if (area) {
    const name = area[1] === "deck" ? "Decking" : area[1];
    return {
      id, name, type: "area", confirmed: true,
      attrs: { length_m: Number(area[2]), width_m: Number(area[3]), centres_mm: area[4] ? Number(area[4]) : "" },
      provenance: { source: "voice", transcript: input }
    };
  }

  const linear = raw.match(/^(fence|handrail|balustrade)\s+(\d+(?:\.\d+)?)m/);
  if (linear) {
    return {
      id, name: linear[1], type: "linear", confirmed: true,
      attrs: { length_m: Number(linear[2]) },
      provenance: { source: "voice", transcript: input }
    };
  }

  const count = raw.match(/^(posts?|stumps?|piers?)\s+(?:qty\s*)?(\d+)(?:\s*x\s*(\d+(?:\.\d+)?))?/);
  if (count) {
    const attrs = { qty: Number(count[2]) }; if (count[3]) attrs.length_m = Number(count[3]);
    return { id, name: count[1], type: "count", confirmed: true, attrs, provenance: { source: "voice", transcript: input } };
  }

  return {
    id, name: raw.split(/\s+/)[0] || "Custom", type: "custom", confirmed: true,
    attrs: { note: raw }, provenance: { source: "voice", transcript: input }
  };
}
