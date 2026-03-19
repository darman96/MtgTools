export interface SearchCardResponse {
  name: string;
  manaCost?: string | null;
  typeLine?: string | null;
  oracleText?: string | null;
  imageUri?: string | null;
}

export async function searchCard(query: string, timeoutMs = 8000): Promise<SearchCardResponse> {
  // If running inside Photino, use the bridge to call the backend handler.
  try {
    if (typeof window !== "undefined" && (window as any).photino?.sendQuery) {
      // Backend expects camelCase payload (serializer configured with CamelCase)
      const resp = await (window as any).photino.sendQuery("search.card", { query }, timeoutMs);
      return resp as SearchCardResponse;
    }
  } catch (err) {
    // If Photino call fails, fall through to fallback below
    console.warn("searchCard: photino query failed, falling back to Scryfall REST", err);
  }

  // Fallback for browser/dev: query Scryfall directly
  const esc = encodeURIComponent(query);
  const url = `https://api.scryfall.com/cards/named?fuzzy=${esc}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Scryfall request failed: ${res.status}`);
  const data = await res.json();

  const name: string = data.name ?? "";
  const manaCost: string | null = data.mana_cost ?? null;
  const typeLine: string | null = data.type_line ?? null;
  const oracleText: string | null = data.oracle_text ?? null;

  let imageUri: string | null = null;
  if (data.image_uris && typeof data.image_uris === "object") {
    imageUri = data.image_uris.normal ?? data.image_uris.small ?? null;
  } else if (Array.isArray(data.card_faces) && data.card_faces.length > 0) {
    const face = data.card_faces[0];
    imageUri = face?.image_uris?.normal ?? face?.image_uris?.small ?? null;
  }

  return { name, manaCost, typeLine, oracleText, imageUri };
}




