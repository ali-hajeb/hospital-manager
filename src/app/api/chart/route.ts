import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         return NextResponse.json({ code: 200, message: '', location }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
//     }
// }

// export async function GET(req: NextRequest) {
//     try {
//         const searchParams = req.nextUrl.searchParams;
//         const { limit = '0', skip = '0', ...query } = Object.fromEntries(searchParams.entries());
//
//         console.log('quey', query, searchParams.entries());
//         const conditions = Object.keys(query).map(queryKey => {
//             const regex = new RegExp(escapeRegex(query[queryKey]), 'i');
//             return { [queryKey]: regex };
//         });
//         console.log('condition', conditions);
//
//
//         const count = await Location.countDocuments({ $and: conditions });
//         const locations = await Location.find({ $and: conditions })
//             .skip(parseInt(skip) * parseInt(limit))
//             .limit(parseInt(limit));
//         return NextResponse.json({ code: 200, message: '', locations, count }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
//     }
// }

// export async function PATCH(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { _id, ...updatedData } = body as ILocation;
//
//         const location = await Location.findByIdAndUpdate(_id, updatedData, { new: true });
//         return NextResponse.json({ code: 200, message: '', location }, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
//     }
// }
//
