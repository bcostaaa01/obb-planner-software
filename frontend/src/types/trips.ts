import type { Trip } from "../types/Trip";

export interface TripSegment {
  trainType: string;
  duration: string;
  transfers: number;
}

export interface ExtendedTrip extends Trip {
  segments: TripSegment[];
}

export const mockTrips: Record<string, ExtendedTrip[]> = {
  "Wien Hbf-Salzburg Hbf": [
    {
      id: 1,
      startstation: "Wien Hbf",
      endstation: "Salzburg Hbf",
      starttime: "08:25",
      endtime: "10:53",
      price: 29.9,
      segments: [
        {
          trainType: "RJX",
          duration: "2 Stunden 28 Min",
          transfers: 0,
        },
      ],
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: true,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
    {
      id: 2,
      startstation: "Wien Hbf",
      endstation: "Salzburg Hbf",
      starttime: "10:30",
      endtime: "13:10",
      price: 24.9,
      segments: [
        {
          trainType: "ICE",
          duration: "2 Stunden 40 Min",
          transfers: 0,
        },
      ],
      date: "2025-03-21",
      discount: "family_card",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
    {
      id: 3,
      startstation: "Wien Hbf",
      endstation: "Salzburg Hbf",
      starttime: "14:55",
      endtime: "18:20",
      price: 34.9,
      segments: [
        {
          trainType: "RJX",
          duration: "3 Stunden 25 Min",
          transfers: 1,
        },
      ],
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
  ],

  "Wien Hbf-Graz Hbf": [
    {
      id: 4,
      startstation: "Wien Hbf",
      endstation: "Graz Hbf",
      starttime: "07:40",
      endtime: "10:12",
      price: 27.5,
      segments: [
        {
          trainType: "RJX",
          duration: "2 Stunden 32 Min",
          transfers: 0,
        },
      ],
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
    {
      id: 5,
      startstation: "Wien Hbf",
      endstation: "Graz Hbf",
      starttime: "12:25",
      endtime: "15:45",
      price: 22.9,
      segments: [
        {
          trainType: "IC",
          duration: "3 Stunden 20 Min",
          transfers: 1,
        },
        {
          trainType: "RJX",
          duration: "3 Stunden 20 Min",
          transfers: 1,
        },
      ],
      date: "2025-03-21",
      discount: "student_card",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
  ],

  "Graz Hbf-Wien Hbf": [
    {
      id: 6,
      startstation: "Graz Hbf",
      endstation: "Wien Hbf",
      starttime: "09:15",
      endtime: "11:50",
      price: 28.9,
      segments: [
        {
          trainType: "RJX",
          duration: "2 Stunden 35 Min",
          transfers: 0,
        },
        {
          trainType: "ICE",
          duration: "2 Stunden 35 Min",
          transfers: 0,
        },
      ],
      date: "2025-03-21",
      discount: "without_discounts",
      accessibility: {
        wheelchair: false,
        lowFloorAccess: true,
        assistanceAvailable: true,
      },
    },
  ],
};
