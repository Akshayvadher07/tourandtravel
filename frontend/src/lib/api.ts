export type TourCategory =
  | "adventure"
  | "cultural"
  | "relaxation"
  | "wildlife"
  | "city";

export type Tour = {
  _id: string;
  title: string;
  destination: string;
  description: string;
  durationDays: number;
  priceFrom: number;
  imageUrl: string;
  category: TourCategory;
  featured: boolean;
};

export type Destination = {
  _id: string;
  name: string;
  slug: string;
  blurb: string;
  imageUrl: string;
  href: string;
};

/** Matches backend `utils/apiResponse.js` success shape */
export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, unknown> & { timestamp?: string };
};

/** Matches backend error shape */
export type ApiFailure = {
  success: false;
  message: string;
  error: { code: string; message: string; details?: unknown };
  meta?: { timestamp?: string };
};

export function getApiBase(): string {
  let base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";
  if (base.endsWith("/api")) base = base.slice(0, -4);
  return base;
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function errorMessageFromBody(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const o = body as Record<string, unknown>;
  if (o.error && typeof o.error === "object") {
    const e = o.error as Record<string, unknown>;
    const code = typeof e.code === "string" ? e.code : "";
    const msg = typeof e.message === "string" ? e.message : fallback;
    return code ? `[${code}] ${msg}` : msg;
  }
  if (typeof o.message === "string") return o.message;
  return fallback;
}

function isTourNotFound(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const o = body as Record<string, unknown>;
  if (o.success !== false) return false;
  const err = o.error;
  if (!err || typeof err !== "object") return false;
  return (err as Record<string, unknown>).code === "TOUR_NOT_FOUND";
}

function wrongPortHint(status: number, base: string, path: string): string {
  if (status !== 404) return "";
  return ` Tried ${base}${path}. If the backend uses another PORT, set NEXT_PUBLIC_API_URL to match.`;
}

export async function fetchTours(params?: { featured?: boolean; page?: number; limit?: number }): Promise<Tour[]> {
  const base = getApiBase();
  const search = new URLSearchParams();
  if (params?.featured) search.set("featured", "true");
  if (params?.page != null) search.set("page", String(params.page));
  search.set("limit", String(params?.limit ?? 100));
  const q = search.toString() ? `?${search.toString()}` : "";
  const path = `/api/tours${q}`;
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
  } catch {
    throw new Error(`Could not reach the API at ${base}. Start the backend (npm run dev in backend/) and refresh.`);
  }

  const text = await res.text();
  const body = parseJson(text);

  if (!res.ok) {
    throw new Error(errorMessageFromBody(body, `Request failed (${res.status})`) + wrongPortHint(res.status, base, path));
  }

  if (!body || typeof body !== "object") throw new Error("Empty or invalid JSON from API");
  const o = body as Record<string, unknown>;
  if (o.success === false) {
    throw new Error(errorMessageFromBody(body, "Request failed"));
  }
  if (o.success !== true || !Array.isArray(o.data)) {
    throw new Error("Invalid API payload (expected { success: true, message, data: Tour[] })");
  }

  return o.data as Tour[];
}

export async function fetchTourById(id: string): Promise<Tour | null> {
  const base = getApiBase();
  const path = `/api/tours/${id}`;
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
  } catch {
    throw new Error(`Could not reach the API at ${base}. Start the backend (npm run dev in backend/) and refresh.`);
  }

  const text = await res.text();
  const body = parseJson(text);

  if (res.status === 404 && isTourNotFound(body)) {
    return null;
  }

  if (!res.ok) {
    throw new Error(errorMessageFromBody(body, `Request failed (${res.status})`) + wrongPortHint(res.status, base, path));
  }

  if (!body || typeof body !== "object") throw new Error("Empty or invalid JSON from API");
  const o = body as Record<string, unknown>;
  if (o.success === false) {
    throw new Error(errorMessageFromBody(body, "Request failed"));
  }
  if (o.success !== true || o.data === null || typeof o.data !== "object") {
    throw new Error("Invalid API payload (expected { success: true, message, data: Tour })");
  }

  return o.data as Tour;
}

export async function fetchDestinations(): Promise<Destination[]> {
  const base = getApiBase();
  const path = "/api/destinations";
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
  } catch {
    throw new Error(`Could not reach the API at ${base}. Start the backend (npm run dev in backend/) and refresh.`);
  }

  const text = await res.text();
  const body = parseJson(text);

  if (!res.ok) {
    throw new Error(errorMessageFromBody(body, `Request failed (${res.status})`) + wrongPortHint(res.status, base, path));
  }

  if (!body || typeof body !== "object") throw new Error("Empty or invalid JSON from API");
  const o = body as Record<string, unknown>;
  if (o.success === false) {
    throw new Error(errorMessageFromBody(body, "Request failed"));
  }
  if (o.success !== true || !Array.isArray(o.data)) {
    throw new Error("Invalid API payload (expected { success: true, message, data: Destination[] })");
  }

  return o.data as Destination[];
}

export type TravelPlanPayload = {
  fullName: string;
  email: string;
  phone?: string;
  destinations?: string[];
  travelDates?: string;
  adults?: number;
  children?: number;
  message?: string;
};

/** Saves a travel-plan request to MongoDB via POST /api/travel-plans (client-side fetch). */
export async function submitTravelPlan(payload: TravelPlanPayload): Promise<{ id: string }> {
  const base = getApiBase();
  const path = "/api/travel-plans";
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(`Could not reach the API at ${base}. Start the backend and try again.`);
  }

  const text = await res.text();
  const body = parseJson(text);

  if (!res.ok) {
    throw new Error(errorMessageFromBody(body, `Request failed (${res.status})`) + wrongPortHint(res.status, base, path));
  }

  if (!body || typeof body !== "object") throw new Error("Empty or invalid JSON from API");
  const o = body as Record<string, unknown>;
  if (o.success === false) {
    throw new Error(errorMessageFromBody(body, "Request failed"));
  }
  if (o.success !== true || o.data === null || typeof o.data !== "object") {
    throw new Error("Invalid API payload");
  }
  const data = o.data as Record<string, unknown>;
  const id = typeof data.id === "string" ? data.id : "";
  if (!id) throw new Error("API did not return a travel plan id");
  return { id };
}
