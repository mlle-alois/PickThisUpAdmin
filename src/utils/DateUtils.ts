import {MyDate} from "./MyDate";

export class DateUtils {

    public static getCurrentTimeStamp(): string {
        return this.getCurrentDate().toISOString();
    }

    public static getCurrentDate(): MyDate {
        let date = new MyDate();
        return new MyDate(date.getTime() - (date.getTimezoneOffset() * 60000));
    }

    public static convertToStringDate(date: MyDate): MyDate {
        return new MyDate(date.toString().split("GMT")[0]);
    }

    /**
     * Ajoute x heures à la date entrée en paramètre
     * @param date
     * @param hours
     */
    public static addXHoursToDate(date: MyDate, hours: number) {
        date.setHours(date.getHours() + hours);
        return date;
    }

}
