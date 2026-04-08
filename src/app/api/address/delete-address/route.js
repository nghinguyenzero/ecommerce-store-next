import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Address ID is required",
      });
    }

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const addressToDelete = await Address.findById(id);
      if (!addressToDelete || addressToDelete.userID.toString() !== isAuthUser.id) {
        return NextResponse.json({
          success: false,
          message: "You are not authorized to delete this address",
        });
      }
      const deletedAddress = await Address.findByIdAndDelete(id);

      if (deletedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address is deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to delete address ! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}