export type PassengerType = "adult" | "child" | "senior" | "student";

export type DiscountType =
  | "without_discounts"
  | "vorteilscard"
  | "student_card"
  | "family_card";

export interface Passenger {
  type: PassengerType;
  count: number;
  discount?: DiscountType;
}

export interface PassengerOption {
  type: PassengerType;
  discounts: DiscountType[];
  minCount: number;
  maxCount: number;
}
