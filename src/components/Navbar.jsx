import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Home, Store, Shield, Coffee, BookOpen, Gift, Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
    const location = useLocation()
    const { lang, setLang, t } = useLanguage()
    const [cartCount, setCartCount] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)
    const navRef = useRef(null)

    useEffect(() => {
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cosmic_cart')) || []
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
            setCartCount(totalItems)
        }

        updateCartCount()
        window.addEventListener('storage', updateCartCount)
        const interval = setInterval(updateCartCount, 1000)

        return () => {
            window.removeEventListener('storage', updateCartCount)
            clearInterval(interval)
        }
    }, [location])

    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMenuOpen(false)
                setLangOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
        setLangOpen(false)
    }, [location])

    const isActive = (path) => location.pathname === path

    return (
        <header ref={navRef} style={{
            background: '#121714',
            borderBottom: '1px solid rgba(194, 155, 105, 0.3)',
            padding: '0 20px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <style>
                {`
                    .nav-btn {
                        padding: 8px 14px;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 13px;
                        transition: all 0.25s ease;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .nav-btn:hover {
                        transform: translateY(-2px);
                        background: #25302A !important;
                        border-color: rgba(194, 155, 105, 0.5) !important;
                        box-shadow: 0 4px 12px rgba(194,155,105,0.15);
                    }
                    .desktop-nav {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    .mobile-only-section {
                        display: none;
                    }
                    .mobile-dropdown {
                        position: absolute;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background: rgba(18, 23, 20, 0.98);
                        backdrop-filter: blur(15px);
                        border-bottom: 1px solid rgba(194, 155, 105, 0.3);
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.9);
                        box-sizing: border-box;
                        animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        z-index: 99;
                    }
                    @keyframes slideDown {
                        0% { opacity: 0; transform: translateY(-10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    @media (max-width: 900px) {
                        .desktop-nav {
                            display: none !important;
                        }
                        .mobile-only-section {
                            display: flex !important;
                            align-items: center;
                            gap: 10px;
                        }
                    }
                `}
            </style>

            <div style={{
                maxWidth: '1200px',
                height: '70px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                position: 'relative'
            }}>

                {/* Ձախ մասում՝ Լոգո */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff', fontWeight: '800' }}>
                    <div style={{ width: '36px', height: '36px', background: '#2C3831', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c29b69', border: '1px solid rgba(194,155,105,0.4)' }}>
                        <Coffee style={{ width: '18px', height: '18px' }} />
                    </div>
                    <span style={{ background: 'linear-gradient(to right, #fff, #c29b69)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '18px' }}>
                        Cosmic Brew
                    </span>
                </Link>

                {/* Համակարգչային մենյու (Desktop) */}
                <div className="desktop-nav">
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Link to="/" className="nav-btn" style={{ background: isActive('/') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)' }}>
                            <Home style={{ width: '15px', height: '15px', color: isActive('/') ? '#c29b69' : '#b0b8b2' }} />
                            <span>{t('home')}</span>
                        </Link>
                        <Link to="/shop" className="nav-btn" style={{ background: isActive('/shop') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/shop') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)' }}>
                            <Store style={{ width: '15px', height: '15px', color: isActive('/shop') ? '#c29b69' : '#b0b8b2' }} />
                            <span>{t('shop')}</span>
                        </Link>
                        <Link to="/learn" className="nav-btn" style={{ background: isActive('/learn') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/learn') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)' }}>
                            <BookOpen style={{ width: '15px', height: '15px', color: isActive('/learn') ? '#c29b69' : '#b0b8b2' }} />
                            <span>{t('learn')}</span>
                        </Link>
                        <Link to="/gifts" className="nav-btn" style={{ background: isActive('/gifts') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/gifts') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)' }}>
                            <Gift style={{ width: '15px', height: '15px', color: isActive('/gifts') ? '#c29b69' : '#b0b8b2' }} />
                            <span>{t('gifts')}</span>
                        </Link>
                        <Link to="/admin" className="nav-btn" style={{ background: isActive('/admin') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/admin') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)' }}>
                            <Shield style={{ width: '15px', height: '15px', color: isActive('/admin') ? '#c29b69' : '#b0b8b2' }} />
                            <span>{t('admin')}</span>
                        </Link>
                        <Link to="/cart" className="nav-btn" style={{ background: isActive('/cart') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/cart') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)', position: 'relative' }}>
                            <ShoppingCart style={{ width: '16px', height: '16px', color: isActive('/cart') ? '#c29b69' : '#b0b8b2' }} />
                            <span>{t('cart')}</span>
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#c29b69', color: '#121714', fontSize: '10px', fontWeight: '900', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </nav>

                    {/* Լեզուների փոխարկիչ Desktop-ի համար */}
                    <div style={{ display: 'flex', gap: '4px', background: '#1A231E', padding: '3px', borderRadius: '8px', border: '1px solid rgba(194, 155, 105, 0.2)' }}>
                        {['en', 'hy', 'ru'].map((l) => (
                            <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#c29b69' : 'transparent', color: lang === l ? '#121714' : '#fff', border: 'none', padding: '5px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}>
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Հեռախոսների համար (Mobile Section): Աջ անկյունից դեպի ձախ -> Լեզու, Զամբյուղ, Մենյու */}
                <div className="mobile-only-section">

                    {/* 1. Աջ անկյունում՝ Լեզուների բացվող կոճակ */}
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }} style={{ background: '#1A231E', border: '1px solid rgba(194, 155, 105, 0.3)', color: '#c29b69', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                            <span>{lang.toUpperCase()}</span>
                        </button>
                        {langOpen && (
                            <div style={{ position: 'absolute', right: 0, top: '42px', background: '#161e19', border: '1px solid rgba(194, 155, 105, 0.4)', borderRadius: '12px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.8)', zIndex: 101, minWidth: '110px' }}>
                                {['en', 'hy', 'ru'].map((l) => (
                                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }} style={{ background: lang === l ? '#c29b69' : 'transparent', color: lang === l ? '#121714' : '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                        {l === 'en' ? 'English' : l === 'hy' ? 'Հայերեն' : 'Русский'}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 2. Լեզվի ձախ կողմում՝ Զամբյուղ */}
                    <Link to="/cart" style={{ background: '#1A231E', border: '1px solid rgba(194, 155, 105, 0.3)', padding: '8px', borderRadius: '10px', color: '#c29b69', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none' }}>
                        <ShoppingCart style={{ width: '18px', height: '18px' }} />
                        {cartCount > 0 && (
                            <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#c29b69', color: '#121714', fontSize: '9px', fontWeight: '900', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* 3. Զամբյուղի ձախ կողմում՝ Համբուրգեր Մենյուի կոճակ */}
                    <button onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }} style={{ background: '#1A231E', border: '1px solid rgba(194, 155, 105, 0.3)', color: '#c29b69', padding: '8px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {menuOpen ? <X style={{ width: '20px', height: '20px' }} /> : <Menu style={{ width: '20px', height: '20px' }} />}
                    </button>
                </div>

                {/* Մոբայլ բացվող մենյուի վահանակ */}
                {menuOpen && (
                    <div className="mobile-dropdown">
                        <Link to="/" className="nav-btn" style={{ background: isActive('/') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)', padding: '12px' }}>
                            <Home style={{ width: '18px', height: '18px', color: isActive('/') ? '#c29b69' : '#b0b8b2' }} />
                            <span style={{ fontSize: '15px' }}>{t('home')}</span>
                        </Link>
                        <Link to="/shop" className="nav-btn" style={{ background: isActive('/shop') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/shop') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)', padding: '12px' }}>
                            <Store style={{ width: '18px', height: '18px', color: isActive('/shop') ? '#c29b69' : '#b0b8b2' }} />
                            <span style={{ fontSize: '15px' }}>{t('shop')}</span>
                        </Link>
                        <Link to="/learn" className="nav-btn" style={{ background: isActive('/learn') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/learn') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)', padding: '12px' }}>
                            <BookOpen style={{ width: '18px', height: '18px', color: isActive('/learn') ? '#c29b69' : '#b0b8b2' }} />
                            <span style={{ fontSize: '15px' }}>{t('learn')}</span>
                        </Link>
                        <Link to="/gifts" className="nav-btn" style={{ background: isActive('/gifts') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/gifts') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)', padding: '12px' }}>
                            <Gift style={{ width: '18px', height: '18px', color: isActive('/gifts') ? '#c29b69' : '#b0b8b2' }} />
                            <span style={{ fontSize: '15px' }}>{t('gifts')}</span>
                        </Link>
                        <Link to="/admin" className="nav-btn" style={{ background: isActive('/admin') ? '#3A4A41' : '#1A231E', color: '#fff', border: isActive('/admin') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)', padding: '12px' }}>
                            <Shield style={{ width: '18px', height: '18px', color: isActive('/admin') ? '#c29b69' : '#b0b8b2' }} />
                            <span style={{ fontSize: '15px' }}>{t('admin')}</span>
                        </Link>
                    </div>
                )}

            </div>
        </header>
    )
}