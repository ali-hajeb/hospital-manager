import { Schema } from "mongoose";

export interface INewRecord {
    hospital: string; 
    location: string | Schema.Types.ObjectId;
    month: number; 
    year: number; 
    mDays: number; 
    rIn: number; 
    rOut: number; 
    rDoc: number; 
    vTotal: number;   
    sTotal: number;
    dTotal: number;  
    beds: number;     
    oDays: number;    
    sDays: number;    
    ins: number;      
    ins1: number;      
    ins2: number;      
    ins3: number;      
    received: number; 
    ded: number;      
    totalRev: number;     
    revPerBed: number;    
    revPerOccDay: number; 
    revCase: number;      
    revVisit: number;     
    revSurg: number;      
    bor: number;          
    alos: number;         
    surgIntensity: number;
    dedPerc: number;      
    collRatio: number;    
    docPct: number;       
    _table: string;
}

export default interface IRecord extends INewRecord {
    _id: string;
}
