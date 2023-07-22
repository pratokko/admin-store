import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
  ) {
    try {
      if (!params.billboardId) {
        return new NextResponse("billboardId is required", { status: 500 });
      }
  
      const billboard = await prismadb.billboard.findUnique({
        where: {
          id: params.billboardId,
        },
      });
  
      return NextResponse.json(billboard);
    } catch (error) {
      console.log("[BILLBOARD_GET]", error);
      return new NextResponse("internal server error", { status: 500 });
    }
  }

// UPDATE

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("label field is required", { status: 500 });
    }

    if (!imageUrl) {
      return new NextResponse("imageUrl field is required", { status: 500 });
    }

    if (!params.billboardId) {
      return new NextResponse("billboardId is required", { status: 500 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },

      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}



// DELETE 

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("billboardId is required", { status: 500 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
