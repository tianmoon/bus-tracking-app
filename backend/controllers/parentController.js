import Parent from '../models/ParentModel.js';
import { createParentService } from '../services/parentService.js';

// Lấy tất cả phụ huynh
export const getAllParents = async (req, res) => {
    try {
        const parents = await Parent.getAll();
        res.status(200).json({
            status: 'success',
            data: parents,
            message: 'Lấy danh sách phụ huynh thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Lấy phụ huynh theo ID
export const getParentById = async (req, res) => {
    try {
        const parentId = req.params.id;
        const parent = await Parent.getById(parentId);
        // Kiểm tra nếu phụ huynh không tồn tại
        if(!parent) {
            return res.status(404).json({
                status: 'fail',
                message: 'Phụ huynh không tồn tại',
                code: 404
            });
        }
        res.status(200).json({
            status: 'success',
            data: parent,
            message: 'Lấy phụ huynh theo ID thành công'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}

// Thêm phụ huynh mới
export const createParent = async (req, res) => {
    try {
        const parentData = req.body;
        if (!parentData.name || !parentData.identification || !parentData.email || !parentData.phone_number)    {
            return res.status(400).json(
                {
                    status: 'fail',
                    message: 'Thiếu thông tin bắt buộc: name, identification',
                    code: 400
                }
            );
        }

        const newParent = await createParentService(parentData);
        res.status(201).json({
            status: 'success',
            data: newParent,
            message: 'Thêm phụ huynh mới thành công'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            code: 500
        });
    }
}