export type RealEstateDescriptionRequest = {
  propertyAddress: string;
  propertyType: string;
  propertyStayType: string;
  propertyRoomCount: string;
  propertyBathroomCount: string;
  propertySquareFeet: string;
  propertyHasParking: string;
  propertyHighlights: string;
};

export type RealEstateDescriptionResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
