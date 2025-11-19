-- ======================
-- TABLE: User
-- ======================
CREATE TABLE `User` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    phone_number VARCHAR(20),
    role ENUM('manager', 'driver', 'parent'),
	`active` TINYINT(1) DEFAULT 1
);
-- ======================
-- TABLE: Manager
-- ======================
CREATE TABLE Manager (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100),
    user_id INT,
    CONSTRAINT `fk_manager_user` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);
-- ======================
-- TABLE: Driver
-- ======================
CREATE TABLE Driver (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100),
    user_id INT,
    CONSTRAINT `fk_driver_user` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);
-- ======================
-- TABLE: Parent
-- ======================
CREATE TABLE Parent (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100),
    identification VARCHAR(20),
    user_id INT,
    CONSTRAINT `fk_parent_user` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`)
);

-- ======================
-- TABLE: Bus
-- ======================
CREATE TABLE Bus (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    plate_number VARCHAR(20),
    capacity INT,
    `active` TINYINT(1) DEFAULT 1,
    driver_id INT,
    CONSTRAINT `fk_bus_driver` FOREIGN KEY (`driver_id`) REFERENCES `Driver`(`driver_id`)
);
-- ======================
-- TABLE: Route
-- ======================
CREATE TABLE `Route` (
  `route_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150),
  `start` VARCHAR(150),
  `end` VARCHAR(150),
  `active` TINYINT(1) DEFAULT 1
);
-- ======================
-- TABLE: BusStop
-- ======================
CREATE TABLE `BusStop` (
  `busstop_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150),
  `latitude` DOUBLE,
  `longitude` DOUBLE,
  `active` TINYINT(1) DEFAULT 1,
  `address` VARCHAR(255),
  `order_index` INT,
  `route_id` INT,
  CONSTRAINT `fk_busstop_route` FOREIGN KEY (`route_id`) REFERENCES `Route`(`route_id`)
);
-- ======================
-- TABLE: Schedule
-- ======================
CREATE TABLE `Schedule` (
  `schedule_id` INT AUTO_INCREMENT PRIMARY KEY,
  `start_time` DATETIME,
  `end_time` DATETIME,
  `day_of_week` INT,
  `active` TINYINT(1) DEFAULT 1,
  `describe` VARCHAR(255),
  `route_id` INT,
  CONSTRAINT `fk_schedule_route` FOREIGN KEY (`route_id`) REFERENCES `Route`(`route_id`)
);
-- ======================
-- TABLE: Assignment
-- ======================
CREATE TABLE `Assignment` (
  `asn_id` INT AUTO_INCREMENT PRIMARY KEY,
  `bus_id` INT,
  `schedule_id` INT,
  CONSTRAINT `fk_assignment_bus` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`bus_id`),
  CONSTRAINT `fk_assignment_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `Schedule`(`schedule_id`)
);
-- ======================
-- TABLE: Trip
-- ======================
CREATE TABLE `Trip` (
  `trip_id` INT AUTO_INCREMENT PRIMARY KEY,
  `status` ENUM('completed','ongoing','cancelled'),
  `departure_time` DATETIME,
  `arrival_time` DATETIME,
  `asn_id` INT,
  CONSTRAINT `fk_trip_assignment` FOREIGN KEY (`asn_id`) REFERENCES `Assignment`(`asn_id`)
);
-- ======================
-- TABLE: LocationUpdate
-- ======================
CREATE TABLE `LocationUpdate` (
  `locate_id` INT AUTO_INCREMENT PRIMARY KEY,
  `latitude` DOUBLE,
  `longitude` DOUBLE,
  `timestamp` DATETIME,
  `trip_id` INT,
  CONSTRAINT `fk_loc_trip` FOREIGN KEY (`trip_id`) REFERENCES `Trip`(`trip_id`)
);
-- ======================
-- TABLE: Notification
-- ======================
CREATE TABLE `Notification` (
  `ntf_id` INT AUTO_INCREMENT PRIMARY KEY,
  `content` TEXT,
  `type` ENUM('delayed','arrival','breakdown'),
  `sent_time` DATETIME,
  `status` ENUM('read','unread') DEFAULT 'unread',
  `trip_id` INT,
  CONSTRAINT `fk_notification_trip` FOREIGN KEY (`trip_id`) REFERENCES `Trip`(`trip_id`)
);
-- ======================
-- TABLE: NotificationRecipient
-- ======================
CREATE TABLE `NotificationRecipient` (
  `ntf_id` INT,
  `parent_id` INT,
  PRIMARY KEY (`ntf_id`,`parent_id`),
  CONSTRAINT `fk_nr_notification` FOREIGN KEY (`ntf_id`) REFERENCES `Notification`(`ntf_id`),
  CONSTRAINT `fk_nr_parent` FOREIGN KEY (`parent_id`) REFERENCES `Parent`(`parent_id`)
);
-- ======================
-- TABLE: Student
-- ======================
CREATE TABLE `Student` (
  `student_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(120),
  `grade` VARCHAR(20),
  `active` TINYINT(1) DEFAULT 1,
  `parent_id` INT,
  `bus_id` INT,
  CONSTRAINT `fk_student_parent` FOREIGN KEY (`parent_id`) REFERENCES `Parent`(`parent_id`),
  CONSTRAINT `fk_student_bus` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`bus_id`)
);
-- ======================
-- TABLE: Report
-- ======================
CREATE TABLE `Report` (
  `report_id` INT AUTO_INCREMENT PRIMARY KEY,
  `timestamp` DATETIME,
  `status` ENUM('picked_up','absent','dropped_off'),
  `trip_id` INT,
  `student_id` INT,
  CONSTRAINT `fk_report_trip` FOREIGN KEY (`trip_id`) REFERENCES `Trip`(`trip_id`),
  CONSTRAINT `fk_report_student` FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`)

);
-- ======================
-- TABLE: Message
-- ======================
CREATE TABLE `Message` (
  `msg_id` INT AUTO_INCREMENT PRIMARY KEY,
  `content` TEXT,
  `time_sent` DATETIME,
  `sender_id` INT,
  `receiver_id` INT,
  `room` ENUM('driver','parent'),
  `status` ENUM('read','unread') DEFAULT 'unread',
  CONSTRAINT `fk_message_sender` FOREIGN KEY (`sender_id`) REFERENCES `Manager`(`manager_id`),
  CONSTRAINT `fk_message_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`user_id`)
);
-- ==================================================
-- =============== DỮ LIỆU MẪU (10 dòng mỗi bảng) ====
-- ==================================================

-- 10 users (tiếng Việt)
INSERT INTO `User` (email, password, phone_number, role, active) VALUES
('manager1@swe.vn','pwd1','0905123001','manager',1),
('manager2@swe.vn','pwd2','0905123002','manager',1),
('driver1@swe.vn','pwd3','0905123003','driver',1),
('driver2@swe.vn','pwd4','0905123004','driver',1),
('parent1@swe.vn','pwd5','0905123005','parent',1),
('parent2@swe.vn','pwd6','0905123006','parent',1),
('parent3@swe.vn','pwd7','0905123007','parent',1),
('parent4@swe.vn','pwd8','0905123008','parent',1),
('parent5@swe.vn','pwd9','0905123009','parent',1),
('parent6@swe.vn','pwd10','0905123010','parent',1);

-- 10 managers (tham chiếu đến user 1..10)
INSERT INTO `Manager` (name, user_id) VALUES
('Nguyễn Văn Quản 1',1),('Lê Thị Minh 2',2),
('Trần Văn A',3),('Phạm Thị B',4),
('Hoàng Văn C',5),('Vũ Thị D',6),
('Đặng Văn E',7),('Bùi Thị F',8),
('Phan Văn G',9),('Lê Thị H',10);

-- 10 drivers (tham chiếu đến user 1..10)
INSERT INTO `Driver` (name, user_id) VALUES
('Phạm Văn Tài',1),('Nguyễn Hữu Đạt',2),
('Lê Văn Nam',3),('Trần Minh Hoàng',4),
('Hoàng Nhật',5),('Phùng Văn An',6),
('Ngô Văn Long',7),('Võ Đức Trung',8),
('Đỗ Thanh Tùng',9),('Hà Văn Sơn',10);

-- 10 parents (tham chiếu đến user 1..10)
INSERT INTO `Parent` (name, identification, user_id) VALUES
('Trần Thị Hoa','012345678',1),
('Nguyễn Văn Dũng','123456789',2),
('Lê Thị Thu','234567890',3),
('Phạm Quốc Khánh','345678901',4),
('Võ Minh Anh','456789012',5),
('Đỗ Thị Lan','567890123',6),
('Hoàng Văn Bảo','678901234',7),
('Nguyễn Thị Hồng','789012345',8),
('Phan Quốc Thắng','890123456',9),
('Lý Thị Kim','901234567',10);

-- 10 buses (liên kết driver_id 1..10)
INSERT INTO `Bus` (plate_number, capacity, active, driver_id) VALUES
('29B-11111',40,1,1),
('29B-22222',35,1,2),
('30B-33333',45,1,3),
('30B-44444',50,1,4),
('51B-55555',30,1,5),
('51B-66666',40,1,6),
('43B-77777',36,1,7),
('43B-88888',42,1,8),
('15B-99999',38,1,9),
('15B-00000',34,1,10);

-- 10 routes
INSERT INTO `Route` (name, active) VALUES
('Tuyến 1: Hà Nội - Cầu Giấy',1),
('Tuyến 2: Hà Nội - Thanh Xuân',1),
('Tuyến 3: Đà Nẵng - Hải Châu',1),
('Tuyến 4: Đà Nẵng - Sơn Trà',1),
('Tuyến 5: TP.HCM - Quận 1',1),
('Tuyến 6: TP.HCM - Quận 3',1),
('Tuyến 7: Huế - Trung tâm',1),
('Tuyến 8: Hải Phòng - Ngô Quyền',1),
('Tuyến 9: Cần Thơ - Ninh Kiều',1),
('Tuyến 10: Bình Dương - Thủ Dầu Một',1);

-- 10 bus stops (tọa độ thực Việt Nam)
INSERT INTO `BusStop` (name, latitude, longitude, active, address, route_id) VALUES
('Trường Tiểu học Kim Liên',21.0123,105.8412,1,'Đống Đa, Hà Nội',1),
('Bến xe Giáp Bát',20.9780,105.8419,1,'Hoàng Mai, Hà Nội',2),
('Cầu Rồng',16.0615,108.2270,1,'Sơn Trà, Đà Nẵng',3),
('Ga Đà Nẵng',16.0645,108.2219,1,'Hải Châu, Đà Nẵng',4),
('Chợ Bến Thành',10.7723,106.6983,1,'Quận 1, TP.HCM',5),
('Công viên Lê Văn Tám',10.7890,106.7005,1,'Quận 3, TP.HCM',6),
('Ngã 6 Huế',16.4586,107.6006,1,'TP Huế',7),
('Cảng Hải Phòng',20.8453,106.6837,1,'Hải Phòng',8),
('Bến Ninh Kiều',10.0297,105.7748,1,'Cần Thơ',9),
('KCN VSIP',10.9865,106.6834,1,'Bình Dương',10);

-- 10 schedules
INSERT INTO `Schedule` (start_time,end_time,day_of_week,active,route_id) VALUES
('2025-10-20 06:00:00','2025-10-20 08:00:00',2,1,1),
('2025-10-20 06:30:00','2025-10-20 08:30:00',2,1,2),
('2025-10-20 06:15:00','2025-10-20 08:15:00',3,1,3),
('2025-10-21 06:00:00','2025-10-21 08:00:00',4,1,4),
('2025-10-21 06:30:00','2025-10-21 08:30:00',5,1,5),
('2025-10-22 06:00:00','2025-10-22 08:00:00',6,1,6),
('2025-10-22 06:15:00','2025-10-22 08:15:00',0,1,7),
('2025-10-22 06:45:00','2025-10-22 08:45:00',1,1,8),
('2025-10-23 06:00:00','2025-10-23 08:00:00',2,1,9),
('2025-10-23 06:30:00','2025-10-23 08:30:00',3,1,10);

-- 10 assignments (bus_id và schedule_id hợp lệ)
INSERT INTO `Assignment` (bus_id, schedule_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8),
(9,9),
(10,10);

-- 10 trips (asn_id 1..10)
INSERT INTO `Trip` (status, departure_time, arrival_time, asn_id) VALUES
('completed','2025-10-20 06:00:00','2025-10-20 07:30:00',1),
('completed','2025-10-20 06:30:00','2025-10-20 08:00:00',2),
('completed','2025-10-20 06:15:00','2025-10-20 07:45:00',3),
('ongoing','2025-10-21 06:00:00','2025-10-21 08:00:00',4),
('ongoing','2025-10-21 06:30:00','2025-10-21 08:30:00',5),
('ongoing','2025-10-21 06:10:00','2025-10-21 07:50:00',6),
('completed','2025-10-22 06:00:00','2025-10-22 07:40:00',7),
('cancelled','2025-10-22 06:45:00','2025-10-22 08:15:00',8),
('completed','2025-10-23 06:00:00','2025-10-23 07:35:00',9),
('completed','2025-10-23 06:30:00','2025-10-23 08:05:00',10);

-- 10 location updates (tọa độ Việt Nam, trip_id 1..10)
INSERT INTO `LocationUpdate` (latitude, longitude, `timestamp`, trip_id) VALUES
(21.0278,105.8342,'2025-10-20 06:30:00',1),
(21.0285,105.8350,'2025-10-20 06:40:00',1),
(16.0544,108.2022,'2025-10-20 06:40:00',3),
(16.0615,108.2270,'2025-10-20 06:50:00',4),
(10.7769,106.7009,'2025-10-20 06:50:00',5),
(10.7890,106.7005,'2025-10-21 06:30:00',6),
(16.4637,107.5909,'2025-10-22 06:30:00',7),
(20.8453,106.6837,'2025-10-22 06:45:00',8),
(10.0297,105.7748,'2025-10-23 06:30:00',9),
(10.9865,106.6834,'2025-10-23 06:40:00',10);

-- 10 notifications (trip_id 1..10)
INSERT INTO `Notification` (content, `type`, sent_time, `status`, trip_id) VALUES
('Xe trễ 10 phút','delayed','2025-10-20 06:10:00','unread',1),
('Xe đến trường an toàn','arrival','2025-10-20 07:35:00','read',1),
('Xe gặp sự cố nhỏ','breakdown','2025-10-20 07:00:00','unread',2),
('Xe đã khởi hành','arrival','2025-10-21 06:05:00','read',4),
('Xe đang trên đường','arrival','2025-10-21 06:15:00','read',5),
('Xe hỏng máy tạm thời','breakdown','2025-10-21 06:20:00','unread',6),
('Xe đã đón học sinh','arrival','2025-10-22 06:45:00','read',7),
('Xe về đến bãi','arrival','2025-10-22 08:00:00','read',8),
('Xe đi muộn 15 phút','delayed','2025-10-23 06:15:00','unread',9),
('Chuyến đã hoàn thành','arrival','2025-10-23 08:05:00','read',10);

-- 10 notification recipients (ntf_id 1..10, parent_id 1..10)
INSERT INTO `NotificationRecipient` (ntf_id, parent_id) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),
(6,6),(7,7),(8,8),(9,9),(10,10);

-- 10 students (parent_id 1..10, bus_id 1..10)
INSERT INTO `Student` (name, grade, active, parent_id, bus_id) VALUES
('Nguyễn Minh Khang','5A',1,1,1),
('Lê Bảo Anh','4B',1,2,2),
('Trần Gia Hân','3A',1,3,3),
('Phạm Minh Quân','2C',1,4,4),
('Đỗ Nhật Nam','5B',1,5,5),
('Nguyễn Thu Hà','1A',1,6,6),
('Lê Anh Tú','2B',1,7,7),
('Phan Gia Huy','3C',1,8,8),
('Trịnh Minh Anh','4A',1,9,9),
('Võ Bảo Ngọc','5C',1,10,10);

-- 10 reports (trip_id and student_id trong phạm vi đã chèn)
INSERT INTO `Report` (timestamp, status, trip_id, student_id) VALUES
('2025-10-20 06:15:00','picked_up',1,1),
('2025-10-20 07:50:00','dropped_off',1,1),
('2025-10-20 06:20:00','picked_up',2,2),
('2025-10-20 07:55:00','dropped_off',2,2),
('2025-10-20 06:30:00','picked_up',3,3),
('2025-10-20 08:00:00','dropped_off',3,3),
('2025-10-21 06:10:00','absent',4,4),
('2025-10-21 06:15:00','picked_up',5,5),
('2025-10-22 06:30:00','dropped_off',7,7),
('2025-10-23 08:00:00','picked_up',9,9);

-- 10 messages (sender_id và receiver_id tham chiếu tới user_id 1..10)
INSERT INTO `Message` (content, time_sent, sender_id, receiver_id, status) VALUES
('Xin chào quản lý','2025-10-20 07:00:00',5,1,'unread'),
('Xe đã đến nơi an toàn','2025-10-20 07:35:00',3,5,'read'),
('Phụ huynh cần hỗ trợ','2025-10-21 09:00:00',6,1,'unread'),
('Cảm ơn tài xế','2025-10-22 10:00:00',7,4,'read'),
('Báo cáo tình hình xe','2025-10-22 10:10:00',3,1,'read'),
('Cảnh báo xe trễ','2025-10-23 06:10:00',1,5,'unread'),
('Thông tin học sinh','2025-10-23 07:00:00',2,6,'read'),
('Xe hỏng máy','2025-10-23 07:30:00',3,1,'unread'),
('Báo cáo hoàn thành chuyến','2025-10-23 08:30:00',4,1,'read'),
('Tin nhắn kiểm tra hệ thống','2025-10-23 09:00:00',8,2,'read');



