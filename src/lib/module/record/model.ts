import mongoose, { Model, Schema } from 'mongoose';
import IRecord, { INewRecord } from './record.types';

const recordSchema = new Schema<INewRecord>({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Locations',
    },
    hospital: String, 
    month: String, 
    year: String, 
    mDays: Number, 

    rIn: Number, 
    rOut: Number, 
    rDoc: Number, 
    vTotal: Number,   
    sTotal: Number,
    dTotal: Number,  
    beds: Number,     
    oDays: Number,    
    sDays: Number,    
    ins: Number,      
    ins1: Number,      
    ins2: Number,      
    ins3: Number,      
    received: Number, 
    ded: Number,      

    totalRev: Number,     
    revPerBed: Number,    
    revPerOccDay: Number, 
    revCase: Number,      
    revVisit: Number,     
    revSurg: Number,      
    bor: Number,          
    alos: Number,         
    surgIntensity: Number,
    dedPerc: Number,      
    collRatio: Number,    
    docPct: Number,       
    _table: String,
});

const Record: Model<IRecord> = (mongoose.models && mongoose.models.Record) || mongoose.model('Record', recordSchema);

export default Record;
