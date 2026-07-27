import { NextRequest, NextResponse } from 'next/server';

const API_URL = (
  process.env.KUSKA_API_URL ?? 'https://kuska-lixb.onrender.com'
).replace(/\/$/, '');

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.toString();
    const response = await fetch(`${API_URL}/incidents${query ? `?${query}` : ''}`, {
      cache: 'no-store',
      // Render puede tardar más de 20 s en el primer acceso después de estar inactivo.
      signal: AbortSignal.timeout(60_000),
    });
    const body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: { 'content-type': response.headers.get('content-type') ?? 'application/json' },
    });
  } catch (error) {
    console.error('No se pudo consultar FastAPI:', error);
    return NextResponse.json({ detail: 'Backend de Kuska no disponible' }, { status: 503 });
  }
}
