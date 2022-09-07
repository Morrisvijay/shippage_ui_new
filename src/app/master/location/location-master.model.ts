import { formatDate } from "@angular/common";
export class LocationMaster {
  [x: string]: any;
  id: number;
  cslLocationCode: number;
  locationName: string;
  country: string;

  constructor(locationMaster) {
    {
      this.id = locationMaster.id || this.getRandomID();
      this.cslLocationCode = locationMaster.cslLocationCode || "";
      this.locationName = locationMaster.locationName || "";
      this.country = locationMaster.country || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
