export class MyDate extends Date {

  toFrenchDate(): string {
    const isoDate = this.toISOString().split("-");
    isoDate[2] = isoDate[2].split("T")[0];
    const hour = this.toISOString().split("T")[1].split("Z")[0].split(".")[0];
    return isoDate[2] + "/" + isoDate[1] + "/" + isoDate[0] + " " + hour;
  }
}
