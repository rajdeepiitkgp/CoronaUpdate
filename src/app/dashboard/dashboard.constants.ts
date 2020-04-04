import { CardModel } from '../models/card-model';

export class DashboardConstants {

    public static cardObjectArray: CardModel[] = [
        {
            footerIcon: 'loyalty',
            footerText: 'Tracked from Johns Hopkings',
            avatarIcon: 'local_hotel',
            title: 'Total Infected',
            value: '1,099,622',
            avatarClass: 'mat-bg-orange'
        },
        {
            footerIcon: 'date_range',
            footerText: 'Last update Apr 4, 2020',
            avatarIcon: 'sentiment_very_satisfied',
            title: 'Recovered',
            value: '228,938',
            avatarClass: 'mat-bg-green'
        },
        {
            footerIcon: 'date_range',
            footerText: 'Last update Apr 4, 2020',
            avatarIcon: 'mood_bad',
            title: 'Total Death',
            value: '59,193',
            avatarClass: 'mat-bg-red'
        },
        {
            footerIcon: 'update',
            footerText: '(total death)/ (total infected)',
            avatarIcon: 'airline_seat_flat',
            title: 'Death Rate',
            value: '5.38%',
            avatarClass: 'mat-bg-gray'
        }
    ];
}
