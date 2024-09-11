import {ScanStatus} from "wechaty";
// @ts-ignore
import QrcodeTerminal from "qrcode-terminal";

export async function onScan(qrcode: string, status: any) {
    if (status === ScanStatus.Waiting) {
        console.log(`
        ============================================
        请扫描二维码以登录 ${qrcode} 当前状态${status}
        ============================================
        `)
        QrcodeTerminal.generate(qrcode, {
            small: true
        });
    }
}
