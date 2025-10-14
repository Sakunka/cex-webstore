import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { authenticate } from "@/lib/auth/middleware";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();

    const currentUser = await authenticate(request);

    if (currentUser._id.toString() !== id && currentUser.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Nemate dozvolu za ovu akciju" },
        { status: 403 }
      );
    }

    const {
      organization,
      contactNumber,
      address1,
      address2,
      country,
      townCity,
      postcode,
    } = await request.json();

    if (!contactNumber || !address1 || !country || !townCity || !postcode) {
      return NextResponse.json(
        { success: false, message: "Sva obavezna polja moraju biti popunjena" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        "shippingInfo.organization": organization?.trim() || "",
        "shippingInfo.contactNumber": contactNumber.trim(),
        "shippingInfo.address1": address1.trim(),
        "shippingInfo.address2": address2?.trim() || "",
        "shippingInfo.country": country.trim(),
        "shippingInfo.townCity": townCity.trim(),
        "shippingInfo.postcode": postcode.trim(),
      },
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Korisnik nije pronadjen" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Podaci za dostavu uspjesno azurirani",
      user: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Interna greska servera" },
      { status: 500 }
    );
  }
}
