import db from '../config/database.js';

class TripModel {
    // Lấy tất cả chuyến đi
    static async getAll() {
        try {
            const [rows] = await db.query(
                `SELECT tr.trip_id, sch.schedule_id, r.route_id, b.bus_id, tr.status, tr.arrival_time, tr.departure_time, b.plate_number, dr.name as driver_name, r.name as route_name
                FROM trip tr
                LEFT JOIN assignment asn ON asn.asn_id = tr.asn_id
                LEFT JOIN bus b ON b.bus_id = asn.bus_id
                LEFT JOIN driver dr ON dr.driver_id = b.driver_id
                LEFT JOIN schedule sch ON asn.schedule_id = sch.schedule_id
                LEFT JOIN route r ON r.route_id = sch.route_id;`
            );
            return rows;
        }
        catch (error) {
            throw new Error('Lỗi khi lấy danh sách chuyến đi từ cơ sở dữ liệu');
        }
    }
}

export default TripModel;
