import { Link } from 'react-router-dom'
import { Coffee, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer style={{
            background: '#121714',
            borderTop: '1px solid rgba(194, 155, 105, 0.25)',
            padding: '40px 20px 20px 20px',
            marginTop: 'auto',
            color: '#b0b8b2'
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '30px',
                alignItems: 'start',
                marginBottom: '30px'
            }}>

                {/* Սյունակ 1: Բրենդ և նկարագրություն */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', background: '#2C3831', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c29b69', border: '1px solid rgba(194,155,105,0.4)' }}>
                            ☕
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>
                            Cosmic Brew
                        </span>
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: '1.5', margin: '0' }}>
                        Բարձր որակի սուրճի հատիկներ և բնական թեյեր՝ ձեր ջերմ առավոտների և հանգիստ երեկոների համար։
                    </p>
                </div>

                {/* Սյունակ 2: Արագ հղումներ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0' }}>Արագ Հղումներ</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                        <Link to="/" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }}>Գլխավոր</Link>
                        <Link to="/shop" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }}>Խանութ</Link>
                        <Link to="/cart" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }}>Զամբյուղ</Link>
                        <Link to="/admin" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }}>Ադմին</Link>
                    </div>
                </div>

                {/* Սյունակ 3: Կոնտակտային տվյալներ (Ֆիկտիվ) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', margin: '0 0 5px 0' }}>Կապ Մեզ Հետ</h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                        <MapPin style={{ width: '16px', height: '16px', color: '#c29b69', flexShrink: 0 }} />
                        <span>ք. Երևան, Հյուսիսային պողոտա 15</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                        <Phone style={{ width: '16px', height: '16px', color: '#c29b69', flexShrink: 0 }} />
                        <span>+374 (10) 55-77-99</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                        <Mail style={{ width: '16px', height: '16px', color: '#c29b69', flexShrink: 0 }} />
                        <span>support@cosmicbrew.am</span>
                    </div>
                </div>

            </div>

            <hr style={{ width: '100%', border: 'none', borderTop: '1px solid rgba(194, 155, 105, 0.15)', margin: '20px 0 15px 0' }} />

            {/* Ներքևի հեղինակային նշում */}
            <div style={{ textAlign: 'center', fontSize: '13px', color: '#8e9691' }}>
                © 2026 Cosmic Brew. Բոլոր իրավունքները պաշտպանված են։
            </div>
        </footer>
    )
}