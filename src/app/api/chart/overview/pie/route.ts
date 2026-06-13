import Record from "@/src/lib/module/record/model";
import moment from "jalali-moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const year = moment().locale('fa').format('YYYY');
        const records = await Record.find({year: parseInt(year)}).populate(['location'])
        const stats = await Record.aggregate([
          {
            // Step 1: Filter documents for the specific year
            $match: {
              year: year // Replace with your desired year
            }
          },
          {
            // Step 2: Group by "name" and sum the "value"
            $group: {
              _id: "$hospital", 
              totalValue: { $sum: "$totalRev" }
            }
          },
          {
            // Step 3: Format the output to show "name" and "value"
            $project: {
              _id: 0, // Exclude the default _id field
              name: "$_id",
              value: "$totalValue"
            }
          }
        ]);
        console.log('[recs]: ', stats);
        return NextResponse.json({ code: 200, message: '', stats }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
