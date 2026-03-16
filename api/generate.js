export default async function handler(req, res) {
  // Configurar cabeceras para permitir que tu web de GitHub lea la respuesta
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { prompt, image } = JSON.parse(req.body);

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token R8_Zns7pcZVRdnsTnxfINhEkgVGqZpC3jn1fuyh8`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "luma/dream-machine",
        input: { prompt, image }
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
