import { createServerSupabaseClient } from "@/utils/supabase/createServerSupabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    // Simple query that will keep the connection alive
    await supabase.from("goals").select("count(*)", { count: "exact" });

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Keep-alive ping failed:", error);
    return NextResponse.json(
      { status: "error", error: String(error) },
      { status: 500 }
    );
  }
}
