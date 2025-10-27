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
}

export default StudentModel;