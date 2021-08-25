import { CardModel } from '../models/card-model';
import { GraphModel } from '../models/graph-model';

export class DashboardConstants {
  public static cardObjectArray: CardModel[] = [
    {
      footerIcon: 'loyalty',
      footerText: 'Tracked from Johns Hopkings',
      avatarIcon: 'local_hotel',
      title: 'Total Infected',
      value: 'Loading...',
      colspan: 1,
      avatarClass: 'mat-bg-orange',
    },
    {
      footerIcon: 'date_range',
      footerText: 'Last update ',
      avatarIcon: 'sentiment_very_satisfied',
      title: 'Recovered',
      value: 'Loading...',
      colspan: 1,
      avatarClass: 'mat-bg-green',
    },
    {
      footerIcon: 'date_range',
      footerText: 'Last update ',
      avatarIcon: 'mood_bad',
      title: 'Total Death',
      value: 'Loading...',
      colspan: 1,
      avatarClass: 'mat-bg-red',
    },
    {
      footerIcon: 'update',
      footerText: '(total death)/ (total infected)',
      avatarIcon: 'airline_seat_flat',
      title: 'Death Rate',
      value: 'Loading...',
      colspan: 1,
      avatarClass: 'mat-bg-gray',
    },
  ];

  public static demoCardModel: GraphModel = {
    footerText: 'Loading...',
    xAxisData: [],
    isHistogram: false,
    yAxisData: [],
    yTitle: 'Loading...',
    y1AxisData: [],
    y2AxisData: [],
    y1Title: 'Loading...',
    y2Title: 'Loading...',
    color: '',
    color1: '#ff9800',
    color2: '#f44336',
  };
}
