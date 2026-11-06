import { Link } from 'react-router-dom'
import { Coffee, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
    const { t } = useLanguage()

    return (
        <footer style={{
            background: '#0e1410',
            borderTop: '1px solid rgba(194, 155, 105, 0.3)',
            color: '#b0b8b2',
            padding: '40px 20px 20px 20px',
            boxSizing: 'border-box',
            width: '100%',
            marginTop: 'auto'
        }}>
            <style>
                {`
                    @media (max-width: 768px) {
                        .footer-grid {
                            grid-template-columns: 1fr !important;
                            gap: 30px !important;
                        }
                    }
                `}
            </style>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '40px',
                marginBottom: '30px',
                boxSizing: 'border-box'
            }} className="footer-grid">

                {/* Բաժին 1: Լոգո և Նկարագրություն */}
                <div>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff', fontWeight: '800', marginBottom: '12px' }}>
                        <div style={{ width: '34px', height: '34px', background: '#2C3831', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c29b69', border: '1px solid rgba(194,155,105,0.4)' }}>
                            <Coffee style={{ width: '18px', height: '18px' }} />
                        </div>
                        <span style={{ background: 'linear-gradient(to right, #fff, #c29b69)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '18px' }}>
                            Cosmic Brew
                        </span>
                    </Link>
                    <p style={{ fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                        {t('footerDesc')}
                    </p>
                </div>

                {/* Բաժին 2: Արագ հղումներ */}
                <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', marginBottom: '14px' }}>
                        {t('quickLinks')}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                        <li><Link to="/" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#c29b69'} onMouseLeave={(e) => e.target.style.color = '#b0b8b2'}>{t('home')}</Link></li>
                        <li><Link to="/shop" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#c29b69'} onMouseLeave={(e) => e.target.style.color = '#b0b8b2'}>{t('shop')}</Link></li>
                        <li><Link to="/learn" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#c29b69'} onMouseLeave={(e) => e.target.style.color = '#b0b8b2'}>{t('learn')}</Link></li>
                        <li><Link to="/gifts" style={{ color: '#b0b8b2', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#c29b69'} onMouseLeave={(e) => e.target.style.color = '#b0b8b2'}>{t('gifts')}</Link></li>
                    </ul>
                </div>

                {/* Բաժին 3: Կապ */}
                <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', marginBottom: '14px' }}>
                        {t('contactUs')}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MapPin style={{ width: '15px', height: '15px', color: '#c29b69' }} />
                            <span>Yerevan, Armenia</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone style={{ width: '15px', height: '15px', color: '#c29b69' }} />
                            <span>+374 (10) 00-00-00</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mail style={{ width: '15px', height: '15px', color: '#c29b69' }} />
                            <span>support@cosmicbrew.com</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Ներքին հեղինակային իրավունք */}
            <div style={{
                borderTop: '1px solid rgba(194, 155, 105, 0.15)',
                paddingTop: '20px',
                textAlign: 'center',
                fontSize: '12px',
                color: '#8c9590'
            }}>
                &copy; {new Date().getFullYear()} Cosmic Brew. {t('rightsReserved')}
            </div>
        </footer>
    )
}