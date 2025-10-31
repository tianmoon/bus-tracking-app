import db from '../config/database.js';
class RouteModel {

    // Lấy tất cả route
    static async getAll(){
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
    static async getBusStopById(id){
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

}

export default RouteModel;