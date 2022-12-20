export function MapKeyValueDictToType<T>(
  dict: Record<number | string, T>
): T[] {
  return Object.keys(dict).map<T>((key) => {
    const vKey: number | string = isNaN(+key) ? key : +key;
    return {
      id: vKey,
      ...dict[vKey],
    };
  });
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as T;
}
