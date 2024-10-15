import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { b_no } = await req.json();
  // const { business } = await req.json();

  try {
    const response = await fetch(
      `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.DATA_GO_API_SERVICE_KEY}`,
      // `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.DATAGO_API_SERVICE_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // body: JSON.stringify({
        //   businesses: business,
        // }),
        body: JSON.stringify({ b_no: [b_no] }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
