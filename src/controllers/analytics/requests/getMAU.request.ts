export interface IGetMAURes {
    stats: IMauStats[]
}

export interface IMauStats {
    Month: Date,
    MAU: number,
    NewMAU: number
}