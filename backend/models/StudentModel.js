import db from '../config/database.js';

class StudentModel {
  // Lấy tất cả học sinh
  static async getAll() {
    try {
      const [rows] = await db.query(
        ` SELECT st.student_id, st.name AS student_name, st.grade, pt.name AS parent_name, b.plate_number, dr.name as driver_name
          FROM student st
          LEFT JOIN parent pt ON pt.parent_id = st.parent_id
          LEFT JOIN bus b ON b.bus_id = st.bus_id
          LEFT JOIN driver dr ON dr.driver_id = b.driver_id `
      );
      return rows;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách học sinh từ cơ sở dữ liệu');
    }
  }

  // Lấy học sinh theo ID
  static async getById(id) {
    try {
      const [rows] = await db.query(
        ` SELECT st.student_id, st.name AS student_name, st.grade, pt.name AS parent_name, b.plate_number, dr.name as driver_name
          FROM student st
          LEFT JOIN parent pt ON pt.parent_id = st.parent_id
          LEFT JOIN bus b ON b.bus_id = st.bus_id
          LEFT JOIN driver dr ON dr.driver_id = b.driver_id
          where st.student_id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error('Lỗi khi lấy học sinh theo id từ cơ sở dữ liệu');
    }
  }

  // Thêm học sinh mới
  static async create(studentData) {
    try {
      const { name, grade, parent_id, bus_id } = studentData;

      const [result] = await db.query(
        'INSERT INTO student (name, grade, active, parent_id, bus_id) VALUES (?, ?, 1, ?, ?)',
        [name, grade, parent_id, bus_id]
      );

      return {
        id: result.insertId,
        ...studentData
      };
    } catch (error) {
      throw new Error('Lỗi khi thêm học sinh mới vào cơ sở dữ liệu');
    }
  }

  // Cập nhật học sinh
  //   static async update(id, studentData) {
  //     try {
  //       const { ho_ten, ngay_sinh, gioi_tinh, dia_chi, so_dien_thoai, email, lop_hoc } = studentData;

  //       await db.query(
  //         'UPDATE hoc_sinh SET ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, dia_chi = ?, so_dien_thoai = ?, email = ?, lop_hoc = ? WHERE id = ?',
  //         [ho_ten, ngay_sinh, gioi_tinh, dia_chi, so_dien_thoai, email, lop_hoc, id]
  //       );

  //       return { id, ...studentData };
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  // Xóa học sinh
  //   static async delete(id) {
  //     try {
  //       await db.query('DELETE FROM hoc_sinh WHERE id = ?', [id]);
  //       return { message: 'Xóa học sinh thành công' };
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  // Tìm kiếm học sinh theo tên
  //   static async search(keyword) {
  //     try {
  //       const [rows] = await db.query(
  //         'SELECT * FROM hoc_sinh WHERE ho_ten LIKE ? ORDER BY id DESC',
  //         [`%${keyword}%`]
  //       );
  //       return rows;
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  static async getByTripId(tripId) {
    try {
      /* LOGIC TRUY VẤN NÂNG CAO:
         - Từ trip_id -> tìm assignment -> tìm bus_id.
         - Từ bus_id -> tìm danh sách student.
         - JOIN với bảng 'report' để xem học sinh đó trong chuyến đi này đã có trạng thái gì chưa (null, picked_up, dropped_off).
      */
      const query = `
        SELECT 
            st.student_id, 
            st.name, 
            st.grade, 
            st.parent_id,
            st.bus_id,
            r.status as trip_status  -- Trạng thái điểm danh: 'picked_up', 'dropped_off' hoặc NULL
        FROM trip tr
        JOIN assignment asn ON tr.asn_id = asn.asn_id
        JOIN student st ON st.bus_id = asn.bus_id    -- Logic: Bus của Trip trùng Bus của Student
        LEFT JOIN report r ON r.student_id = st.student_id AND r.trip_id = tr.trip_id
        WHERE tr.trip_id = ?
      `;
      
      const [rows] = await db.query(query, [tripId]);
      return rows;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách học sinh theo chuyến đi: ' + error.message);
    }
  }

  // 2. Cập nhật trạng thái (Insert hoặc Update vào bảng Report)
 // 2. Cập nhật trạng thái (Logic kiểm tra kỹ: Có rồi thì Update, Chưa có thì Insert)
  static async updateTripStatus(tripId, studentId, status) {
    try {
      // BƯỚC 1: Kiểm tra xem học sinh này trong chuyến đi này đã có dòng báo cáo nào chưa
      const [existing] = await db.query(
        "SELECT * FROM report WHERE trip_id = ? AND student_id = ?", 
        [tripId, studentId]
      );

      if (existing.length > 0) {
        // TRƯỜNG HỢP 1: Đã có -> Thực hiện UPDATE
        await db.query(
          "UPDATE report SET status = ?, timestamp = NOW() WHERE trip_id = ? AND student_id = ?",
          [status, tripId, studentId]
        );
      } else {
        // TRƯỜNG HỢP 2: Chưa có -> Thực hiện INSERT
        await db.query(
          "INSERT INTO report (trip_id, student_id, status, timestamp) VALUES (?, ?, ?, NOW())",
          [tripId, studentId, status]
        );
      }
      
      return true;
    } catch (error) {
      throw new Error('Lỗi khi cập nhật trạng thái điểm danh: ' + error.message);
    }
  }

}

export default StudentModel;