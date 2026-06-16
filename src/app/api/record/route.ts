import type { INewRecord, IRecord } from "@/src/lib/module/record";
import Record from "@/src/lib/module/record/model";
import { NextRequest, NextResponse } from "next/server";
import { escapeRegex } from '@/src/utils/regex';
import { IAuthorizedRequst, authMiddleware } from "@/src/lib/authentication/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body as INewRecord;
        const existingRecord = await Record.findOne({ year: data.year, month: data.month })
        if (existingRecord) {
            return NextResponse.json({ code: 400, message: 'ردیف قبلاً ثبت شده‌است!', existingRecord }, { status: 400 });
        }

        const record = await Record.create(data);
        await record.populate(['location']);
        return NextResponse.json({ code: 200, message: '', record }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const res = authMiddleware(req);
        if (res.status !== 200) {
            return res;
        }

        const searchParams = req.nextUrl.searchParams;
        const { limit = '0', skip = '0', sort = '{ "createdAt": -1 }', ...query } = Object.fromEntries(searchParams.entries());
        console.log('t1', sort);
        console.log('ttttt', JSON.parse(sort));

        const searchQuery: Record<string, string> = {...query};
        if ((req as IAuthorizedRequst).user.role === 'ADMIN') {
            searchQuery.location = (req as IAuthorizedRequst).user.location;
        }

        console.log('quey', query, (req as IAuthorizedRequst).user.role, searchParams.entries());
        const conditions = Object.keys(searchQuery).map(queryKey => {
            if (queryKey === 'location' && searchQuery[queryKey]) {
                return { [queryKey]: searchQuery[queryKey] }
            }
            const regex = new RegExp(escapeRegex(searchQuery[queryKey]), 'i');
            return { [queryKey]: regex };
        });
        console.log('condition', conditions);


        const count = await Record.countDocuments({ $and: conditions });
        const records = await Record.find({ $and: conditions })
            .sort({...(JSON.parse(sort))})
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location']);

        return NextResponse.json({ code: 200, message: '', records, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, ...updatedData } = body as IRecord;

        const existingRecord = await Record.findOne({ 
            year: updatedData.year,
            month: updatedData.month,
            hospital: updatedData.hospital,
            location: updatedData.location 
        });

        console.log(existingRecord?._id.toString(), _id, existingRecord?._id.toString() !== _id);

        if (existingRecord && existingRecord._id.toString() !== _id) {
            return NextResponse.json({ code: 400, message: 'ردیف قبلاً ثبت شده‌است!', existingRecord }, { status: 400 });
        }

        const record = await Record.findByIdAndUpdate(_id, updatedData, { returnDocument: 'after' }).populate(['location']);
        return NextResponse.json({ code: 200, message: '', record }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

