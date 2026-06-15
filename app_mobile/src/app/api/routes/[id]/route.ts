import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import Product from "@/models/product";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id : string }> }) {
    try {
        await connectDB()
        const resolvedParams = await params
        const id = resolvedParams.id

        const products = await Product.findOne({id})

        return NextResponse.json({
            success: true,
            data: products
        }, { status: 200 })
    } catch (err) {
        console.log("Error fetching products:", err);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch products"
        }, { status: 500 })
    }
}