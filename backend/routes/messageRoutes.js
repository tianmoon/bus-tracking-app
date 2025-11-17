import { Router} from 'express';
import { getAllMessagesByRoom, createMessage } from '../controllers/messageController.js';

const router = Router();

// GET - Lấy tất cả tin nhắn theo phòng
router.get('/:room', getAllMessagesByRoom);

// POST - Thêm tin nhắn mới
router.post('/', createMessage);

export default router;
