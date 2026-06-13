import Record from "@/src/lib/module/record/model";
import moment from "jalali-moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const year = moment().locale('fa').format('YYYY');
        const stats = await Record.aggregate([
            {
                '$match': {
                    'year': '1405'
                }
            }, {
                '$group': {
                    '_id': {
                        'month': '$month', 
                        'name': '$hospital'
                    }, 
                    'value': {
                        '$sum': '$totalRev'
                    }
                }
            }, {
                '$group': {
                    '_id': '$_id.month', 
                    'names': {
                        '$push': {
                            'k': '$_id.name', 
                            'v': '$value'
                        }
                    }
                }
            }, {
                '$project': {
                    '_id': 0, 
                    'month': '$_id', 
                    'data': {
                        '$arrayToObject': '$names'
                    }
                }
            }, {
                '$replaceRoot': {
                    'newRoot': {
                        '$mergeObjects': [
                            {
                                'month': '$month'
                            }, '$data'
                        ]
                    }
                }
            }, {
                '$sort': {
                    'month': 1
                }
            }
        ]);
        console.log('line[]', stats);
        return NextResponse.json({ code: 200, message: '', stats }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
