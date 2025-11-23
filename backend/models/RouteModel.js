import db from '../config/database.js';
class RouteModel {

    // Lấy tất cả route
    static async getAll() {
        try {
            const [rows] = await db.query(
                `   SELECT r.route_id, r.name, r.active, r.start, r.end, COUNT(bt.busstop_id) as stop_quantity
                    FROM route r
                    JOIN busstop bt ON r.route_id = bt.route_id
                    GROUP BY r.route_id, r.name, r.active, r.start, r.end `
            );
            return rows;
        }
        catch (error) {
            throw new Error('Lỗi khi lấy danh sách tuyến đường từ cơ sở dữ liệu');
        }
    }

    // Lấy bus stop theo id 
    static async getBusStopById(id) {
        try {
            const [rows] = await db.query(`
                    SELECT bt.busstop_id, bt.name AS stop_name, bt.latitude, bt.longitude, bt.address, bt.order_index
                    FROM busstop bt
                    WHERE bt.route_id = ?
                    ORDER BY bt.order_index ASC
                `, [id]
            );
            return rows;
        }
        catch (error) {
            throw new Error('Lỗi khi lấy danh sách tuyến đường từ cơ sở dữ liệu')
        }
    }

    // Lấy thông tin route theo trip id
    static async getRouteByTripId(id) {
        try {
            const [rows] = await db.query(`
                    SELECT r.route_id, b.bus_id, b.plate_number, r.name, r.active, r.start, r.end, COUNT(bst.busstop_id) as stop_quantity
                    FROM trip tr
					LEFT JOIN assignment asn ON asn.asn_id = tr.asn_id
					LEFT JOIN bus b ON b.bus_id = asn.bus_id
					LEFT JOIN driver dr ON dr.driver_id = b.driver_id
					LEFT JOIN schedule sch ON asn.schedule_id = sch.schedule_id
					LEFT JOIN route r ON r.route_id = sch.route_id
                    LEFT JOIN busstop bst ON bst.route_id = r.route_id
					WHERE tr.trip_id = ?
                    GROUP BY r.route_id, r.name, r.active, r.start, r.end
                `, [id]
            );
            return rows[0];
        }
        catch (error) {
            throw new Error('Lỗi khi lấy thông tin tuyến đường từ cơ sở dữ liệu')
        }
    }

}

export default RouteModel;