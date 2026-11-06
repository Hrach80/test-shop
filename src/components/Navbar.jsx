import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Home, Store, Shield, Coffee } from 'lucide-react'

export default function Navbar() {
    const location = useLocation()
    const [cartCount, setCartCount] = useState(0)

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

    const isActive = (path) => location.pathname === path

    return (
        <header style={{
            background: '#121714',
            borderBottom: '1px solid rgba(194, 155, 105, 0.3)',
            padding: '0 15px',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <style>
                {`
                    .nav-btn {
                        padding: 7px 12px;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 13px;
                        transition: all 0.25s ease;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    .nav-btn:hover {
                        transform: translateY(-2px);
                        background: #25302A !important;
                        border-color: rgba(194, 155, 105, 0.5) !important;
                        box-shadow: 0 4px 12px rgba(194,155,105,0.15);
                    }
                    @media (max-width: 600px) {
                        .nav-text {
                            display: none;
                        }
                        .nav-btn {
                            padding: 10px 14px !important;
                            border-radius: 12px !important;
                        }
                        .nav-icon {
                            width: 20px !important;
                            height: 20px !important;
                        }
                        .logo-text {
                            font-size: 16px !important;
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
                boxSizing: 'border-box'
            }}>

                {/* Լոգո */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff', fontWeight: '800' }}>
                    <div style={{ width: '34px', height: '34px', background: '#2C3831', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c29b69', border: '1px solid rgba(194,155,105,0.4)' }}>
                        <Coffee style={{ width: '18px', height: '18px' }} />
                    </div>
                    <span className="logo-text" style={{ background: 'linear-gradient(to right, #fff, #c29b69)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '18px' }}>
                        Cosmic Brew
                    </span>
                </Link>

                {/* Մենյուի կոճակներ */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                    {/* Գլխավոր */}
                    <Link
                        to="/"
                        className="nav-btn"
                        style={{
                            background: isActive('/') ? '#3A4A41' : '#1A231E',
                            color: '#fff',
                            border: isActive('/') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)',
                            boxShadow: isActive('/') ? '0 0 12px rgba(194,155,105,0.25)' : 'none',
                        }}
                    >
                        <Home className="nav-icon" style={{ width: '16px', height: '16px', color: isActive('/') ? '#c29b69' : '#b0b8b2' }} />
                        <span className="nav-text">Գլխավոր</span>
                    </Link>

                    {/* Խանութ */}
                    <Link
                        to="/shop"
                        className="nav-btn"
                        style={{
                            background: isActive('/shop') ? '#3A4A41' : '#1A231E',
                            color: '#fff',
                            border: isActive('/shop') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)',
                            boxShadow: isActive('/shop') ? '0 0 12px rgba(194,155,105,0.25)' : 'none',
                        }}
                    >
                        <Store className="nav-icon" style={{ width: '16px', height: '16px', color: isActive('/shop') ? '#c29b69' : '#b0b8b2' }} />
                        <span className="nav-text">Խանութ</span>
                    </Link>

                    {/* Ադմին */}
                    <Link
                        to="/admin"
                        className="nav-btn"
                        style={{
                            background: isActive('/admin') ? '#3A4A41' : '#1A231E',
                            color: '#fff',
                            border: isActive('/admin') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)',
                            boxShadow: isActive('/admin') ? '0 0 12px rgba(194,155,105,0.25)' : 'none',
                        }}
                    >
                        <Shield className="nav-icon" style={{ width: '16px', height: '16px', color: isActive('/admin') ? '#c29b69' : '#b0b8b2' }} />
                        <span className="nav-text">Ադմին</span>
                    </Link>

                    {/* Զամբյուղ */}
                    <Link
                        to="/cart"
                        className="nav-btn"
                        style={{
                            background: isActive('/cart') ? '#3A4A41' : '#1A231E',
                            color: '#fff',
                            border: isActive('/cart') ? '1px solid #c29b69' : '1px solid rgba(194, 155, 105, 0.2)',
                            boxShadow: isActive('/cart') ? '0 0 12px rgba(194,155,105,0.25)' : 'none',
                            position: 'relative'
                        }}
                    >
                        <ShoppingCart className="nav-icon" style={{ width: '18px', height: '18px', color: isActive('/cart') ? '#c29b69' : '#b0b8b2' }} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: '#c29b69',
                                color: '#121714',
                                fontSize: '10px',
                                fontWeight: '900',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                </nav>

            </div>
        </header>
    )
}