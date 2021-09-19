import {
    Space,
    Typography,
    Divider
} from 'antd'

import { 
    SyncOutlined
} from '@ant-design/icons'
export default function DetailProductWarranty(){
    return(
        <Space direction="vertical">
            <Typography.Title level={5}>
                Thông tin bảo hành
            </Typography.Title>
            <Typography.Text type="success">
                <i class="fas fa-shield-alt"></i> &nbsp;
                Bảo hành 12 tháng chính hãng
            </Typography.Text>
            <Typography.Text type="success">
                <SyncOutlined spin /> &nbsp;
                Đổi trả miễn phí trong vòng 15 ngày
            </Typography.Text>
            <Divider dashed style={{ borderColor: "silver" }} />
            <Typography.Title level={5}>
                Ưu đãi thêm
            </Typography.Title>
        </Space>
    )
}