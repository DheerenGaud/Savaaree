import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
    {
        segment: {
            type: String,
            required: true, // This can be optional based on your use case
            trim: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        }
    },
    {
        _id: false // Prevents Mongoose from adding an _id field
    }
);

const passengerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pickupLocation: {
        type: locationSchema,
        required: false, 
    },
    dropLocation: {
        type: locationSchema,
            required: false, 
    },
    joinTime: {
        type: Date,
        required: true,
    },
    dropTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'],
        default: 'requested',
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
    },
    distance:{
        type:String
    }
}
,{
  _id:false
});


const rideSchema = new Schema(
    {
        passengers: [
            {
                type: passengerSchema,
            },
        ],
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        startLocation: {
            type: locationSchema,
            required: false, 
        },
        endLocation: {
            type: locationSchema,
            required: false, 
        },
        shereingStatus:{
            type:Boolean,
            default:true,
        },
        path:{
            type:String
        },
        distance:{
            type:String
        },
        vehicle:{
            type:Schema.Types.ObjectId,
            ref: 'Vehicle',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Ride = mongoose.model("Ride", rideSchema);

// uzjsBsiy{La@\e@^SE[NWLCPQHUPu@^o@R_@L[FUIiANg@C{BIyCiAGCcFsAoA]sEkAoA]sAG{@He@DaANm@x@Yp@Op@y@|Ba@z@c@z@Wd@c@c@BENYR_@NWJURc@x@{B^i@T_@`@{@r@mAv@sAZy@Lg@Fi@Fi@Bw@FiAJgAPw@^}@bA}Ax@{@bCsC^a@d@_@zAmAhFgEbHuFvD{C~@}@hAmAlAsA`@m@Vm@Pq@Pq@p@gEdA{FBy@Lw@|AwI\mA\aCDi@Do@Au@Es@Kk@Se@iCmE[m@Yo@yBaEe@{@CGgB{CYe@e@cA]s@gEcHQq@uC}EeA}@sEgIKm@^m@HSl@qBVy@Re@Zg@\c@`@c@`@_@f@a@f@Wd@Ud@Qf@Kf@Kh@Iz@GxDUl@Ih@Ij@Mb@Md@Od@Q`@Wb@[`@]b@a@b@g@t@y@b@m@b@o@b@w@Zu@^uAd@cCLm@d@eCXgAFo@b@cCPy@f@mBxFiRhAwCdRed@fBgEhBuENa@Lc@Ha@Fc@NkC`@cGHq@Ju@Ji@Nk@Tk@fAuBhAkBfA_B`@m@d@i@`@a@`@_@^Y`BmA`@Wb@Wb@YzEqCVWVW`@Wd@SQw@qEkQa@oCyXyfAqAeFI]mFwSMo@Qw@UaBMmAEi@[cCKw@E[s@}E[yA{BuN{A}JsA}Iw@oFoA}I{@yFiAsHaB}K}AmLa@}CeAeEq@wBs@{BMa@q@kBq@kBe@w@s@}@_FgF}BcCq@s@c@a@s@y@mD_DYWe@k@c@s@]{@Sw@Q{@Ks@AaAP{FLuCh@mNLwCAuCv@mTGWEKEGQOCCQGqFScAEuFSqGW
// uzjsBsiy{La@\e@^SE[NWLCPQHUPu@^o@R_@L[FUIiANg@C{BIyCiAGCcFsAoA]sEkAoA]sAG{@He@DaANm@x@Yp@Op@y@|Ba@z@c@z@Wd@c@c@BENYR_@NWJURc@x@{B^i@T_@`@{@r@mAv@sAZy@Lg@Fi@Fi@Bw@FiAJgAPw@^}@bA}Ax@{@bCsC^a@d@_@zAmAhFgEbHuFvD{C~@}@hAmAlAsA`@m@Vm@Pq@Pq@p@gEdA{FBy@Lw@|AwI\mA\aCDi@Do@Au@Es@Kk@Se@iCmE[m@Yo@yBaEe@{@CGgB{CYe@e@cA]s@gEcHQq@uC}EeA}@sEgIKm@^m@HSl@qBVy@Re@Zg@\c@`@c@`@_@f@a@f@Wd@Ud@Qf@Kf@Kh@Iz@GxDUl@Ih@Ij@Mb@Md@Od@Q`@Wb@[`@]b@a@b@g@t@y@b@m@b@o@b@w@Zu@^uAd@cCLm@d@eCXgAFo@b@cCPy@f@mBxFiRhAwCdRed@fBgEhBuENa@Lc@Ha@Fc@NkC`@cGHq@Ju@Ji@Nk@Tk@fAuBhAkBfA_B`@m@d@i@`@a@`@_@^Y`BmA`@Wb@Wb@YzEqCVWVW`@Wd@S~@MpH`ZNl@rBNZBNJFB
// uzjsBsiy{La@\e@^SE[NWLCPQHUPu@^o@R_@L[FUIiANg@C{BIyCiAGCcFsAoA]sEkAoA]sAG{@He@DaANm@x@Yp@Op@y@|Ba@z@c@z@Wd@c@c@BENYR_@NWJURc@x@{B^i@T_@`@{@r@mAv@sAZy@Lg@Fi@Fi@Bw@FiAJgAPw@^}@bA}Ax@{@bCsC^a@d@_@zAmAhFgEbHuFvD{C~@}@hAmAlAsA`@m@Vm@Pq@Pq@p@gEdA{FBy@Lw@|AwIDo@ZeBJ{@Hq@@g@Cs@EUC[Me@O_@g@_AeBcDcAsBK[z@T|A`@NV\f@|BrDV|@nGxJfEdHpEjH`@n@pAnBLRpB|C`CpDN`@lYp`@z@pAnAfDNb@Vn@^z@t@nAPz@Tv@Rh@Tj@F^Fb@Bj@Dh@Hj@zBnHf@pB^tAf@pBrDjNh@jBTv@ZlAdDfMhBvHr@pCZrAJt@|@`C`AbBf@v@lArArBnBdAfA`@ZlAx@|@j@tBx@dA\xGbB|Aj@rAp@jBhA`DpBxA|@h@NxAp@nAl@hA^DB~CfA`Cx@f@VvExA`Bb@pCx@hBn@xE`BlBl@bA\pH`Cb@NfAZrCz@dBv@xBtAd@b@dCxBtDhDdDbDnBjBpDjDtCdCdBvArB|AxDlCdEzCp@^^Zb@Zn@f@~@n@dAt@hCbBfEpCpFzDzAhAhBhAxAbA|BvAbEbCLFv@^z@f@pBjAhDzBVNRLp@`@tBjArBhAhAj@jA`@nA\tA\hAVxAj@^N~@f@n@ZfAr@x@f@d@`@lApAp@f@p@\n@R~@PXDTDjB^h@Jp@HjAPB?bBV`@Fr@RpAZTDl@Lr@N~ATzAVp@HnALlBD~A?pAD`AXbBr@xAp@fB^hALtCJzJ^~@Fn@RnCvAl@Vl@Jd@?|@G|BMxCIbC?rBJfId@|EXjCRnBTdBVbFdAtEfArBZrBXhFr@ZDtEd@p@Jb@Hd@Fb@BL?`@?n@En@CzAOzBYfAI^CJAH?J@RBdCh@d@LB@xAx@v@p@XTZNVJVD\B`@@\FvCCdFIhCE~AEv@ER@`@At@@zBD^@XBz@Db@H`@FxAXxB`@p@Hb@JtAHn@Dn@BP@dDD~@BhBHvA@`A@h@Bt@L~@Nf@BlD@jAEb@GvAYt@IlAG^EZQj@m@X[\Q^GlAKbAGhAKl@GxAGl@Er@Ih@KZM\]~@gAd@]f@[n@Uh@MvHqA~@K`AAlAIdAMl@Mb@OjBs@~@a@v@Qn@Gd@@lBNh@D~@L`APh@NdEdAdAb@^LNBLB\?zBM~SkAxACNAA[?AAKYBEAACC]@A