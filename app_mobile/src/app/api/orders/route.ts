import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDB';
import Order from '@/models/order';

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const newOrder = await Order.create(body);

        return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
    } catch (error) {
        console.error("Error saat insert pesanan:", error);
        return NextResponse.json({ success: false, error: 'Gagal membuat pesanan' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();

        const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ success: true, data: orders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ success: false, error: 'Gagal mengambil riwayat pesanan' }, { status: 500 });
    }
}